# Team & Netzwerk (archiviert)

Diese Seite ist aktuell deaktiviert und aus der Navigation entfernt.

## Wieder aktivieren

1. **Route wieder hinzufügen**
   - Datei: `src/App.tsx`
   - Lazy import hinzufügen:
     - `const TeamNetworkPage = React.lazy(() => import('@components/pages/TeamNetworkPage'))`
   - Route hinzufügen:
     - `<Route path="/ueber-uns/team" element={<TeamNetworkPage />} />`

2. **Navigation wieder einblenden**
   - Datei: `src/components/navigation/dropdown/menuData.ts`
   - Eintrag unter `Über uns → menuItems` wieder hinzufügen:
     - `{ id: 'team', label: 'Team & Netzwerk', href: '/ueber-uns/team' }`
   - Content‑Block `team` unter `content` wieder ergänzen (Titel, Beschreibung, CTA).

3. **Leadership‑CTA Link (optional)**
   - Datei: `src/components/pages/leadership/LeadershipCTA.tsx`
   - Sekundären Button zurückbringen:
     - Link auf `/ueber-uns/team` inkl. Text „Unser Netzwerk kennenlernen“.

## Dateien

- Seite: `src/archive/team-network/TeamNetworkPage.tsx`
- Komponenten: `src/archive/team-network/team/*`
- Content: `src/content/shared/teamNetworkData.ts`
