import { lazy, Suspense, useEffect } from 'react'
import { GraduationCap, Mail } from 'lucide-react'
import { BoardyIntroButton } from 'boardy-intro-react'
import 'boardy-intro-react/style.css'
import { HomeJsonLd } from '../components/HomeJsonLd'
import { HomeNav } from '../components/HomeNav'
import { SplashBanner } from '../SplashBanner'
import '../site.css'
import '../styles/home-shell.css'

const BuildingAccentShader = lazy(() =>
  import('../components/BuildingAccentShader').then((m) => ({ default: m.BuildingAccentShader })),
)

const SKILL_CLOUD: { category: string; pills: string[] }[] = [
  {
    category: 'Human languages',
    pills: ['English', 'Japanese'],
  },
  {
    category: 'Programming languages',
    pills: [
      'Python',
      'TypeScript / JavaScript',
      'Rust',
      'Solidity',
      'Cairo',
      'Move',
      'SQL',
      'C',
      'C++',
      'C#',
      'Lua',
      'Prolog',
      'Lisp',
      'PHP',
      'Ruby',
      'Java',
    ],
  },
  {
    category: 'Web frameworks',
    pills: ['React', 'Next.js', 'Node.js', 'Flask / FastAPI', 'Django', 'Ruby on Rails'],
  },
  {
    category: 'AI / ML',
    pills: ['PyTorch', 'JAX', 'TensorFlow', 'scikit-learn', 'Hugging Face Transformers'],
  },
  {
    category: 'Agentic frameworks',
    pills: [
      'LangChain',
      'LangGraph',
      'LangFuse',
      'AutoGPT',
      'OpenAgents',
      'AVB',
      'ElizaOS',
      'DayDreams',
    ],
  },
  {
    category: 'Game engines',
    pills: ['Unity', 'Three.js', 'Babylon.js'],
  },
  {
    category: 'Blockchain',
    pills: [
      'Solidity',
      'Cairo',
      'Move',
      'Hardhat',
      'Foundry',
      'Forge',
      'Anvil',
      'Circom',
      'Noir',
      'zk-SNARKs',
      'zk-STARKs',
      'ZK-rollups',
      'Slither',
      'Aderyn',
      'Echidna',
      'Medusa',
      'OpenZeppelin Contracts',
      'ERC standards',
      'wagmi',
      'viem',
      'ethers.js',
      'CDP',
      'Alchemy',
      'Infura',
      'The Graph',
      'Tenderly',
      'EVM interoperability (EIL)',
      'Wire Network',
      'Chainlink',
    ],
  },
  {
    category: 'DevTools & security',
    pills: [
      'VS Code + Vim',
      'Cursor',
      'Claude Code',
      'Codex',
      'Foundry',
      'Hardhat',
      'Slither',
      'Aderyn',
      'Echidna',
      'Medusa',
      'Tenderly',
      'OpenZeppelin',
      'Defender',
      'Solhint',
      'Git',
      'GitOps',
    ],
  },
  {
    category: 'DevOps',
    pills: [
      'Linux',
      'Windows',
      'macOS',
      'Git',
      'Docker',
      'Kubernetes',
      'Terraform',
      'GitHub Actions',
      'Jenkins',
      'Ansible',
      'Prometheus',
      'Grafana',
      'OpenTelemetry',
    ],
  },
  {
    category: 'AWS',
    pills: [
      'EC2',
      'ELB · Multi-AZ · Auto Scaling',
      'Lambda',
      'Bedrock',
      'Guardrails',
      'SageMaker',
    ],
  },
  {
    category: 'Security & compliance',
    pills: [
      'PCI/DSS',
      'Zero Trust · IAM hardening',
      'DevSecOps · policy-as-code',
      'OWASP LLM Top 10',
      'Cryptography · blockchain · ZKP',
      'Secure smart contracts · invariant testing',
    ],
  },
  {
    category: 'Cross-cutting',
    pills: [
      'Full-stack Web3 · contracts · frontend · backend',
      'AI-augmented workflows · Cursor · Claude',
      'Hybrid cloud · on-prem · multi-OS',
      'High availability · production reliability',
    ],
  },
]

