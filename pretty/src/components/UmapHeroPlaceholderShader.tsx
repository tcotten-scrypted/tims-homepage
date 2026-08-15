import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const VERT = /* glsl */ `
precision highp float;
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

/**
 * Full-screen fragment shader: procedural starfield/nebula on a quad.
 * Sparse hash-grid points + slow domain warp + drifting glow lobes (uTime).
 */
const FRAG = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uReducedMotion;
uniform float uProgress;
uniform float uIntensity;

out vec4 fragColor;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  float motion = 1.0 - uReducedMotion;
  float t = uTime * motion;
  vec2 r = max(uResolution, vec2(1.0));
  vec2 uv = (gl_FragCoord.xy - 0.5 * r) / r.y;
  vec3 bg = vec3(0.043, 0.051, 0.071);

  vec2 flow = vec2(
    sin(t * 0.21 + uv.y * 1.8),
    cos(t * 0.17 - uv.x * 1.5)
  ) * 0.14 * motion;
  vec2 warp = vec2(sin(t * 0.35), cos(t * 0.29)) * 0.1 * motion;
  vec2 p = uv * 2.2 + flow + warp;

  float field = 0.0;
  float sparkle = 0.0;
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float scale = 2.0 + fi * 1.35;
    vec2 cell = p * scale + vec2(fi * 1.7 + t * 0.06, fi * 2.3 - t * 0.05);
    vec2 g = floor(cell);
    vec2 f = fract(cell) - 0.5;
    float h = hash21(g + fi * 19.1);
    vec2 jitter = vec2(hash21(g + 1.3), hash21(g + 4.7)) - 0.5;
    float d = length(f - jitter * 0.85);
    float pt = smoothstep(0.12, 0.0, d) * step(0.72, h);
    field += pt * (0.35 + 0.65 * h);
    sparkle += smoothstep(0.04, 0.0, d) * step(0.94, h) * 1.8;
  }

  float mistField = noise(uv * 3.2 + vec2(t * 0.08, -t * 0.06)) * 0.22;
  vec3 mist = vec3(0.31, 0.17, 0.83) * (field * 0.22 + mistField);
  mist += vec3(0.49, 0.36, 0.94) * field * field * 0.18;
  mist += vec3(0.91, 0.91, 0.91) * sparkle * 0.35;

  vec2 c1 = vec2(-0.35, 0.12) + vec2(sin(t * 0.19), cos(t * 0.15)) * 0.16;
  vec2 c2 = vec2(0.42, -0.18) + vec2(cos(t * 0.14), sin(t * 0.22)) * 0.14;
  float cl1 = exp(-5.5 * length(uv - c1)) * 0.35;
  float cl2 = exp(-6.0 * length(uv - c2)) * 0.28;
  mist += vec3(0.05, 0.58, 0.53) * (cl1 + cl2) * 0.28;

  vec3 col = bg + mist * uIntensity;
  float vig = clamp(1.0 - 0.42 * dot(uv, uv), 0.5, 1.0);
  col *= vig;

  float glow = smoothstep(0.0, 1.0, uProgress);
  col += vec3(0.49, 0.36, 0.94) * glow * 0.06 * uIntensity;

  fragColor = vec4(col, 1.0);
}
`

type UmapHeroPlaceholderShaderProps = {
  progress: number
  /** 1 during load overlay; lower when dimmed behind the live viewer */
  intensity?: number
}

export function UmapHeroPlaceholderShader({
  progress,
  intensity = 1,
}: UmapHeroPlaceholderShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(progress)
  const intensityRef = useRef(intensity)
  progressRef.current = progress
  intensityRef.current = intensity

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const reducedMotionQ = window.matchMedia('(prefers-reduced-motion: reduce)')

    let renderer: THREE.WebGLRenderer | null = null
    let geo: THREE.PlaneGeometry | null = null
    let mat: THREE.ShaderMaterial | null = null
    let canvas: HTMLCanvasElement | null = null

    try {
      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
      })
      renderer.setClearColor(0x0b0d12, 1)

      geo = new THREE.PlaneGeometry(2, 2)
      mat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(1, 1) },
          uReducedMotion: { value: reducedMotionQ.matches ? 1 : 0 },
          uProgress: { value: progressRef.current },
          uIntensity: { value: intensityRef.current },
        },
        vertexShader: VERT,
        fragmentShader: FRAG,
        glslVersion: THREE.GLSL3,
      })
      scene.add(new THREE.Mesh(geo, mat))

      canvas = renderer.domElement
      canvas.className = 'splash-banner__placeholder-canvas'
      el.appendChild(canvas)

      let visible = true
      let raf = 0
      let disposed = false

      const resize = () => {
        if (!renderer || !mat) return
        const w = Math.max(1, Math.floor(el.clientWidth))
        const h = Math.max(1, Math.floor(el.clientHeight))
        const pr = Math.min(window.devicePixelRatio ?? 1, 2)
        renderer.setPixelRatio(pr)
        renderer.setSize(w, h, false)
        mat.uniforms.uResolution.value.set(w * pr, h * pr)
      }

      const ro = new ResizeObserver(resize)
      ro.observe(el)

      const io = new IntersectionObserver(
        (entries) => {
          visible = entries[0]?.isIntersecting ?? true
        },
        { rootMargin: '80px' },
      )
      io.observe(el)

      const onMotion = () => {
        if (mat) mat.uniforms.uReducedMotion.value = reducedMotionQ.matches ? 1 : 0
      }
      reducedMotionQ.addEventListener('change', onMotion)

      const tick = () => {
        if (disposed || !renderer || !mat) return
        raf = requestAnimationFrame(tick)
        if (!visible) return
        mat.uniforms.uTime.value = performance.now() * 0.001
        mat.uniforms.uProgress.value = progressRef.current
        mat.uniforms.uIntensity.value = intensityRef.current
        renderer.render(scene, camera)
      }

      resize()
      tick()

      return () => {
        disposed = true
        cancelAnimationFrame(raf)
        ro.disconnect()
        io.disconnect()
        reducedMotionQ.removeEventListener('change', onMotion)
        geo?.dispose()
        mat?.dispose()
        renderer?.dispose()
        canvas?.remove()
      }
    } catch (err) {
      console.warn('UmapHeroPlaceholderShader: WebGL init failed', err)
      geo?.dispose()
      mat?.dispose()
      renderer?.dispose()
      canvas?.remove()
      return undefined
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="splash-banner__placeholder"
      aria-hidden
    />
  )
}
