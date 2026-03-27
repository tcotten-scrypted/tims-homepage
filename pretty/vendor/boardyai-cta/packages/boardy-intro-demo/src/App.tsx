import { BoardyIntroButton } from "boardy-intro-react";
import "boardy-intro-react/style.css";

const DEFAULT_MSG =
  "Hi Boardy, could you kindly help me connect with Tim Cotten, the founder of Scrypted?";
const CUSTOM_MSG =
  "Hi Boardy, could you kindly help me connect with someone building devtools for smart homes?";

function waHref(text: string) {
  const q = new URLSearchParams({ text });
  return `https://wa.me/14159699735?${q.toString()}`;
}

export default function App() {
  return (
    <main className="demo">
      <header className="demo__header">
        <h1 className="demo__title">boardy-intro-react</h1>
        <p className="demo__lede">
          Deliverable in action: the button opens WhatsApp with a prefilled
          intro message.
        </p>
      </header>

      <section className="demo__card">
        <h2 className="demo__h2">Default intro message</h2>
        <p className="demo__msg">{DEFAULT_MSG}</p>
        <BoardyIntroButton />
        <pre className="demo__url" tabIndex={0}>
          {waHref(DEFAULT_MSG)}
        </pre>
      </section>

      <section className="demo__card">
        <h2 className="demo__h2">Custom introMessage override</h2>
        <p className="demo__msg">{CUSTOM_MSG}</p>
        <BoardyIntroButton introMessage={CUSTOM_MSG} />
        <pre className="demo__url" tabIndex={0}>
          {waHref(CUSTOM_MSG)}
        </pre>
      </section>

      <section className="demo__card">
        <h2 className="demo__h2">No WhatsApp icon, custom colors</h2>
        <BoardyIntroButton
          introMessage={CUSTOM_MSG}
          showWhatsAppIcon={false}
          backgroundColor="#0f766e"
          textColor="#ecfeff"
          label="Intro via Boardy"
        />
      </section>
    </main>
  );
}
