const ITEMS = [
  {
    title: "Aplicações móveis",
    tone: "accent" as const,
    description:
      "Apps nativos em React Native e Expo, construídos offline-first para redes móveis instáveis e dispositivos de gama média — o contexto real de quem usa internet em Moçambique.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect
          x="7"
          y="2"
          width="10"
          height="20"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <line x1="10" y1="19" x2="14" y2="19" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Infra-estrutura & APIs",
    tone: "gold" as const,
    description:
      "Gateways de API em Next.js na Vercel, autenticação e bases de dados em tempo real com Supabase. Sistemas pensados para aguentar picos e falhar com elegância.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Pagamentos",
    tone: "accent" as const,
    description:
      "Integração directa com M-Pesa e gateways locais, confirmação automática por email e conciliação de subscrições sem intervenção manual.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
];

export default function Capabilities() {
  return (
    <section className="section" id="capacidades">
      <p className="section__eyebrow">O que construímos</p>
      <div className="capabilities__grid">
        {ITEMS.map((item) => (
          <article className="card" key={item.title}>
            <span
              className="card__mark"
              style={{
                background: item.tone === "accent" ? "var(--accent-soft)" : "var(--gold-soft)",
                color: item.tone === "accent" ? "var(--accent)" : "var(--gold)",
              }}
            >
              {item.icon}
            </span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
