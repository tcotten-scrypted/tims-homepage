import { BoardyIntroButton } from 'boardy-intro-react'
import 'boardy-intro-react/style.css'
import './site.css'

function SkillsSection() {
  return (
    <section id="skills">
      <h2>Skills</h2>

      <h3>Human Languages</h3>
      <ul>
        <li>English</li>
        <li>Japanese</li>
      </ul>

      <h3>Programming Languages</h3>
      <ul>
        <li>Python</li>
        <li>TypeScript / JavaScript</li>
        <li>Rust</li>
        <li>Solidity</li>
        <li>Cairo</li>
        <li>Move</li>
        <li>SQL</li>
        <li>C</li>
        <li>C++</li>
        <li>C#</li>
        <li>Lua</li>
        <li>Prolog</li>
        <li>Lisp</li>
        <li>PHP</li>
        <li>Ruby</li>
        <li>Java</li>
      </ul>

      <h3>Web Frameworks</h3>
      <ul>
        <li>React</li>
        <li>Next.js</li>
        <li>Node.js</li>
        <li>Flask / FastAPI</li>
        <li>Django</li>
        <li>Ruby on Rails</li>
      </ul>

      <h3>AI/ML Frameworks</h3>
      <ul>
        <li>PyTorch</li>
        <li>JAX</li>
        <li>TensorFlow</li>
        <li>scikit-learn</li>
        <li>Hugging Face Transformers</li>
      </ul>

      <h3>Agentic Frameworks</h3>
      <ul>
        <li>LangChain</li>
        <li>LangGraph</li>
        <li>LangFuse</li>
        <li>AutoGPT</li>
        <li>OpenAgents</li>
        <li>AVB</li>
        <li>ElizaOS</li>
        <li>DayDreams</li>
      </ul>

      <h3>Game Frameworks</h3>
      <ul>
        <li>Unity</li>
        <li>Three.js</li>
        <li>Babylon.js</li>
      </ul>

      <h3>Blockchain Development</h3>
      <ul>
        <li>
          <strong>Smart Contract Languages</strong>: Solidity, Cairo, Move
        </li>
        <li>
          <strong>Frameworks &amp; Tooling</strong>: Hardhat, Foundry, Forge,
          Anvil
        </li>
        <li>
          <strong>ZK / Zero-Knowledge Proofs</strong>: Circom, Noir, zk-SNARKs,
          zk-STARKs, ZK-rollups
        </li>
        <li>
          <strong>Security &amp; Auditing</strong>: Slither, Aderyn, Echidna,
          Medusa
        </li>
        <li>
          <strong>Libraries &amp; Standards</strong>: OpenZeppelin Contracts, ERC
          standards
        </li>
        <li>
          <strong>Frontend Integration</strong>: wagmi, viem, ethers.js
        </li>
        <li>
          <strong>Infrastructure</strong>: CDP, Alchemy, Infura, The Graph
        </li>
        <li>
          <strong>Debugging &amp; Simulation</strong>: Tenderly
        </li>
        <li>
          <strong>Cross-Chain</strong>: Ethereum Interop (EIL), Wire Network,
          Chainlink
        </li>
      </ul>

      <h3>DevTools &amp; Security</h3>
      <ul>
        <li>VS Code + Vim</li>
        <li>Cursor</li>
        <li>Claude Code, Codex</li>
        <li>Foundry, Hardhat</li>
        <li>Slither, Aderyn</li>
        <li>Echidna, Medusa</li>
        <li>Tenderly</li>
        <li>OpenZeppelin, Defender</li>
        <li>Solhint</li>
        <li>Git, GitOps</li>
      </ul>

      <h3>DevOps</h3>
      <ul>
        <li>Linux, Windows, macOS</li>
        <li>Git</li>
        <li>Docker, Kubernetes</li>
        <li>Terraform</li>
        <li>GitHub Actions, Jenkins</li>
        <li>Ansible</li>
        <li>Prometheus, Grafana, OpenTelemetry</li>
      </ul>

      <h3>Amazon Web Services (AWS)</h3>
      <ul>
        <li>EC2</li>
        <li>ELB, Multi-AZ, Auto Scaling</li>
        <li>Lambda</li>
        <li>Bedrock, Guardrails</li>
        <li>SageMaker</li>
      </ul>

      <h3>Security &amp; Compliance</h3>
      <ul>
        <li>PCI/DSS</li>
        <li>Zero Trust, IAM hardening</li>
        <li>DevSecOps, policy-as-code</li>
        <li>OWASP LLM Top 10</li>
        <li>Cryptography, blockchain &amp; ZKP</li>
        <li>Secure smart contract patterns, invariant testing</li>
      </ul>

      <h3>Cross-Cutting</h3>
      <ul>
        <li>Full-stack Web3: contracts, frontend, backend</li>
        <li>AI-augmented workflows, Cursor, Claude</li>
        <li>Hybrid cloud, on-prem, multi-OS</li>
        <li>High availability, production reliability</li>
      </ul>
    </section>
  )
}

