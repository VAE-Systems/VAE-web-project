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
          <a href="mailto:info@vae-systems.com" className="text-vae-turquoise hover:underline">
            juliandini@vae-systems.com
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
      title: '6. Kontaktformular',
      body: (
        <>
          Über das Kontaktformular übermittelte Daten werden ausschließlich zur Bearbeitung der Anfrage verwendet.
          Pflichtfelder sind als solche gekennzeichnet und auf das notwendige Minimum reduziert. Rechtsgrundlage:
          vorvertragliche Kommunikation (Art. 6 Abs. 1 lit. b) oder berechtigtes Interesse (f). Nach Abschluss der
          Bearbeitung werden Anfragen regelmäßig gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten
          entgegenstehen.
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
          Profilbildung ein und keinen externen Analysedienst (z.B. Google Analytics, Matomo). Sollte sich dies ändern,
          wird die Erklärung aktualisiert und – soweit erforderlich – ein Consent‑Banner implementiert.
        </>
      ),
    },
    {
      id: 'fonts',
      title: '9. Schriftarten (Fonts)',
      body: (
        <>
          Derzeit wird die Schriftart „Inter“ & Material Symbols über Google Fonts eingebunden. Dabei wird eine
          Verbindung zu Servern von Google (Alphabet Inc., USA) aufgebaut. Dadurch können technisch bedingt Ihre
          IP‑Adresse und Browser‑Metadaten übermittelt werden. Rechtsgrundlage: Berechtigtes Interesse an konsistenter
          Darstellung (Art. 6 Abs. 1 lit. f). <span className="text-vae-turquoise">Geplante Änderung:</span> Umstellung
          auf lokale / selbst gehostete Fonts zur Vermeidung externer Requests. Nach Umsetzung wird dieser Abschnitt
          angepasst.
        </>
      ),
    },
    {
      id: 'dienstleister',
      title: '10. Externe Dienstleister / Auftragsverarbeitung',
      body: (
        <>
          Aktuell werden keine externen Analyse‑ oder Marketingplattformen genutzt. Hosting / Infrastruktur:{' '}
          <span className="text-vae-turquoise">[Platzhalter Hosting-Provider / Standort eintragen]</span>. Mit
          eingesetzten Infrastruktur‑/Hosting‑Anbietern besteht bzw. wird – falls erforderlich – ein Vertrag zur
          Auftragsverarbeitung (AVV) gemäß Art. 28 DSGVO abgeschlossen.
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
            <a href="mailto:info@vae-systems.com" className="text-vae-turquoise hover:underline">
              juliandini@vae-systems.com
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
  updated: 'August 2025',
}

export default privacyContent