function SkillsSection() {
  return (
    <section
      id="skills"
      className="home-section home-section--muted"
      aria-labelledby="skills-heading"
    >
      <div className="home-main__prose home-main__prose--wide">
        <p className="home-section__kicker">Capabilities</p>
        <h2 id="skills-heading">Skills</h2>
        <div className="home-skills-cloud">
          {SKILL_CLOUD.map(({ category, pills }, i) => (
            <div
              key={category}
              className="home-skills-cloud__group"
              data-cloud-tone={i % 3}
            >
              <p className="home-skills-cloud__label" id={`skills-cloud-${i}`}>
                {category}
              </p>
              <ul
                className="home-skills-cloud__pills"
                aria-labelledby={`skills-cloud-${i}`}
              >
                {pills.map((label) => (
                  <li key={`${category}-${label}`}>
                    <span className="home-skill-pill">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProfileContactIcons() {
  return (
    <nav className="home-profile-icons" aria-label="Social profiles and email">
      <a
        className="home-profile-icon"
        href="https://www.linkedin.com/in/timcotten"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <svg
          className="home-profile-icon__svg home-profile-icon__svg--fill"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
      <a
        className="home-profile-icon"
        href="https://x.com/CottenIO"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X"
      >
        <svg
          className="home-profile-icon__svg home-profile-icon__svg--fill"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      </a>
      <a
        className="home-profile-icon"
        href="https://warpcast.com/cottenio"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Farcaster"
      >
        <svg
          className="home-profile-icon__svg home-profile-icon__svg--fill"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M18.24.24H5.76C2.5789.24 0 2.8188 0 6v12c0 3.1811 2.5789 5.76 5.76 5.76h12.48c3.1812 0 5.76-2.5789 5.76-5.76V6C24 2.8188 21.4212.24 18.24.24m.8155 17.1662v.504c.2868-.0256.5458.1905.5439.479v.5688h-5.1437v-.5688c-.0019-.2885.2576-.5047.5443-.479v-.504c0-.22.1525-.402.358-.458l-.0095-4.3645c-.1589-1.7366-1.6402-3.0979-3.4435-3.0979-1.8038 0-3.2846 1.3613-3.4435 3.0979l-.0096 4.3578c.2276.0424.5318.2083.5395.4648v.504c.2863-.0256.5457.1905.5438.479v.5688H4.3915v-.5688c-.0019-.2885.2575-.5047.5438-.479v-.504c0-.2529.2011-.4548.4536-.4724v-7.895h-.4905L4.2898 7.008l2.6405-.0005V5.0419h9.9495v1.9656h2.8219l-.6091 2.0314h-.4901v7.8949c.2519.0177.453.2195.453.4724" />
        </svg>
      </a>
      <a
        className="home-profile-icon"
        href="mailto:tim@cotten.io"
        aria-label="Personal email: tim@cotten.io"
      >
        <Mail className="home-profile-icon__lucide" size={20} strokeWidth={2} aria-hidden />
      </a>
      <a
        className="home-profile-icon"
        href="mailto:tcotten2@gmu.edu"
        aria-label="University email: tcotten2@gmu.edu"
      >
        <GraduationCap className="home-profile-icon__lucide" size={20} strokeWidth={2} aria-hidden />
      </a>
    </nav>
  )
}

export default function HomePage() {
  useEffect(() => {
    document.body.classList.add('home-shell')
    return () => document.body.classList.remove('home-shell')
  }, [])

  return (
    <div id="top">
      <HomeJsonLd />
      <a href="#main-content" className="home-skip-link">
        Skip to main content
      </a>
      <HomeNav />
      <SplashBanner />

      <main id="main-content" className="home-main" lang="en">
        <section
          id="home-intro"
          className="home-section home-hero"
          aria-labelledby="home-tagline"
        >
          <div className="home-hero__grid">
            <div className="home-main__prose">
              <p className="home-section__kicker">Profile</p>
              <p id="home-tagline" className="home-hero__lede">
                Building a monopoly in the machine economy; previously built the AI
                systems that powered the virtual economies of EA&apos;s online worlds.
              </p>
              <p className="header-note">
                Also: Adjunct at George Mason University, teaching the first{' '}
                <em>Generative AI in Game Development</em> course. Office hours for
                undergrads and AI agents.
              </p>
            </div>
            <aside className="home-hero__aside" aria-label="Highlights">
              <div className="home-stats">
                <div className="home-stat">
                  <span className="home-stat__value">$1.5M</span>
                  <span className="home-stat__label">Pre-seed raised</span>
                </div>
                <div className="home-stat">
                  <span className="home-stat__value">10k+ Community</span>
                  <span className="home-stat__label">Token Holders</span>
                </div>
                <div className="home-stat">
                  <span className="home-stat__value">ERC-8004</span>
                  <span className="home-stat__label">Standards Contributor</span>
                </div>
                <div className="home-stat">
                  <span className="home-stat__value">x402</span>
                  <span className="home-stat__label">Hackathon wins</span>
                </div>
              </div>
            </aside>
          </div>
          <div className="home-cta-grid" role="list">
            <a className="home-cta-tile" role="listitem" href="https://scrypted.ai">
              <strong>Scrypted Network</strong>
              <span>Agent discovery, workflows, and attention auctions.</span>
            </a>
            <a className="home-cta-tile" role="listitem" href="https://delu.la">
              <strong>Delula</strong>
              <span>Make viral content with an autonomous consumer product.</span>
            </a>
          </div>
          <ProfileContactIcons />
        </section>

        <section
          id="thesis"
          className="home-section home-section--surface"
          aria-labelledby="thesis-heading"
        >
          <div className="home-main__prose home-main__prose--wide">
            <p className="home-section__kicker">Beliefs</p>
            <h2 id="thesis-heading">Thesis</h2>
            <div className="home-thesis-grid" role="list">
              <article className="home-thesis-card" role="listitem">
                <span className="home-thesis-card__idx" aria-hidden>
                  01
                </span>
                <p className="home-thesis-card__subtitle">Games Showed the Way</p>
                <p>
                  The challenges in building an agentic economy today are inherently
                  similar to those we faced building the first generation of Massively
                  Multiplayer Online Role Playing Games (MMORPGs).{' '}
                </p>
                <p>
                  World Models, whether JEPA-based physical analogs or neuro-symbolic like
                  Stratus X1, are the key to unlocking agentic intelligence.
                </p>
              </article>
              <article className="home-thesis-card" role="listitem">
                <span className="home-thesis-card__idx" aria-hidden>
                  02
                </span>
                <p className="home-thesis-card__subtitle">
                  The Machine Economy will Evolve
                </p>
                <p>
                  Agent-to-Agent payments, whether on-chain or off-chain, will
                  inevitably approach the scale of human payments.
                </p>
                <p>
                  AGI is most likely to be achieved as an emergent property of many
                  coordinating agents under capitalistic constraints, than as one
                  monolithic system.
                </p>
              </article>
              <article className="home-thesis-card" role="listitem">
                <span className="home-thesis-card__idx" aria-hidden>
                  03
                </span>
                <p className="home-thesis-card__subtitle">Advertising Works on LLMs</p>
                <p>
                  Humans are susceptible to persuasion, and sufficiently advanced AI
                  agents - tasked with fulfilling goals like shopping based on their
                  user&apos;s preferences - will also be susceptible to persuasion.
                </p>
              </article>
              <article className="home-thesis-card" role="listitem">
                <span className="home-thesis-card__idx" aria-hidden>
                  04
                </span>
                <p className="home-thesis-card__subtitle">Ad Auctions for Machines</p>
                <p>
                  We now have primitives for agent Identity, Reputation, Verification,
                  Payments, and Coordination &amp; Fuzzy Verification (ERC-8004,
                  x402, A2A, etc). It follows that the next primitives include
                  mechanisms for attention markets.
                </p>
              </article>
            </div>
          </div>
        </section>


        <section id="building" className="home-section" aria-labelledby="building-heading">
          <div className="home-split">
            <div className="home-split__accent">
              <Suspense fallback={null}>
                <BuildingAccentShader />
              </Suspense>
            </div>
            <div className="home-split__body home-main__prose">
              <p className="home-section__kicker">Now</p>
              <h2 id="building-heading">What I&apos;m Building</h2>
              <p>
                I&apos;m the Founder of <a href="https://scrypted.ai">Scrypted</a>,
                the AI startup dedicated to building the discovery and attention
                market for autonomous agents.
              </p>
              <p>
                We&apos;re building the Scrypted Network -- a matchmaker for AI agents
                and the rest of the world -- based on attention auctions. I&apos;m
                bringing my practical experience in AI-native orderflow management
                &amp; adaptive workflow development to the agent economy.
              </p>
              <p>
                Delula is our consumer proof of an autonomous business: not a demo, not
                a whitepaper. A viral content platform run by autonomous agents,
                orchestrated by the{' '}
                <a href="https://scrypted.ai">Scrypted Network</a>. Reinforcement
                Learning? <em>Automated</em>. Cost optimization?{' '}
                <em>Continuous</em>. Agentic Architecture?{' '}
                <em>Every subsystem is its own agent</em>. Live at{' '}
                <a href="https://delu.la">delu.la</a>.
              </p>
              <p>
                We&apos;ve raised a $1.5M pre-seed, contributed to the ERC-8004
                standard, taken top prizes at x402 hackathons for agent payments, and
                built an organic community of token holders (10k+) around our work.
              </p>
              <p className="building-cta">
                Raising our seed round. Get my attention via a16z, PTC, or Boardy:{' '}
                <BoardyIntroButton
                  introMessage="Hi Boardy, I'd like to connect with Tim Cotten (Scrypted) about what I'm building. Happy to share context so you can route this the right way."
                  label="Get an intro from Boardy"
                  className="building-cta-button"
                />
              </p>
            </div>
          </div>
        </section>

        <SkillsSection />

        <section
          id="hackathon-wins"
          className="home-section home-section--muted"
          aria-labelledby="hackathon-heading"
        >
          <div className="home-main__prose home-main__prose--wide">
            <p className="home-section__kicker">Wins</p>
            <h2 id="hackathon-heading">Hackathon Wins</h2>
            <p className="intro">
              Highlights from recent builds, mostly agent payments, on-chain games, and
              AVBs.
            </p>
            <ul className="home-card-grid home-card-grid--2">
              <li>
                <article className="home-card">
                  <span className="home-card__label">Coinbase Code NYC</span>
                  <p>
                    Winner in multiple tracks: x402-hpke (HPKE-secured transport for
                    x402) and a CDP SQL + GameFi track entry.
                  </p>
                </article>
              </li>
              <li>
                <article className="home-card">
                  <span className="home-card__label">ETHGlobal · Buenos Aires</span>
                  <p>
                    Polygon prize for x402autopay: Chromium extension for HTTP 402,
                    policy-aware autopay, and EIP-3009 USDC flows.
                  </p>
                </article>
              </li>
              <li>
                <article className="home-card">
                  <span className="home-card__label">EVE Online Frontier</span>
                  <p>
                    Decentralized, agent-driven mission system with generative art and
                    interactive NPC dialogue.
                  </p>
                </article>
              </li>
              <li>
                <article className="home-card">
                  <span className="home-card__label">ETHGlobal · Istanbul</span>
                  <p>
                    Winner for a ZK-backed AI auto-battler on Dojo and Starknet.
                  </p>
                </article>
              </li>
            </ul>
          </div>
        </section>

        <section
          id="research-contributions"
          className="home-section home-section--surface"
          aria-labelledby="research-heading"
        >
          <div className="home-main__prose home-main__prose--wide">
            <p className="home-section__kicker">Research</p>
            <h2 id="research-heading">Research &amp; Technical Contributions</h2>
            <p>
              My work sits at the intersection of persistent game AI, decentralized
              systems, and autonomous agents. Below are three core contributions that
              inform the Scrypted Network and the broader machine economy:
            </p>
            <ul className="home-card-grid home-card-grid--3">
              <li>
                <article className="home-card">
                  <span className="home-card__label">Autonomous agents</span>
                  <p>
                    <a href="https://blog.cotten.io/autonomous-virtual-beings-aaef7cbbe5de">
                      Autonomous Virtual Beings (AVBs)
                    </a>
                    : A foundational thesis defining self-owning digital lifeforms that
                    blend game AI, crypto primitives, and agentic autonomy. This
                    framework underpins much of today&apos;s AVB ecosystem and the design
                    of the Scrypted Network.
                  </p>
                </article>
              </li>
              <li>
                <article className="home-card">
                  <span className="home-card__label">Machine learning</span>
                  <p>
                    <a href="https://github.com/tcotten-scrypted/persistent-stochastic-ablation-mlp/blob/23a02dc86592a52848ba1491bc0b5d4dde9d3168/paper/pdf/Persistent%20Stochastic%20Ablation%20-%20Paper%201%20-%20SimpleMLP.pdf">
                      Persistent Stochastic Ablation (PSA) for MLPs
                    </a>
                    : A novel neural network training method that combines pruning,
                    dropout, and game-inspired &ldquo;save scumming&rdquo; techniques to
                    evolve more robust and resilient models. Explored through both theory
                    and open-source code.
                  </p>
                </article>
              </li>
              <li>
                <article className="home-card">
                  <span className="home-card__label">
                    Coordination &amp; Fuzzy Verification
                  </span>
                  <p>
                    <a href="https://blog.cotten.io/the-commit-reveal-pairwise-comparison-protocol-crpc-e1434fff94c4">
                      Commit-Reveal Pairwise Comparison Protocol (CRPC)
                    </a>
                    : A decentralized consensus primitive designed for non-deterministic
                    workloads, enabling reliable coordination and reputation mechanisms in
                    agent-to-agent systems.
                  </p>
                </article>
              </li>
            </ul>
          </div>
        </section>

        <section
          id="public-repositories"
          className="home-section home-section--muted"
          aria-labelledby="repos-heading"
        >
          <div className="home-main__prose">
            <p className="home-section__kicker">Open source</p>
            <h2 id="repos-heading">Public Repositories</h2>
            <p className="intro">
              Various tools, projects, hackathon entries, and research I&apos;ve
              open-sourced.
            </p>

            <h3 className="repo-sub">Public Goods</h3>
            <ul className="links">
              <li>
                <a href="https://github.com/tcotten-scrypted/boardyai-cta">
                  tcotten-scrypted/boardyai-cta
                </a>
                : React WhatsApp button for Boardy-mediated intros on your site.
                Unofficial community project, not affiliated with Boardy.
              </li>
            </ul>

            <h3 className="repo-sub">Research &amp; Experiments</h3>
            <ul className="links">
              <li>
                <a href="https://github.com/tcotten-scrypted/persistent-stochastic-ablation-mlp">
                  tcotten-scrypted/persistent-stochastic-ablation-mlp
                </a>
                : Persistent Stochastic Ablation (PSA) for SimpleMLP: training code,
                reproduction tooling, and paper-aligned experiments exploring robust
                neural network evolution.
              </li>
              <li>
                <a href="https://github.com/tcotten-scrypted/persistent-stochastic-ablation-resmlp">
                  tcotten-scrypted/persistent-stochastic-ablation-resmlp
                </a>
                : PSA extended to a ResMLP-style architecture with skip connections.
              </li>
              <li>
                <a href="https://github.com/tcotten-scrypted/autonomous-virtual-beings">
                  tcotten-scrypted/autonomous-virtual-beings
                </a>
                : Autonomous Virtual Beings (AVB) thesis text and machine-readable
                material on agents, decentralization, and autonomy.
              </li>
            </ul>

            <h3 className="repo-sub">In-Progress and Prototypes</h3>
            <ul className="links">
              <li>
                <a href="https://github.com/scryptedai/differential-datalog">
                  scryptedai/differential-datalog
                </a>
                : DDlog fork with Rust 1.93 upgrade, test-suite fixes, and pinned
                improvements to <code>scryptedai/differential-dataflow</code>, and
                resolved their longstanding merge-batcher OOM and kernel panic bugs.
              </li>
            </ul>

            <h3 className="repo-sub">Hackathon Winners</h3>
            <ul className="links">
              <li>
                <a href="https://github.com/scryptedai/x402-hpke">
                  scryptedai/x402-hpke
                </a>
                : HPKE envelope and unified transport for secure x402 payments (Node
                + Python, tests, spec docs). Hackathon winner, Coinbase Code NYC
                (end-to-end encrypted agent payments).
              </li>
              <li>
                <a href="https://github.com/scryptedai/x402autopay">
                  scryptedai/x402autopay
                </a>
                : Chromium extension for HTTP 402 handling, policy-aware autopay,
                and EIP-3009 USDC flows. Hackathon winner, Polygon Prize at
                ETHGlobal.
              </li>
              <li>
                <a href="https://github.com/scryptedai/hackathon">
                  scryptedai/hackathon
                </a>
                : Miscellaneous winning hackathon entries, including CDP SQL
                integration with Chibi Clash and other agent/gaming prototypes.
              </li>
            </ul>

            <h3 className="repo-sub">Misc. Tools &amp; Infrastructure</h3>
            <ul className="links">
              <li>
                <a href="https://github.com/tcotten-scrypted/network-simulator-random-assignment">
                  tcotten-scrypted/network-simulator-random-assignment
                </a>
                : Simulator for distributed load under random task-to-node
                assignment.
              </li>
              <li>
                <a href="https://github.com/tcotten-scrypted/tian-gaussian-distribution-simulator">
                  tcotten-scrypted/tian-gaussian-distribution-simulator
                </a>
                : Keccak-256-driven bitfield experiments and Gaussian-like sampling
                exploration.
              </li>
              <li>
                <a href="https://github.com/scryptedinc/piecewisegpt">
                  scryptedinc/piecewisegpt
                </a>
                : General-purpose semantic chunking library designed for long-context
                LLM workflows over small context windows.
              </li>
              <li>
                <a href="https://github.com/tcotten-scrypted/ts-aiagent-boilerplate">
                  tcotten-scrypted/ts-aiagent-boilerplate
                </a>
                : Boilerplate for Eliza-style agent extensions in TypeScript.
              </li>
              <li>
                <a href="https://github.com/scryptedinc/ffm">scryptedinc/ffm</a>
                : Five Factor Model (OCEAN) as an object-oriented library.
              </li>
              <li>
                <a href="https://github.com/tcotten-scrypted/ds-rith">
                  tcotten-scrypted/ds-rith
                </a>
                : Rodents in The Hood on Downstream game experiments.
              </li>
              <li>
                <a href="https://github.com/scryptedinc/babylonjs-boilerplate">
                  scryptedinc/babylonjs-boilerplate
                </a>
                : Babylon.js + Node/Webpack/VS starter project.
              </li>
            </ul>
          </div>
        </section>

        <section
          id="work-experience"
          className="home-section"
          aria-labelledby="work-heading"
        >
          <div className="home-main__prose">
            <p className="home-section__kicker">Career</p>
            <h2 id="work-heading">Work Experience</h2>
            <div className="home-timeline">
            <div className="home-timeline__item experience-item">
              <strong>Founder &amp; CEO, Scrypted</strong>
              <span className="years">Jan 2022 – present · full-time</span>
              <span className="where">Washington, DC metropolitan area</span>
              <p>
                Building decentralized infrastructure for autonomous AI agents,
                including the Scrypted Network (AVS for attention auctions and agent
                coordination). Public contributions to agent identity (ERC-8004) and
                payments (x402). Raised $1.5M pre-seed. Shipped Delula (first
                autonomous business entity) and related infrastructure.
              </p>
            </div>
            <div className="home-timeline__item experience-item">
              <strong>Adjunct Instructor, George Mason University</strong>
              <span className="years">Aug 2024 – present</span>
              <span className="where">Fairfax, VA</span>
              <p>
                Teach GMU&apos;s first <em>Generative AI in Game Development</em>{' '}
                course: curriculum design and classroom delivery bridging modern ML
                tooling with game production.
              </p>
            </div>
            <div className="home-timeline__item experience-item">
              <strong>Chief Technology Officer, Agilla Pro</strong>
              <span className="years">Apr 2012 – Dec 2021</span>
              <span className="where">Washington, DC metropolitan area</span>
              <p>
                Owned APIs and SaaS platforms for affiliate order aggregation and
                partner marketing programs. Integrated traditional and crypto payment
                rails (PayPal, Apple Pay, Google Pay, digital assets) with
                PCI/DSS-aligned security. Before GenAI went mainstream, applied
                predictive modeling, forecasting, and optimization to operations and
                growth: advanced address verification and mapping cut delivery failures
                roughly 45%; analytics, SEO, and funnel experiments drove large
                conversion gains (e.g. ~260% lift for key customers) with improved CPC
                efficiency.
              </p>
            </div>
            <div className="home-timeline__item experience-item">
              <strong>Director of Online Development, KaBOOM!</strong>
              <span className="years">May 2011 – May 2012</span>
              <span className="where">Washington, DC</span>
              <p>
                Led mobile and web products for national play-space initiatives,
                including a parent-sponsored iPhone app, gamified crowdfunding
                platform, and GIS-driven &ldquo;play desert&rdquo; mapping.
              </p>
            </div>
            <div className="home-timeline__item experience-item">
              <strong>
                Senior Technical Designer, IdeaFabrik / Second Star Interactive
              </strong>
              <span className="years">Jan 2011 – May 2011</span>
              <span className="where">Centreville, VA</span>
              <p>
                Built social games on the Idea System platform and contributed to a
                cloud-based toolchain used by a large developer base.
              </p>
            </div>
            <div className="home-timeline__item experience-item">
              <strong>Design Director, New Zhili / Eduwise</strong>
              <span className="years">Apr 2010 – Jan 2011</span>
              <span className="where">Reston, VA</span>
              <p>
                Directed design and engineering for a complex MMO-scale title
                (coordinating with Beijing team). Studio secured follow-on funding
                after successful shipped demos.
              </p>
            </div>
            <div className="home-timeline__item experience-item">
              <strong>Lead Game Developer, Mythic Entertainment (Electronic Arts)</strong>
              <span className="years">Dec 2007 – Feb 2010</span>
              <span className="where">Fairfax, VA</span>
              <p>
                Managed the Live Events team for <em>Ultima Online</em>; served as
                lead designer on the <em>Stygian Abyss</em> expansion.
              </p>
            </div>
            <div className="home-timeline__item experience-item">
              <strong>Game Developer, Electronic Arts</strong>
              <span className="years">Sep 2005 – Dec 2007</span>
              <span className="where">Redwood City, CA</span>
              <p>
                C++ and proprietary scripting across multiple titles. Built NPC AI
                systems (speech and interaction libraries, simulation schedules,
                graph-navigated cooperative behavior): foundational experience for
                later live-ops and autonomous agent work.
              </p>
            </div>
            </div>
          </div>
        </section>

        <section
          className="home-section home-section--surface"
          aria-label="Education and accelerator programs"
        >
          <div className="home-meta-row">
            <div id="education" className="home-meta-col">
              <div className="home-main__prose">
                <p className="home-section__kicker">Education</p>
                <h2 id="education-heading">Education</h2>
                <ul>
                  <li>Dropped out of Brigham Young University (BYU Provo).</li>
                  <li>
                    Today I teach the first Generative AI course at George Mason
                    University (GMU Fairfax).
                  </li>
                </ul>
              </div>
            </div>
            <div id="incubators-accelerators" className="home-meta-col">
              <div className="home-main__prose">
                <p className="home-section__kicker">Programs</p>
                <h2 id="incubators-heading">Incubators &amp; Accelerators</h2>
                <ul>
                  <li>Virginia Serious Game Institute (VSGI)</li>
                  <li>a16z Crypto Startup Accelerator (CSX 2024 London)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          id="talks-presentations"
          className="home-section home-section--muted"
          aria-labelledby="talks-heading"
        >
          <div className="home-main__prose">
            <p className="home-section__kicker">Talks</p>
            <h2 id="talks-heading">Selected Talks &amp; Presentations</h2>
            <ul className="home-talks">
              <li>
                ETHDC III 2026 – Panel: &ldquo;AI Agents &amp; Protocol Growth&rdquo;
              </li>
              <li>
                GDC 2025 NPC Day – &ldquo;h011yw00d + AVBs: Beyond the Yap&rdquo;
              </li>
              <li>Consensus 2025 – AI Agent Demos</li>
              <li>
                DeAI Day Brooklyn 2025 – &ldquo;DeAI Needs a Front End&rdquo; panel and
                related sessions
              </li>
              <li>ETHDenver 2025 AI Summit – AI Agents panel</li>
              <li>
                The AI Summit New York – Keynote: &ldquo;Autonomous AI Agents:
                Yesterday, Today, &amp; the Decentralized Tomorrow&rdquo;
              </li>
              <li>
                ETH Devcon 2024 NPC Day (Bangkok) – Keynote: &ldquo;Autonomous AI
                Agents: Yesterday, Today, and the Decentralized Tomorrow&rdquo;
              </li>
              <li>
                Virginia Serious Game Institute Speaker Series – Multiple talks on
                metaverse, game development, and AI
              </li>
            </ul>
          </div>
        </section>

        <section id="media" className="home-section" aria-labelledby="media-heading">
          <div className="home-main__prose">
            <p className="home-section__kicker">Media</p>
            <h2 id="media-heading">Writings</h2>
            <p className="intro">
              Video and other formats will show up here over time. For now, selected
              articles from{' '}
              <a href="https://blog.cotten.io">blog.cotten.io</a> (Cotten.IO on
              Medium). <a href="https://blog.cotten.io/all">Full archive</a>.
            </p>
            <ul className="links home-writings-list">
              <WritingsLinks />
            </ul>
          </div>
        </section>
      </main>

      <footer className="home-footer meta">
        <p>
          <a href="https://scrypted.ai">Scrypted</a> ·{' '}
          <a href="https://delu.la">Delula</a> ·{' '}
          <a href="https://www.linkedin.com/in/timcotten">LinkedIn</a> ·{' '}
          <a href="https://x.com/CottenIO">X</a> ·{' '}
          <a href="https://warpcast.com/cottenio">Farcaster</a> ·{' '}
          <a href="mailto:tim@cotten.io">Personal Email</a> ·{' '}
          <a href="mailto:tcotten2@gmu.edu">University Email</a>
        </p>
        <p>© 2026 Tim Cotten</p>
      </footer>
    </div>
  )
}


const WRITINGS: [string, string][] = [
  [
    'https://blog.cotten.io/scrypted-raises-1-5m-to-build-decentralized-ai-agents-the-inori-network-for-web4-7a6c71592b36',
    'Scrypted Raises $1.5M to Build Decentralized AI Agents & the Scrypted Network',
  ],
  [
    'https://blog.cotten.io/the-commit-reveal-pairwise-comparison-protocol-crpc-e1434fff94c4',
    'The Commit-Reveal Pairwise Comparison Protocol (CRPC)',
  ],
  [
    'https://blog.cotten.io/autonomous-virtual-beings-aaef7cbbe5de',
    'Autonomous Virtual Beings',
  ],
  [
    'https://blog.cotten.io/usdc-stablecoin-chaos-explained-in-3-easy-charts-7fa6a395ac93',
    'USDC Stablecoin Chaos Explained in 3 Easy Charts',
  ],
  [
    'https://blog.cotten.io/bitcoin-is-deflationary-inflationary-both-neither-bde3056dcafa',
    'Bitcoin is Deflationary, Inflationary, & Both/Neither',
  ],
  [
    'https://blog.cotten.io/that-time-we-burned-down-players-houses-in-ultima-online-7e556618c8f0',
    'That Time We Burned Down Players\u2019 Houses in Ultima Online',
  ],
  [
    'https://blog.cotten.io/why-i-quit-my-job-on-new-years-df3ee8dbfb13',
    'Why I Quit My Job On New Year\u2019s',
  ],
  [
    'https://blog.cotten.io/the-150k-discord-crypto-hack-b3dde6698072',
    'The $150k Discord Crypto Hack',
  ],
  [
    'https://blog.cotten.io/tracing-the-twitter-hacked-bitcoins-47094eee6c5f',
    'Tracing the Twitter Hacked Bitcoins',
  ],
  [
    'https://blog.cotten.io/one-lambda-to-rule-them-all-44401893123f',
    'One Lambda to Rule Them All',
  ],
  [
    'https://blog.cotten.io/how-to-eat-gas-in-ethereum-c34f1e421022',
    'How to Eat Gas in Ethereum',
  ],
  [
    'https://blog.cotten.io/deploying-the-libra-core-blockchain-currency-on-amazon-ec2-f832d4bfadc8',
    'Deploying the Libra Core Blockchain Currency on Amazon EC2',
  ],
  [
    'https://blog.cotten.io/defi-deposit-account-tutorial-2d66def4434',
    'DeFi: Deposit Account Tutorial',
  ],
  [
    'https://blog.cotten.io/russias-bitcoin-hacking-funds-c0a87b33f1e2',
    'Russia\u2019s Bitcoin Hacking Funds',
  ],
  [
    'https://blog.cotten.io/decentralizing-a-certificate-of-deposit-45f62b65edd3',
    'Decentralizing a Certificate of Deposit',
  ],
  [
    'https://blog.cotten.io/an-overview-of-bitcoin-transaction-types-f22677b8e5a9',
    'An Overview of Bitcoin Transaction Types',
  ],
  [
    'https://blog.cotten.io/a-very-sleepy-mysql-attack-bff80975fda7',
    'A Very SLEEPy MySQL Attack',
  ],
  [
    'https://blog.cotten.io/a-taste-of-mysql-in-c-87c5de84a31d',
    'A Taste of MySQL in C',
  ],
  [
    'https://blog.cotten.io/hacking-node-js-may-i-have-this-repo-5c16bb6a0da7',
    'Hacking Node.js: \u201cMay I Have This Repo?\u201d',
  ],
  [
    'https://blog.cotten.io/begging-for-infinite-loops-in-solidity-80d7c2f85c6d',
    'Begging For Infinite Loops in Solidity',
  ],
  [
    'https://blog.cotten.io/ethereums-eip-1014-create-2-d17b1a184498',
    'Ethereum\u2019s EIP 1014: CREATE 2',
  ],
  [
    'https://blog.cotten.io/ghost-emails-hacking-gmails-ux-to-hide-the-sender-46ef66a61eff',
    'Ghost Emails: Hacking Gmail\u2019s UX to Hide the Sender',
  ],
  [
    'https://blog.cotten.io/hacking-gmail-with-weird-from-fields-d6494254722f',
    'Hacking GMail With Weird From Fields',
  ],
  [
    'https://blog.cotten.io/bitcoin-money-laundering-and-muellers-12-e2fa91097e12',
    'Bitcoin Money Laundering and Mueller\u2019s 12',
  ],
  [
    'https://blog.cotten.io/thinking-in-solidity-6670c06390a9',
    'Thinking in Solidity',
  ],
  [
    'https://blog.cotten.io/hackerrank-extra-long-factorials-146a50e71580',
    'HackerRank: Extra Long Factorials',
  ],
  [
    'https://blog.cotten.io/why-is-apache-vulnerable-by-default-743eec222013',
    'Why is Apache Vulnerable by Default?',
  ],
]

function WritingsLinks() {
  return (
    <>
      {WRITINGS.map(([href, label]) => (
        <li key={href}>
          <a href={href}>{label}</a>
        </li>
      ))}
    </>
  )
}
