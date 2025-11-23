import type { ReactNode } from 'react'

export interface PrivacySection {
  id: string
  title: string
  body: ReactNode
}

export interface PrivacyContent {
  sections: PrivacySection[]
  updated: string
}

export const privacyContent: PrivacyContent = {
  sections: [
    {
      id: 'verantwortlicher',
      title: '1. Verantwortlicher',
      body: (
        <>
          VAE Systems UG (haftungsbeschränkt)
          <br />
          Brahmsstraße 4<br />
          69214 Eppelheim
          <br />
          Deutschland
          <br />
          E-Mail:{' '}
          <a href="mailto:info@vae.systems" className="text-vae-turquoise hover:underline">
            info@vae.systems
          </a>
        </>
      ),
    },
    {
      id: 'grundlagen',
      title: '2. Allgemeine Hinweise',
      body: (
        <>
          Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website, zur
          Beantwortung von Anfragen sowie (optional) zum Versand eines Newsletters erforderlich ist. Es werden keine
          Profile gebildet, keine Tracking‑ oder Analyse‑Tools eingesetzt und keine Daten zu Werbezwecken an Dritte
          verkauft oder weitergegeben.
        </>
      ),
    },
    {
      id: 'arten-daten',
      title: '3. Arten verarbeiteter Daten',
      body: (
        <ul className="ml-6 list-disc space-y-1">
          <li>Bestands- & Kontaktdaten (z.B. Name, E-Mail) – freiwillig über Formulare übermittelt</li>
          <li>Inhaltsdaten (Nachrichtentexte aus dem Kontaktformular)</li>
          <li>Nutzungs-/Metadaten (Server-Logdaten: IP-Adresse, Timestamp, Request-URL, User-Agent, ggf. Referrer)</li>
        </ul>
      ),
    },
    {
      id: 'zwecke-rechtsgrundlagen',
      title: '4. Zwecke & Rechtsgrundlagen',
      body: (
        <ul className="ml-6 list-disc space-y-2">
          <li>
            <span className="font-medium text-text-light">Bereitstellung der Website</span> – Berechtigtes Interesse
            (Art. 6 Abs. 1 lit. f DSGVO); technischer Betrieb & Sicherheit.
          </li>
          <li>
            <span className="font-medium text-text-light">Kontaktanfragen</span> – Vertragliche/ vorvertragliche
            Maßnahmen (Art. 6 Abs. 1 lit. b) oder berechtigtes Interesse (f) an effizienter Kommunikation.
          </li>
          <li>
            <span className="font-medium text-text-light">Newsletter (optional)</span> – Einwilligung (Art. 6 Abs. 1
            lit. a); Widerruf jederzeit möglich.
          </li>
          <li>
            <span className="font-medium text-text-light">Abwehr & Nachverfolgung von Missbrauch</span> – Berechtigtes
            Interesse (f) & rechtliche Verpflichtungen (Art. 6 Abs. 1 lit. c).
          </li>
        </ul>
      ),
    },
    {
      id: 'server-logs',
      title: '5. Server‑Logfiles',
      body: (
        <>
          Beim Aufruf der Website werden technisch bedingt Server‑Logdaten verarbeitet (IP-Adresse, Datum/Uhrzeit,
          angeforderte Ressource, User-Agent, ggf. Referrer). Diese Daten sind für die Auslieferung & Sicherheit
          erforderlich und werden i.d.R. nach kurzer Frist gelöscht oder anonymisiert (typisch 7–30 Tage). Eine
          Zusammenführung mit anderen Datenquellen findet nicht statt.
        </>
      ),
    },
    {
      id: 'kontaktformular',
      title: '6. Kontaktformular & E-Mail-Kontakt',
      body: (
        <>
          Über das Kontaktformular übermittelte Daten werden ausschließlich zur Bearbeitung der Anfrage verwendet.
          Pflichtfelder sind als solche gekennzeichnet und auf das notwendige Minimum reduziert. Rechtsgrundlage:
          vorvertragliche Kommunikation (Art. 6 Abs. 1 lit. b) oder berechtigtes Interesse (f). Nach Abschluss der
          Bearbeitung werden Anfragen regelmäßig gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten
          entgegenstehen.
          <br />
          <br />
          <span className="font-medium text-text-light">E-Mail-Kontakt (unverschlüsselt)</span>
          <br />
          Wenn Sie uns per E-Mail kontaktieren, erfolgt die Übertragung{' '}
          <span className="text-text-light">unverschlüsselt</span> über das Internet. Obwohl moderne E-Mail-Provider
          Transportverschlüsselung (TLS) verwenden, kann eine Ende-zu-Ende-Sicherheit nicht garantiert werden. Sensible
          Informationen (z.B. Passwörter, Zahlungsdaten) sollten nicht per unverschlüsselter E-Mail versendet werden.
          Für vertrauliche Kommunikation bieten wir auf Anfrage verschlüsselte Kanäle (z.B. PGP, Signal) an.
        </>
      ),
    },
    {
      id: 'newsletter',
      title: '7. Newsletter',
      body: (
        <>
          Falls Sie den Newsletter abonnieren, wird Ihre E‑Mail-Adresse zum Versand gespeichert. (Geplante Umsetzung:
          Double‑Opt‑In.) Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a). Sie können diese jederzeit mit
          Wirkung für die Zukunft widerrufen (z.B. per Abmeldelink oder E‑Mail). Bis zur vollständigen Implementierung
          des produktiven Newsletter‑Versands werden eingegebene Adressen derzeit nur testweise (Mock) verarbeitet und
          nicht an externe Versanddienstleister weitergeleitet.
        </>
      ),
    },
    {
      id: 'cookies-tracking',
      title: '8. Cookies & Tracking',
      body: (
        <>
          Aktuell setzen wir <span className="text-text-light">keine</span> Cookies für Statistik, Marketing oder
          Profilbildung ein und keinen externen Analysedienst (z.B. Google Analytics, Matomo).
          <br />
          <br />
          <span className="font-medium text-text-light">Cookie-Banner & Opt-in-Prinzip</span>
          <br />
          Unser Cookie-Banner arbeitet nach dem <span className="text-text-light">Opt-in-Prinzip</span>: Tracking- oder
          Analyse-Cookies werden erst gesetzt, nachdem Sie ausdrücklich zugestimmt haben. Technisch notwendige Cookies
          (z.B. Session-Management) sind von dieser Zustimmungspflicht ausgenommen. Sie können Ihre Einwilligung
          jederzeit widerrufen und Ihre Cookie-Einstellungen unter{' '}
          <a href="/privacy/settings" className="text-vae-turquoise hover:underline">
            /privacy/settings
          </a>{' '}
          verwalten. Sollten wir zukünftig Tracking-Tools einsetzen, wird diese Erklärung entsprechend aktualisiert.
        </>
      ),
    },
    {
      id: 'fonts',
      title: '9. Schriftarten (Fonts)',
      body: (
        <>
          Wir nutzen eine{' '}
          <span className="text-text-light">Kombination aus lokal gehosteten Schriftarten und CDN-basierten Fonts</span>
          :
          <br />
          <br />
          <ul className="ml-6 list-disc space-y-1">
            <li>
              <span className="font-medium text-text-light">Self-Hosted Fonts:</span> Primäre Schriftarten (z.B.
              „Inter", „Geist") werden lokal von unserem Server ausgeliefert. Hierbei findet keine Datenübertragung an
              Dritte statt.
            </li>
            <li>
              <span className="font-medium text-text-light">CDN-basierte Fonts:</span> Für bestimmte Spezial-Schriften
              (z.B. Icon-Fonts, Display-Schriften) nutzen wir Content Delivery Networks (CDN) wie Google Fonts oder
              jsDelivr. Beim Laden dieser Schriften wird Ihre IP-Adresse technisch bedingt an den CDN-Anbieter
              übertragen. Rechtsgrundlage: berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO) an performanter
              Auslieferung und optimaler Darstellung.
            </li>
          </ul>
          <br />
          Weitere Informationen zur Datenverarbeitung finden Sie in den Datenschutzerklärungen der jeweiligen
          CDN-Anbieter (z.B.{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-vae-turquoise hover:underline"
          >
            Google Fonts Privacy Policy
          </a>
          ).
        </>
      ),
    },
    {
      id: 'dienstleister',
      title: '10. Externe Dienstleister / Auftragsverarbeitung',
      body: (
        <>
          Aktuell werden keine externen Analyse‑ oder Marketingplattformen genutzt. Hosting / Infrastruktur:{' '}
          <span className="text-vae-turquoise">Contabo GmbH (Deutschland)</span>. Mit eingesetzten
          Infrastruktur‑/Hosting‑Anbietern besteht bzw. wird – falls erforderlich – ein Vertrag zur Auftragsverarbeitung
          (AVV) gemäß Art. 28 DSGVO abgeschlossen.
          <br />
          <br />
          <span className="font-medium text-text-light">Externe Inhalte (CDN und Bildquellen)</span>
          <br />
          Für einzelne Technologie-Logos und Grafiken binden wir statische Inhalte von Drittanbietern ein (z. B.
          jsDelivr/CDN, Wikimedia Commons, GitHub). Beim Aufruf der entsprechenden Seiten wird Ihre IP-Adresse technisch
          bedingt an diese Anbieter übertragen, damit die Inhalte ausgeliefert werden können. Die Nutzung erfolgt auf
          Grundlage unseres berechtigten Interesses an einer performanten und ansprechenden Darstellung der Website
          (Art. 6 Abs. 1 lit. f DSGVO). Weitere Informationen zur Datenverarbeitung finden Sie in den
          Datenschutzerklärungen der jeweiligen Anbieter.
        </>
      ),
    },
    {
      id: 'weitergabe',
      title: '11. Weitergabe von Daten',
      body: (
        <>
          Eine Übermittlung an Dritte erfolgt nur, sofern (a) gesetzlich vorgeschrieben, (b) zur Durchsetzung von
          Rechtsansprüchen erforderlich oder (c) eine ausdrückliche Einwilligung vorliegt.
        </>
      ),
    },
    {
      id: 'speicherloeschung',
      title: '12. Speicherfristen & Löschung',
      body: (
        <>
          Wir löschen personenbezogene Daten, sobald der Zweck entfällt und keine gesetzlichen Aufbewahrungsfristen
          entgegenstehen. Kontaktanfragen: nach Abschluss. Newsletter-Daten: bis zum Widerruf. Server‑Logs: s.o.
        </>
      ),
    },
    {
      id: 'rechte',
      title: '13. Ihre Rechte (Betroffenenrechte)',
      body: (
        <>
          <ul className="ml-6 list-disc space-y-1">
            <li>Auskunft (Art. 15 DSGVO)</li>
            <li>Berichtigung (Art. 16 DSGVO)</li>
            <li>Löschung (Art. 17 DSGVO)</li>
            <li>Einschränkung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch gegen Verarbeitung (Art. 21 DSGVO)</li>
            <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
            <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
          </ul>
          <p className="mt-3">
            Zur Ausübung Ihrer Rechte genügt eine formlose E‑Mail an{' '}
            <a href="mailto:info@vae.systems" className="text-vae-turquoise hover:underline">
              info@vae.systems
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: 'aenderungen',
      title: '14. Änderungen dieser Erklärung',
      body: (
        <>
          Wir aktualisieren diese Datenschutzerklärung bei Änderungen der Datenverarbeitung oder rechtlicher
          Rahmenbedingungen. Die jeweils aktuelle Version finden Sie stets unter dieser URL.
        </>
      ),
    },
  ],
  updated: 'November 2025',
}

export default privacyContent