export default function App() {
  return (
    <>
      <header>
        <h1>Tim Cotten</h1>
        <p className="tagline">
          Building a monopoly in the machine economy; previously built the AI
          systems that powered the virtual economies of EA&apos;s online worlds.
        </p>
        <p className="header-note">
          Also: Adjunct at George Mason University, teaching the first{' '}
          <em>Generative AI in Game Development</em> course. Office hours for
          undergrads and AI agents.
        </p>
        <p className="cta">
          <a href="https://scrypted.ai">Scrypted</a> ·{' '}
          <a href="https://delu.la">Delula</a> ·{' '}
          <a href="https://www.linkedin.com/in/timcotten">LinkedIn</a> ·{' '}
          <a href="https://x.com/CottenIO">X</a> ·{' '}
          <a href="https://warpcast.com/cottenio">Farcaster</a> ·{' '}
          <a href="mailto:tim@cotten.io">Personal Email</a> ·{' '}
          <a href="mailto:tcotten2@gmu.edu">University Email</a>
        </p>
      </header>

      <section id="thesis">
        <h2>Thesis</h2>
        <ol>
          <li>
            The challenges in building an agentic economy today are inherently
            similar to those we faced building the first generation of Massively
            Multiplayer Online Role Playing Games (MMORPGs).{' '}
          </li>
          <li>
            Agent-to-Agent payments, whether on-chain or off-chain, will
            inevitably approach the scale of human payments.
          </li>
          <li>
            Humans are susceptible to persuasion, and sufficiently advanced AI
            agents - tasked with fulfilling goals like shopping based on their
            user&apos;s preferences - will also be susceptible to persuasion.
          </li>
          <li>
            We now have primitives for agent Identity, Reputation, Verification,
            Payments, and Coordination (ERC-8004, x402, A2A, etc). It follows
            that the next primitives include mechanisms for attention markets.
          </li>
        </ol>
      </section>

      <section id="building">
        <h2>What I&apos;m Building</h2>
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
          Raising our seed round. Get my attention from a qualified AI Agent intro:{' '}
          <BoardyIntroButton
            introMessage="Hi Boardy — I'd like to connect with Tim Cotten (Scrypted) about what I'm building. Happy to share context so you can route this the right way."
            label="Get an intro from Boardy"
            className="building-cta-button"
          />
        </p>
      </section>

      <SkillsSection />

      <section id="hackathon-wins">
        <h2>Hackathon Wins</h2>
        <p className="intro">
          Highlights from recent builds—mostly agent payments, on-chain games, and
          AVBs.
        </p>
        <ul>
          <li>
            <strong>Coinbase Code NYC</strong> — Winner in multiple tracks:
            x402-hpke (HPKE-secured transport for x402) and a CDP SQL + GameFi
            track entry.
          </li>
          <li>
            <strong>ETHGlobal (Buenos Aires)</strong> — Polygon prize for
            x402autopay: Chromium extension for HTTP 402, policy-aware autopay,
            and EIP-3009 USDC flows.
          </li>
          <li>
            <strong>EVE Online Frontier</strong> — Decentralized, agent-driven
            mission system with generative art and interactive NPC dialogue.
          </li>
          <li>
            <strong>ETHGlobal (Istanbul)</strong> — Winner for a ZK-backed AI
            auto-battler on Dojo and Starknet.
          </li>
        </ul>
      </section>

      <section id="research-contributions">
        <h2>Research &amp; Technical Contributions</h2>
        <p>
          My work sits at the intersection of persistent game AI, decentralized
          systems, and autonomous agents. Below are three core contributions that
          inform the Scrypted Network and the broader machine economy:
        </p>
        <ul>
          <li>
            <strong>
              <a href="https://blog.cotten.io/autonomous-virtual-beings-aaef7cbbe5de">
                Autonomous Virtual Beings (AVBs)
              </a>
            </strong>{' '}
            — A foundational thesis defining self-owning digital lifeforms that
            blend game AI, crypto primitives, and agentic autonomy. This
            framework underpins much of today&apos;s AVB ecosystem and the design
            of the Scrypted Network.
          </li>
          <li>
            <strong>
              <a href="https://github.com/tcotten-scrypted/persistent-stochastic-ablation-mlp/blob/23a02dc86592a52848ba1491bc0b5d4dde9d3168/paper/pdf/Persistent%20Stochastic%20Ablation%20-%20Paper%201%20-%20SimpleMLP.pdf">
                Persistent Stochastic Ablation (PSA) for MLPs
              </a>
            </strong>{' '}
            — A novel neural network training method that combines pruning,
            dropout, and game-inspired &ldquo;save scumming&rdquo; techniques to
            evolve more robust and resilient models. Explored through both theory
            and open-source code.
          </li>
          <li>
            <strong>
              <a href="https://blog.cotten.io/the-commit-reveal-pairwise-comparison-protocol-crpc-e1434fff94c4">
                Commit-Reveal Pairwise Comparison Protocol (CRPC)
              </a>
            </strong>{' '}
            — A decentralized consensus primitive designed for non-deterministic
            workloads, enabling reliable coordination and reputation mechanisms in
            agent-to-agent systems.
          </li>
        </ul>
      </section>

      <section id="public-repositories">
        <h2>Public Repositories</h2>
        <p className="intro">
          Various tools, projects, hackathon entries, and research I&apos;ve
          open-sourced.
        </p>

        <h3 className="repo-sub">Research &amp; Experiments</h3>
        <ul className="links">
          <li>
            <a href="https://github.com/tcotten-scrypted/persistent-stochastic-ablation-mlp">
              tcotten-scrypted/persistent-stochastic-ablation-mlp
            </a>{' '}
            — Persistent Stochastic Ablation (PSA) for SimpleMLP: training code,
            reproduction tooling, and paper-aligned experiments exploring robust
            neural network evolution.
          </li>
          <li>
            <a href="https://github.com/tcotten-scrypted/persistent-stochastic-ablation-resmlp">
              tcotten-scrypted/persistent-stochastic-ablation-resmlp
            </a>{' '}
            — PSA extended to a ResMLP-style architecture with skip connections.
          </li>
          <li>
            <a href="https://github.com/tcotten-scrypted/autonomous-virtual-beings">
              tcotten-scrypted/autonomous-virtual-beings
            </a>{' '}
            — Autonomous Virtual Beings (AVB) thesis text and machine-readable
            material on agents, decentralization, and autonomy.
          </li>
        </ul>

        <h3 className="repo-sub">In-Progress and Prototypes</h3>
        <ul className="links">
          <li>
            <a href="https://github.com/scryptedai/differential-datalog">
              scryptedai/differential-datalog
            </a>{' '}
            — DDlog fork with Rust 1.93 upgrade, test-suite fixes, and pinned
            improvements to <code>scryptedai/differential-dataflow</code> (fixing
            merge-batcher OOM and kernel panics).
          </li>
        </ul>

        <h3 className="repo-sub">Hackathon Winners</h3>
        <ul className="links">
          <li>
            <a href="https://github.com/scryptedai/x402-hpke">
              scryptedai/x402-hpke
            </a>{' '}
            — HPKE envelope and unified transport for secure x402 payments (Node
            + Python, tests, spec docs). Hackathon winner — Coinbase Code NYC
            (end-to-end encrypted agent payments).
          </li>
          <li>
            <a href="https://github.com/scryptedai/x402autopay">
              scryptedai/x402autopay
            </a>{' '}
            — Chromium extension for HTTP 402 handling, policy-aware autopay,
            and EIP-3009 USDC flows. Hackathon winner — Polygon Prize at
            ETHGlobal.
          </li>
          <li>
            <a href="https://github.com/scryptedai/hackathon">
              scryptedai/hackathon
            </a>{' '}
            — Miscellaneous winning hackathon entries, including CDP SQL
            integration with Chibi Clash and other agent/gaming prototypes.
          </li>
        </ul>

        <h3 className="repo-sub">Misc. Tools &amp; Infrastructure</h3>
        <ul className="links">
          <li>
            <a href="https://github.com/tcotten-scrypted/network-simulator-random-assignment">
              tcotten-scrypted/network-simulator-random-assignment
            </a>{' '}
            — Simulator for distributed load under random task-to-node
            assignment.
          </li>
          <li>
            <a href="https://github.com/tcotten-scrypted/tian-gaussian-distribution-simulator">
              tcotten-scrypted/tian-gaussian-distribution-simulator
            </a>{' '}
            — Keccak-256–driven bitfield experiments and Gaussian-like sampling
            exploration.
          </li>
          <li>
            <a href="https://github.com/scryptedinc/piecewisegpt">
              scryptedinc/piecewisegpt
            </a>{' '}
            — General-purpose semantic chunking library designed for long-context
            LLM workflows over small context windows.
          </li>
          <li>
            <a href="https://github.com/tcotten-scrypted/ts-aiagent-boilerplate">
              tcotten-scrypted/ts-aiagent-boilerplate
            </a>{' '}
            — Boilerplate for Eliza-style agent extensions in TypeScript.
          </li>
          <li>
            <a href="https://github.com/scryptedinc/ffm">scryptedinc/ffm</a> —
            Five Factor Model (OCEAN) as an object-oriented library.
          </li>
          <li>
            <a href="https://github.com/tcotten-scrypted/ds-rith">
              tcotten-scrypted/ds-rith
            </a>{' '}
            — Rodents in The Hood on Downstream game experiments.
          </li>
          <li>
            <a href="https://github.com/scryptedinc/babylonjs-boilerplate">
              scryptedinc/babylonjs-boilerplate
            </a>{' '}
            — Babylon.js + Node/Webpack/VS starter project.
          </li>
        </ul>
      </section>

      <section id="work-experience">
        <h2>Work Experience</h2>
        <div className="experience-item">
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
        <div className="experience-item">
          <strong>Adjunct Instructor, George Mason University</strong>
          <span className="years">Aug 2024 – present</span>
          <span className="where">Fairfax, VA</span>
          <p>
            Teach GMU&apos;s first <em>Generative AI in Game Development</em>{' '}
            course — curriculum design and classroom delivery bridging modern ML
            tooling with game production.
          </p>
        </div>
        <div className="experience-item">
          <strong>Chief Technology Officer, Agilla Pro</strong>
          <span className="years">Apr 2012 – Dec 2021</span>
          <span className="where">Washington, DC metropolitan area</span>
          <p>
            Owned APIs and SaaS platforms for affiliate order aggregation and
            partner marketing programs. Integrated traditional and crypto payment
            rails (PayPal, Apple Pay, Google Pay, digital assets) with
            PCI/DSS-aligned security. Before GenAI went mainstream, applied
            predictive modeling, forecasting, and optimization to operations and
            growth—advanced address verification and mapping cut delivery failures
            roughly 45%; analytics, SEO, and funnel experiments drove large
            conversion gains (e.g. ~260% lift for key customers) with improved CPC
            efficiency.
          </p>
        </div>
        <div className="experience-item">
          <strong>Director of Online Development, KaBOOM!</strong>
          <span className="years">May 2011 – May 2012</span>
          <span className="where">Washington, DC</span>
          <p>
            Led mobile and web products for national play-space initiatives,
            including a parent-sponsored iPhone app, gamified crowdfunding
            platform, and GIS-driven &ldquo;play desert&rdquo; mapping.
          </p>
        </div>
        <div className="experience-item">
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
        <div className="experience-item">
          <strong>Design Director, New Zhili / Eduwise</strong>
          <span className="years">Apr 2010 – Jan 2011</span>
          <span className="where">Reston, VA</span>
          <p>
            Directed design and engineering for a complex MMO-scale title
            (coordinating with Beijing team). Studio secured follow-on funding
            after successful shipped demos.
          </p>
        </div>
        <div className="experience-item">
          <strong>Lead Game Developer, Mythic Entertainment (Electronic Arts)</strong>
          <span className="years">Dec 2007 – Feb 2010</span>
          <span className="where">Fairfax, VA</span>
          <p>
            Managed the Live Events team for <em>Ultima Online</em>; served as
            lead designer on the <em>Stygian Abyss</em> expansion.
          </p>
        </div>
        <div className="experience-item">
          <strong>Game Developer, Electronic Arts</strong>
          <span className="years">Sep 2005 – Dec 2007</span>
          <span className="where">Redwood City, CA</span>
          <p>
            C++ and proprietary scripting across multiple titles. Built NPC AI
            systems (speech and interaction libraries, simulation schedules,
            graph-navigated cooperative behavior) — foundational experience for
            later live-ops and autonomous agent work.
          </p>
        </div>
      </section>

      <section id="education">
        <h2>Education</h2>
        <ul>
          <li>Dropped out of Brigham Young University (BYU Provo).</li>
          <li>
            Today I teach the first Generative AI course at George Mason
            University (GMU Fairfax).
          </li>
        </ul>
      </section>

      <section id="incubators-accelerators">
        <h2>Incubators &amp; Accelerators</h2>
        <ul>
          <li>Virginia Serious Game Institute (VSGI)</li>
          <li>a16z Crypto Startup Accelerator (CSX 2024 London)</li>
        </ul>
      </section>

      <section id="talks-presentations">
        <h2>Selected Talks &amp; Presentations</h2>
        <ul>
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
      </section>

      <section id="writings">
        <h2>Writings</h2>
        <p className="intro">
          Selected articles from{' '}
          <a href="https://blog.cotten.io">blog.cotten.io</a> (Cotten.IO on
          Medium). <a href="https://blog.cotten.io/all">Full archive</a>.
        </p>
        <ul className="links">
          <WritingsLinks />
        </ul>
      </section>

      <footer className="meta">
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
    </>
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
