import type { ReactNode } from 'react'

export interface ImpressumSection {
  id: string
  title: string
  body: ReactNode
  bodyClassName?: string
}

export interface ImpressumContent {
  sections: ImpressumSection[]
  updated: string
}

export const impressumContent: ImpressumContent = {
  sections: [
    {
      id: 'legal',
      title: 'Angaben gemäß § 2 DDG (Digitale-Dienste-Gesetz)',
      body: (
        <>
          VAE Systems UG (haftungsbeschränkt)
          <br />
          Brahmsstraße 4<br />
          69214 Eppelheim
          <br />
          Deutschland
        </>
      ),
      bodyClassName: 'whitespace-pre-line',
    },
    {
      id: 'management',
      title: 'Vertretungsberechtigte Geschäftsführer',
      body: (
        <>
          Julian Darius Goertz Dini
          <br />
          Jakob Dünnebeil
        </>
      ),
    },
    {
      id: 'responsible',
      title: 'Inhaltlich verantwortlich gemäß § 18 Abs. 2 MStV',
      body: (
        <>
          Julian Darius Goertz Dini
          <br />
          Jakob Dünnebeil
          <br />
          <br />
          Anschrift siehe oben
        </>
      ),
    },
    {
      id: 'contact',
      title: 'Kontakt',
      body: (
        <>
          E-Mail:{' '}
          <a href="mailto:info@vae.systems" className="text-vae-turquoise hover:underline">
            info@vae.systems
          </a>
          <br />
          Telefon: +49 151 73024549
        </>
      ),
    },
    {
      id: 'register',
      title: 'Registereintrag',
      body: (
        <>
          Eingetragen im Handelsregister.
          <br />
          Registergericht: Amtsgericht Mannheim
          <br />
          Registernummer: HRB 754790
        </>
      ),
    },
    {
      id: 'vat',
      title: 'Umsatzsteuer-ID',
      body: <>Umsatzsteuer-Identifikationsnummer gem. §27 a UStG: nicht vergeben</>,
    },
    {
      id: 'liability-content',
      title: 'Haftung für Inhalte',
      body: (
        <>
          Als Diensteanbieter sind wir gemäß § 2 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
          verantwortlich. Nach §§ 3 bis 5 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
          gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen.
        </>
      ),
    },
    {
      id: 'liability-links',
      title: 'Haftung für Links',
      body: (
        <>
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben.
          Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
          Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
        </>
      ),
    },
    {
      id: 'copyright',
      title: 'Urheberrecht',
      body: (
        <>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
          Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung
          und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers.
        </>
      ),
    },
  ],
  updated: 'August 2025',
}

export default impressumContent
