import React from 'react'
import Seo from '../ui/Seo'

const ImpressumPage: React.FC = () => {
  return (
    <div className="min-h-[100dvh] bg-bg-darker">
      <Seo title="Impressum | VAE Systems" description="Impressum der VAE Systems UG (haftungsbeschränkt)." canonicalPath="/impressum" />
      <section className="pt-40 pb-24 container-vae max-w-4xl">
        <h1 className="h1 heading-gradient mb-10">Impressum</h1>
        <div className="space-y-8 text-sm leading-relaxed text-text-secondary">
          <div>
            <h2 className="h3 text-text-light mb-2">Angaben gemäß § 5 TMG</h2>
            <p className="whitespace-pre-line">VAE Systems UG (haftungsbeschränkt)
Brahmsstraße 4
69214 Eppelheim
Deutschland</p>
          </div>
          <div>
            <h2 className="h3 text-text-light mb-2">Vertretungsberechtigte Geschäftsführer</h2>
            <p>Julian Darius Dini<br/>Jakob Dünnebeil</p>
          </div>
          <div>
            <h2 className="h3 text-text-light mb-2">Kontakt</h2>
            <p>E-Mail: <a href="mailto:juliandini@vae-systems.com" className="text-vae-turquoise hover:underline">juliandini@vae-systems.com</a><br/>Telefon: +49 151 73024549</p>
          </div>
          <div>
            <h2 className="h3 text-text-light mb-2">Registereintrag</h2>
            <p>Eingetragen im Handelsregister.<br/>Registergericht: Amtsgericht Mannheim<br/>Registernummer: HRB 754790</p>
          </div>
          <div>
            <h2 className="h3 text-text-light mb-2">Umsatzsteuer-ID</h2>
            <p>Umsatzsteuer-Identifikationsnummer gem. §27 a UStG: nicht vergeben</p>
          </div>
          <div>
            <h2 className="h3 text-text-light mb-2">Haftung für Inhalte</h2>
            <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
          </div>
          <div>
            <h2 className="h3 text-text-light mb-2">Haftung für Links</h2>
            <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
          </div>
          <div>
            <h2 className="h3 text-text-light mb-2">Urheberrecht</h2>
            <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
          </div>
          <p className="text-[11px] text-text-muted">Stand: August 2025</p>
        </div>
      </section>
    </div>
  )
}

export default ImpressumPage
