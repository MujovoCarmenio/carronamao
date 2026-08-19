import Link from "next/link";

export default function FeaturedWork() {
  return (
    <section className="section work" id="trabalho">
      <p className="section__eyebrow">Trabalho em destaque</p>
      <div className="work__row">
        <div className="work__copy">
          <h2>CarroNaMão</h2>
          <p>
            Mercado de automóveis para Moçambique, com pesquisa por
            província, subscrições para vendedores e upload de fotos
            optimizado para ligações lentas. Pagamentos processados via
            M-Pesa, do anúncio à confirmação.
          </p>
          <ul className="work__tags">
            <li>React Native</li>
            <li>Expo</li>
            <li>Supabase</li>
            <li>M-Pesa</li>
          </ul>
          <div className="work__links">
            <Link href="/carronamao/termos">Termos e condições →</Link>
          </div>
        </div>

        <div className="work__mock" aria-hidden="true">
          <div className="phone">
            <div className="phone__bar" />
            <div className="phone__search" />
            <div className="phone__card">
              <div className="phone__thumb" />
              <div className="phone__lines">
                <span />
                <span />
              </div>
            </div>
            <div className="phone__card">
              <div className="phone__thumb" />
              <div className="phone__lines">
                <span />
                <span />
              </div>
            </div>
            <div className="phone__pill" />
          </div>
        </div>
      </div>
    </section>
  );
}
