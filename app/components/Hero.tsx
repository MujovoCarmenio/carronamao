"use client";

import { useEffect, useState } from "react";

const NODES: [number, number, "a" | "g"][] = [
  [525, 180, "a"],
  [420, 310, "g"],
  [405, 395, "a"],
  [375, 450, "g"],
  [328, 418, "a"],
  [272, 398, "g"],
  [295, 345, "a"],
  [262, 296, "g"],
  [238, 244, "a"],
  [220, 192, "g"],
  [288, 168, "a"],
  [380, 60, "g"],
  [235, 485, "a"],
  [180, 490, "g"],
  [175, 458, "a"],
  [460, 220, "g"],
  [340, 250, "a"],
  [200, 350, "g"],
  [150, 400, "a"],
];

export default function Hero() {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero__text">
        <p className="eyebrow">Ndlovu Digital · Maputo, Moçambique</p>
        <h1>
          Infra-estrutura digital
          <br />
          que não <em>esquece</em>.
        </h1>
        <p className="hero__sub">
          Desenhamos e construímos aplicações móveis, APIs e integrações de
          pagamento pensadas para as condições reais do mercado moçambicano —
          da cobertura instável da EDM à rede M-Pesa.
        </p>
        <div className="hero__actions">
          <a href="#trabalho" className="btn btn--primary">
            Ver o nosso trabalho
          </a>
          <a href="#contacto" className="btn btn--ghost">
            Fale connosco →
          </a>
        </div>
      </div>

      <div
        className={`hero__graphic ${drawn ? "is-drawn" : ""}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 600 560" width="100%" height="100%">
          <g className="mesh">
            <line x1="460" y1="220" x2="525" y2="180" />
            <line x1="460" y1="220" x2="420" y2="310" />
            <line x1="340" y1="250" x2="288" y2="168" />
            <line x1="340" y1="250" x2="238" y2="244" />
            <line x1="200" y1="350" x2="262" y2="296" />
            <line x1="200" y1="350" x2="175" y2="458" />
            <line x1="150" y1="400" x2="180" y2="490" />
            <line x1="150" y1="400" x2="235" y2="485" />
            <line x1="460" y1="220" x2="340" y2="250" />
            <line x1="200" y1="350" x2="150" y2="400" />
          </g>

          <path
            className="line line--head"
            d="M 380,60 C 460,55 520,110 525,180 C 530,250 480,300 420,310
               C 440,340 430,375 405,395 C 415,420 400,445 375,450
               C 350,455 330,440 328,418 C 305,428 280,420 272,398
               C 290,385 300,365 295,345 C 270,340 255,318 262,296
               C 240,288 228,266 238,244 C 218,236 208,214 220,192
               C 235,168 265,158 288,168 C 300,130 335,100 380,60 Z"
          />
          <path
            className="line line--trunk"
            d="M 300,420 C 280,450 260,470 235,485 C 215,497 195,500 180,490
               C 168,482 165,468 175,458"
          />

          {NODES.map(([x, y, c], i) => (
            <circle
              key={i}
              className={`node node--${c}`}
              cx={x}
              cy={y}
              r={c === "a" ? 4.5 : 3.5}
              style={{ animationDelay: `${i * 90}ms` }}
            />
          ))}
        </svg>
      </div>
    </section>
  );
}
