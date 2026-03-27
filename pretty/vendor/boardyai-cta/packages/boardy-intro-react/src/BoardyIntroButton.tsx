import type { CSSProperties } from "react";
import { WhatsAppIcon } from "./WhatsAppIcon";

const DEFAULT_INTRO_MESSAGE =
  "Hi Boardy, could you kindly help me connect with Tim Cotten, the founder of Scrypted?";

const DEFAULT_BOARDY_ICON =
  "https://cdn.prod.website-files.com/689e028fcf9bdc27f0905a0e/690a8c71193c74e2afda9d94_profileIcon.png";

const DEFAULT_PHONE = "14159699735";

export interface BoardyIntroButtonProps {
  /** Full message sent as the WhatsApp `text` query param. */
  introMessage?: string;
  /** Digits only (no +); default matches Boardy’s public WhatsApp number. */
  phoneNumber?: string;
  backgroundColor?: string;
  textColor?: string;
  /** Button label (not the WhatsApp message). */
  label?: string;
  showWhatsAppIcon?: boolean;
  boardyIconSrc?: string;
  className?: string;
  style?: CSSProperties;
}

function waMeUrl(phoneDigits: string, text: string): string {
  const digits = phoneDigits.replace(/\D/g, "");
  const q = new URLSearchParams({ text });
  return `https://wa.me/${digits}?${q.toString()}`;
}

export function BoardyIntroButton({
  introMessage = DEFAULT_INTRO_MESSAGE,
  phoneNumber = DEFAULT_PHONE,
  backgroundColor = "#22c55e",
  textColor = "#ffffff",
  label = "Get an Intro from Boardy",
  showWhatsAppIcon = true,
  boardyIconSrc = DEFAULT_BOARDY_ICON,
  className,
  style,
}: BoardyIntroButtonProps) {
  const href = waMeUrl(phoneNumber, introMessage);
  const mergedClass = ["boardy-intro-react__anchor", className]
    .filter(Boolean)
    .join(" ");

  const mergedStyle: CSSProperties = {
    backgroundColor,
    color: textColor,
    ...style,
  };

  return (
    <a
      className={mergedClass}
      style={mergedStyle}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens WhatsApp)`}
    >
      <img
        className="boardy-intro-react__avatar"
        src={boardyIconSrc}
        alt=""
        width={28}
        height={28}
        decoding="async"
      />
      <span className="boardy-intro-react__label">{label}</span>
      {showWhatsAppIcon ? (
        <span className="boardy-intro-react__icon">
          <WhatsAppIcon size={22} />
        </span>
      ) : null}
    </a>
  );
}
