import React from 'react'
import Seo from '../ui/Seo'

/**
 * Datenschutz / Privacy Policy
 *
 * Abbild der derzeitigen Datenverarbeitung (Stand: August 2025).
 * Hinweise / Platzhalter sind klar markiert und sollten bei Änderungen (Hosting, Fonts Self‑Hosting, neue Tools) angepasst werden.
 */
const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-darker">
      <Seo
        title="Datenschutz | VAE Systems"
        description="Datenschutzhinweise der VAE Systems UG (haftungsbeschränkt) – Informationen nach DSGVO zu Art, Umfang und Zweck der Verarbeitung personenbezogener Daten."
        canonicalPath="/privacy"
      />
      <section className="pt-40 pb-24 container-vae max-w-4xl">
        <h1 className="h1 heading-gradient mb-10">Datenschutzerklärung</h1>
        <div className="space-y-10 text-sm leading-relaxed text-text-secondary">
          <section id="verantwortlicher">
            <h2 className="h3 text-text-light mb-2">1. Verantwortlicher</h2>
            <p>VAE Systems UG (haftungsbeschränkt)<br/>Brahmsstraße 4<br/>69214 Eppelheim<br/>Deutschland<br/>E-Mail: <a href="mailto:info@vae-systems.com" className="text-vae-turquoise hover:underline">juliandini@vae-systems.com</a></p>
          </section>

            <section id="grundlagen">
              <h2 className="h3 text-text-light mb-2">2. Allgemeine Hinweise</h2>
              <p>Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website, zur Beantwortung von Anfragen sowie (optional) zum Versand eines Newsletters erforderlich ist. Es werden keine Profile gebildet, keine Tracking‑ oder Analyse‑Tools eingesetzt und keine Daten zu Werbezwecken an Dritte verkauft oder weitergegeben.</p>
            </section>

            <section id="arten-daten">
              <h2 className="h3 text-text-light mb-2">3. Arten verarbeiteter Daten</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>Bestands- & Kontaktdaten (z.B. Name, E-Mail) – freiwillig über Formulare übermittelt</li>
                <li>Inhaltsdaten (Nachrichtentexte aus dem Kontaktformular)</li>
                <li>Nutzungs-/Metadaten (Server-Logdaten: IP-Adresse, Timestamp, Request-URL, User-Agent, ggf. Referrer)</li>
              </ul>
            </section>

            <section id="zwecke-rechtsgrundlagen">
              <h2 className="h3 text-text-light mb-2">4. Zwecke & Rechtsgrundlagen</h2>
              <ul className="list-disc ml-6 space-y-2">
                <li><span className="text-text-light font-medium">Bereitstellung der Website</span> – Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO); technischer Betrieb & Sicherheit.</li>
                <li><span className="text-text-light font-medium">Kontaktanfragen</span> – Vertragliche/ vorvertragliche Maßnahmen (Art. 6 Abs. 1 lit. b) oder berechtigtes Interesse (f) an effizienter Kommunikation.</li>
                <li><span className="text-text-light font-medium">Newsletter (optional)</span> – Einwilligung (Art. 6 Abs. 1 lit. a); Widerruf jederzeit möglich.</li>
                <li><span className="text-text-light font-medium">Abwehr & Nachverfolgung von Missbrauch</span> – Berechtigtes Interesse (f) & rechtliche Verpflichtungen (Art. 6 Abs. 1 lit. c).</li>
              </ul>
            </section>

            <section id="server-logs">
              <h2 className="h3 text-text-light mb-2">5. Server‑Logfiles</h2>
              <p>Beim Aufruf der Website werden technisch bedingt Server‑Logdaten verarbeitet (IP-Adresse, Datum/Uhrzeit, angeforderte Ressource, User-Agent, ggf. Referrer). Diese Daten sind für die Auslieferung & Sicherheit erforderlich und werden i.d.R. nach kurzer Frist gelöscht oder anonymisiert (typisch 7–30 Tage). Eine Zusammenführung mit anderen Datenquellen findet nicht statt.</p>
            </section>

            <section id="kontaktformular">
              <h2 className="h3 text-text-light mb-2">6. Kontaktformular</h2>
              <p>Über das Kontaktformular übermittelte Daten werden ausschließlich zur Bearbeitung der Anfrage verwendet. Pflichtfelder sind als solche gekennzeichnet und auf das notwendige Minimum reduziert. Rechtsgrundlage: vorvertragliche Kommunikation (Art. 6 Abs. 1 lit. b) oder berechtigtes Interesse (f). Nach Abschluss der Bearbeitung werden Anfragen regelmäßig gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
            </section>

            <section id="newsletter">
              <h2 className="h3 text-text-light mb-2">7. Newsletter</h2>
              <p>Falls Sie den Newsletter abonnieren, wird Ihre E‑Mail-Adresse zum Versand gespeichert. (Geplante Umsetzung: Double‑Opt‑In.) Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a). Sie können diese jederzeit mit Wirkung für die Zukunft widerrufen (z.B. per Abmeldelink oder E‑Mail). Bis zur vollständigen Implementierung des produktiven Newsletter‑Versands werden eingegebene Adressen derzeit nur testweise (Mock) verarbeitet und nicht an externe Versanddienstleister weitergeleitet.</p>
            </section>

            <section id="cookies-tracking">
              <h2 className="h3 text-text-light mb-2">8. Cookies & Tracking</h2>
              <p>Aktuell setzen wir <span className="text-text-light">keine</span> Cookies für Statistik, Marketing oder Profilbildung ein und keinen externen Analysedienst (z.B. Google Analytics, Matomo). Sollte sich dies ändern, wird die Erklärung aktualisiert und – soweit erforderlich – ein Consent‑Banner implementiert.</p>
            </section>

            <section id="fonts">
              <h2 className="h3 text-text-light mb-2">9. Schriftarten (Fonts)</h2>
              <p>Derzeit wird die Schriftart „Inter“ & Material Symbols über Google Fonts eingebunden. Dabei wird eine Verbindung zu Servern von Google (Alphabet Inc., USA) aufgebaut. Dadurch können technisch bedingt Ihre IP‑Adresse und Browser‑Metadaten übermittelt werden. Rechtsgrundlage: Berechtigtes Interesse an konsistenter Darstellung (Art. 6 Abs. 1 lit. f). <span className="text-vae-turquoise">Geplante Änderung:</span> Umstellung auf lokale / selbst gehostete Fonts zur Vermeidung externer Requests. Nach Umsetzung wird dieser Abschnitt angepasst.</p>
            </section>

            <section id="dienstleister">
              <h2 className="h3 text-text-light mb-2">10. Externe Dienstleister / Auftragsverarbeitung</h2>
              <p>Aktuell werden keine externen Analyse‑ oder Marketingplattformen genutzt. Hosting / Infrastruktur: <span className="text-vae-turquoise">[Platzhalter Hosting-Provider / Standort eintragen]</span>. Mit eingesetzten Infrastruktur‑/Hosting‑Anbietern besteht bzw. wird – falls erforderlich – ein Vertrag zur Auftragsverarbeitung (AVV) gemäß Art. 28 DSGVO abgeschlossen.</p>
            </section>

            <section id="weitergabe">
              <h2 className="h3 text-text-light mb-2">11. Weitergabe von Daten</h2>
              <p>Eine Übermittlung an Dritte erfolgt nur, sofern (a) gesetzlich vorgeschrieben, (b) zur Durchsetzung von Rechtsansprüchen erforderlich oder (c) eine ausdrückliche Einwilligung vorliegt.</p>
            </section>

            <section id="speicherloeschung">
              <h2 className="h3 text-text-light mb-2">12. Speicherfristen & Löschung</h2>
              <p>Wir löschen personenbezogene Daten, sobald der Zweck entfällt und keine gesetzlichen Aufbewahrungsfristen entgegenstehen. Kontaktanfragen: nach Abschluss. Newsletter-Daten: bis zum Widerruf. Server‑Logs: s.o.</p>
            </section>

            <section id="rechte">
              <h2 className="h3 text-text-light mb-2">13. Ihre Rechte (Betroffenenrechte)</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>Auskunft (Art. 15 DSGVO)</li>
                <li>Berichtigung (Art. 16 DSGVO)</li>
                <li>Löschung (Art. 17 DSGVO)</li>
                <li>Einschränkung (Art. 18 DSGVO)</li>
                <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruch gegen Verarbeitung (Art. 21 DSGVO)</li>
                <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
                <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
              </ul>
              <p className="mt-3">Zur Ausübung Ihrer Rechte genügt eine formlose E‑Mail an <a href="mailto:info@vae-systems.com" className="text-vae-turquoise hover:underline">info@vae-systems.com</a>.</p>
            </section>

            <section id="aenderungen">
              <h2 className="h3 text-text-light mb-2">14. Änderungen dieser Erklärung</h2>
              <p>Wir aktualisieren diese Datenschutzerklärung bei Änderungen der Datenverarbeitung oder rechtlicher Rahmenbedingungen. Die jeweils aktuelle Version finden Sie stets unter dieser URL.</p>
            </section>

          <p className="text-[11px] text-text-muted">Stand: August 2025</p>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPage
