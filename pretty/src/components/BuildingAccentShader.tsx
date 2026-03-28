import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const VERT = /* glsl */ `
precision highp float;
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

/**
 * Fractal ray-march fragment derived from GLSL artwork by Yohei Nishitsuji (@YoheiNishitsuji);
 * adapted with 4×4 pixel blocks and site palette.
 */
const FRAG = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uReducedMotion;

out vec4 fragColor;

#define OUTER_STEPS 72
#define INNER_STEPS 16

mat3 rotate3D(float angle, vec3 axis) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;
  return mat3(
    oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,
    oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,
    oc * axis.z * axis.x - axis.y * s, oc * axis.y * axis.z + axis.x * s, oc * axis.z * axis.z + c
  );
}

void main() {
  float t = uTime * (1.0 - uReducedMotion);
  vec2 r = max(uResolution, vec2(1.0));
  vec2 coord = gl_FragCoord.xy;
  vec2 FC = floor(coord / 4.0) * 4.0 + 2.0;

  float acc = 0.0;
  float g = 0.0;
  // Continuous orbit + precession (angles grow with t, no back-and-forth swing)
  mat3 R =
    rotate3D(t * 0.092 - 3.0, vec3(2.0, 40.0, -7.0))
    * rotate3D(t * 0.058, vec3(1.0, 0.35, 0.6))
    * rotate3D(t * 0.031, vec3(-0.4, 1.0, 0.15));

  // Crawling focal plane + incommensurate fold drift (evolves without a short repeat)
  vec2 pan = vec2(2.8, -0.4) + vec2(t * 0.011, t * 0.007);
  float foldWarp =
    0.55
    + 0.0048 * sin(t * 0.071)
    + 0.0036 * sin(t * 0.113 * 1.618)
    + t * 1.2e-5;
  vec3 foldBox = vec3(3.0, 4.0, 3.0)
    + 0.07 * vec3(sin(t * 0.049), sin(t * 0.037 * 1.3), sin(t * 0.061));

  for (int oi = 0; oi < OUTER_STEPS; oi++) {
    vec3 p = vec3(
      (FC - 0.5 * r) / r.y * 1.3 + pan,
      g - 6.0
    ) * R;

    float s = 3.0;
    for (int j = 0; j < INNER_STEPS; j++) {
      float e = 7.5 / abs(dot(p, p * foldWarp + 0.3));
      s *= e;
      p = vec3(0.0, 4.0, -1.0) - abs(abs(p) * e - foldBox);
    }
    g += p.y / s - 0.0015;
    s = log2(s) - g * 0.5;
    acc += s / 800.0;
  }

  float v = tanh(acc * 3.4);
  vec3 dark = vec3(0.102, 0.063, 0.208);
  vec3 accent = vec3(0.310, 0.169, 0.831);
  vec3 accent2 = vec3(0.486, 0.361, 0.941);
  vec3 teal = vec3(0.051, 0.580, 0.533);
  vec3 navy = vec3(0.059, 0.090, 0.165);

  vec3 col = mix(navy, dark, smoothstep(0.0, 0.45, v));
  col = mix(col, accent, smoothstep(0.12, 0.62, v));
  col = mix(col, accent2, smoothstep(0.38, 0.88, v));
  col = mix(col, teal, smoothstep(0.55, 1.0, v) * 0.65);

  vec2 q = (FC - 0.5 * r) / r.y;
  float vig = clamp(1.0 - 0.38 * dot(q, q), 0.55, 1.0);
  col *= vig;

  fragColor = vec4(col, 1.0);
}
`

export function BuildingAccentShader() {
  const containerRef = useRef<HTMLDivElement>(null)

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
      renderer.setClearColor(0x0f172a, 1)

      geo = new THREE.PlaneGeometry(2, 2)
      mat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(1, 1) },
          uReducedMotion: { value: reducedMotionQ.matches ? 1 : 0 },
        },
        vertexShader: VERT,
        fragmentShader: FRAG,
        glslVersion: THREE.GLSL3,
      })
      const mesh = new THREE.Mesh(geo, mat)
      scene.add(mesh)

      canvas = renderer.domElement
      canvas.className = 'home-split__shader-canvas'
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
          const e = entries[0]
          visible = e ? e.isIntersecting : true
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
      console.warn('BuildingAccentShader: WebGL init failed', err)
      geo?.dispose()
      mat?.dispose()
      renderer?.dispose()
      canvas?.remove()
      return undefined
    }
  }, [])

  return (
    <>
      <div ref={containerRef} className="home-split__shader" aria-hidden />
      <p className="home-split__shader-credit">
        GLSL artwork by{' '}
        <a
          href="https://x.com/YoheiNishitsuji"
          target="_blank"
          rel="noopener noreferrer"
        >
          Yohei Nishitsuji
        </a>{' '}
        <span className="home-split__shader-credit-handle">(@YoheiNishitsuji)</span>
      </p>
    </>
  )
}
