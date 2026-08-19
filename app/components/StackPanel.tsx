const STACK = [
  ["React Native / Expo", "Camada de aplicação"],
  ["Supabase — Postgres + Realtime", "Dados e autenticação"],
  ["Next.js on Vercel", "Gateway de API"],
  ["M-Pesa Gateway", "Processamento de pagamentos"],
];

export default function StackPanel() {
  return (
    <section className="section" id="stack">
      <p className="section__eyebrow">Stack em produção</p>
      <div className="stack__panel">
        {STACK.map(([name, note], i) => (
          <div className="stack__row" key={name}>
            <span className="stack__dot" style={{ animationDelay: `${i * 220}ms` }} />
            <span className="stack__name">{name}</span>
            <span className="stack__note">{note}</span>
            <span className="stack__status">operacional</span>
          </div>
        ))}
      </div>
    </section>
  );
}
