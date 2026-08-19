import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="footer__inner">
        <div>
          <span className="nav__brand">
            <svg width="18" height="18" viewBox="0 0 40 40" fill="none">
              <circle cx="8" cy="30" r="3" fill="var(--gold)" />
              <circle cx="20" cy="10" r="3" fill="var(--accent)" />
              <circle cx="32" cy="26" r="3" fill="var(--accent)" />
              <path
                d="M8 30 L20 10 L32 26 L8 30"
                stroke="var(--border-strong)"
                strokeWidth="1.2"
                fill="none"
              />
            </svg>
            <span>NDLOVU DIGITAL</span>
          </span>
          <p className="footer__note">Maputo, Moçambique · ndlovutechsolutions.com</p>
        </div>

        <nav className="footer__links">
          <Link href="/carronamao/termos">Termos do CarroNaMão</Link>
          <a href="mailto:contacto@ndlovutechsolutions.com">Contacto</a>
        </nav>
      </div>
    </footer>
  );
}
