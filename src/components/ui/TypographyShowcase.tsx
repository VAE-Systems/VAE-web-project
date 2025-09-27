import React from 'react'
import { Text, Heading1, Heading2, Body, ButtonText } from './Text'
import MagneticButton from './MagneticButton'

/**
 * Typography Showcase Component
 * Demonstrates the new typography system and improved components
 */
export const TypographyShowcase: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-12 p-8">
      {/* Typography Scale Demo */}
      <section className="space-y-6">
        <Heading1>Typography Scale Demo</Heading1>
        <Body className="text-muted">
          Hier sehen Sie die neue modulare Typografie-Skala mit responsiven Schriftgrößen
        </Body>

        <div className="space-y-4">
          <Text size="xs">Extra Small Text (12px - 14px)</Text>
          <Text size="sm">Small Text (14px - 16px)</Text>
          <Text size="base">Base Text (16px - 18px)</Text>
          <Text size="lg">Large Text (18px - 20px)</Text>
          <Text size="xl">Extra Large Text (20px - 24px)</Text>
          <Text size="2xl">2X Large Text (24px - 32px)</Text>
          <Text size="3xl">3X Large Text (32px - 40px)</Text>
          <Text size="4xl">4X Large Text (40px - 48px)</Text>
          <Text size="5xl">5X Large Text (48px - 64px)</Text>
          <Text size="6xl">6X Large Text (64px - 80px)</Text>
        </div>
      </section>

      {/* Font Weights Demo */}
      <section className="space-y-6">
        <Heading2>Font Weights</Heading2>
        <div className="space-y-3">
          <Text weight="thin">Thin (100)</Text>
          <Text weight="light">Light (300)</Text>
          <Text weight="normal">Normal (400)</Text>
          <Text weight="medium">Medium (500)</Text>
          <Text weight="semibold">Semibold (600)</Text>
          <Text weight="bold">Bold (700)</Text>
          <Text weight="extrabold">Extra Bold (800)</Text>
          <Text weight="black">Black (900)</Text>
        </div>
      </section>

      {/* Line Heights Demo */}
      <section className="space-y-6">
        <Heading2>Line Heights</Heading2>
        <div className="space-y-4">
          <div>
            <Text lineHeight="tight" className="rounded bg-gray-100 p-4">
              Tight Line Height (1.25)
              <br />
              Dies ist ein Beispieltext mit enger Zeilenhöhe.
              <br />
              Gut für kompakte Absätze.
            </Text>
          </div>
          <div>
            <Text lineHeight="normal" className="rounded bg-gray-100 p-4">
              Normal Line Height (1.5)
              <br />
              Dies ist ein Beispieltext mit normaler Zeilenhöhe.
              <br />
              Die Standardeinstellung für gute Lesbarkeit.
            </Text>
          </div>
          <div>
            <Text lineHeight="loose" className="rounded bg-gray-100 p-4">
              Loose Line Height (1.75)
              <br />
              Dies ist ein Beispieltext mit loser Zeilenhöhe.
              <br />
              Ideal für bessere Luft und Lesbarkeit.
            </Text>
          </div>
        </div>
      </section>

      {/* Letter Spacing Demo */}
      <section className="space-y-6">
        <Heading2>Letter Spacing</Heading2>
        <div className="space-y-3">
          <Text letterSpacing="tight">Tight Letter Spacing (-0.025em)</Text>
          <Text letterSpacing="normal">Normal Letter Spacing (0)</Text>
          <Text letterSpacing="wide">Wide Letter Spacing (0.025em)</Text>
          <Text letterSpacing="wider">Wider Letter Spacing (0.05em)</Text>
          <Text letterSpacing="widest">Widest Letter Spacing (0.1em)</Text>
        </div>
      </section>

      {/* Component Integration Demo */}
      <section className="space-y-6">
        <Heading2>Component Integration</Heading2>
        <Body>Die neuen Typografie-Komponenten lassen sich nahtlos in bestehende Komponenten integrieren:</Body>

        <div className="space-y-4">
          <MagneticButton
            textSize="sm"
            textWeight="semibold"
            glowEffect
            rippleEffect
            scaleEffect
            ariaLabel="Demo Button mit Typografie"
          >
            <ButtonText>Enhanced Magnetic Button</ButtonText>
          </MagneticButton>

          <div className="rounded-lg bg-gray-50 p-6">
            <Heading2 className="mb-4">Semantic Components</Heading2>
            <Body className="mb-4">Verwenden Sie semantische Komponenten für bessere SEO und Accessibility:</Body>
            <ul className="space-y-2">
              <li>
                <Text size="sm">• Heading1-6 für Überschriften</Text>
              </li>
              <li>
                <Text size="sm">• Body für Fließtext</Text>
              </li>
              <li>
                <Text size="sm">• Caption für Bildunterschriften</Text>
              </li>
              <li>
                <Text size="sm">• Label für Formularelemente</Text>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Responsive Demo */}
      <section className="space-y-6">
        <Heading2>Responsive Typography</Heading2>
        <Body>Alle Schriftgrößen skalieren automatisch basierend auf der Bildschirmgröße:</Body>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-blue-50 p-6">
            <Text size="lg" weight="semibold" className="mb-2 text-blue-800">
              Mobile First
            </Text>
            <Text size="sm" className="text-blue-600">
              Auf kleinen Bildschirmen beginnen die Schriftgrößen bei kleineren Werten
            </Text>
          </div>

          <div className="rounded-lg bg-green-50 p-6">
            <Text size="lg" weight="semibold" className="mb-2 text-green-800">
              Desktop Scale
            </Text>
            <Text size="sm" className="text-green-600">
              Auf größeren Bildschirmen skalieren die Schriftgrößen automatisch hoch
            </Text>
          </div>
        </div>
      </section>

      {/* Performance & Accessibility */}
      <section className="space-y-6">
        <Heading2>Performance & Accessibility</Heading2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-purple-50 p-6">
            <Text size="lg" weight="semibold" className="mb-2 text-purple-800">
              ⚡ Performance
            </Text>
            <ul className="space-y-1 text-sm text-purple-600">
              <li>• CSS Custom Properties für schnelle Änderungen</li>
              <li>• Clamp-Funktionen für optimale Performance</li>
              <li>• Hardware-Beschleunigung in Komponenten</li>
            </ul>
          </div>

          <div className="rounded-lg bg-orange-50 p-6">
            <Text size="lg" weight="semibold" className="mb-2 text-orange-800">
              ♿ Accessibility
            </Text>
            <ul className="space-y-1 text-sm text-orange-600">
              <li>• Automatische prefers-reduced-motion Unterstützung</li>
              <li>• High Contrast Modus</li>
              <li>• Semantische HTML-Struktur</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
