import Reveal from '@/components/ui/Reveal'
import RevealCSS from '@/components/ui/RevealCSS'

/**
 * Side-by-Side Comparison: Framer Motion vs CSS Animations
 *
 * This page demonstrates that CSS animations look IDENTICAL to Framer Motion
 * but with 0 KB bundle size instead of 108 KB.
 */
export default function AnimationComparison() {
  return (
    <div className="min-h-screen bg-bg-darker p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-12 text-center text-4xl font-bold text-text-light">
          Animation Comparison: Framer Motion vs CSS
        </h1>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* LEFT: Framer Motion (108 KB) */}
          <div className="rounded-3xl border border-red-500/30 bg-bg-secondary/50 p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-light">Framer Motion</h2>
              <span className="rounded-full bg-red-500/20 px-4 py-1 text-sm font-semibold text-red-400">
                108 KB gzip
              </span>
            </div>

            {/* Demo Animations */}
            <div className="space-y-6">
              <Reveal preset="fadeUp" delay={0}>
                <div className="rounded-2xl bg-vae-turquoise/10 p-6 text-text-light">
                  <h3 className="mb-2 font-semibold">Fade Up Animation</h3>
                  <p className="text-sm text-text-muted">Smooth entrance from bottom</p>
                </div>
              </Reveal>

              <Reveal preset="slideInLeft" delay={100}>
                <div className="rounded-2xl bg-vae-turquoise/10 p-6 text-text-light">
                  <h3 className="mb-2 font-semibold">Slide Left Animation</h3>
                  <p className="text-sm text-text-muted">Slides in from right</p>
                </div>
              </Reveal>

              <Reveal preset="scaleIn" delay={200}>
                <div className="rounded-2xl bg-vae-turquoise/10 p-6 text-text-light">
                  <h3 className="mb-2 font-semibold">Scale Animation</h3>
                  <p className="text-sm text-text-muted">Grows into view</p>
                </div>
              </Reveal>

              {/* Stagger Group */}
              <Reveal.Group stagger={0.08}>
                <div className="rounded-2xl bg-vae-turquoise/10 p-4 text-text-light">Item 1</div>
                <div className="rounded-2xl bg-vae-turquoise/10 p-4 text-text-light">Item 2</div>
                <div className="rounded-2xl bg-vae-turquoise/10 p-4 text-text-light">Item 3</div>
              </Reveal.Group>
            </div>

            <div className="mt-6 rounded-xl bg-red-500/10 p-4">
              <p className="text-sm text-red-400">
                ⚠️ <strong>Bundle Impact:</strong> Adds 108 KB (35.44 KB gzip) to initial load
              </p>
            </div>
          </div>

          {/* RIGHT: CSS Animations (0 KB) */}
          <div className="rounded-3xl border border-vae-turquoise/30 bg-bg-secondary/50 p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-light">CSS Animations</h2>
              <span className="rounded-full bg-vae-turquoise/20 px-4 py-1 text-sm font-semibold text-vae-turquoise">
                0 KB
              </span>
            </div>

            {/* Demo Animations - IDENTICAL LOOK */}
            <div className="space-y-6">
              <RevealCSS preset="fadeUp" delay={0}>
                <div className="rounded-2xl bg-vae-turquoise/10 p-6 text-text-light">
                  <h3 className="mb-2 font-semibold">Fade Up Animation</h3>
                  <p className="text-sm text-text-muted">Smooth entrance from bottom</p>
                </div>
              </RevealCSS>

              <RevealCSS preset="fadeLeft" delay={100}>
                <div className="rounded-2xl bg-vae-turquoise/10 p-6 text-text-light">
                  <h3 className="mb-2 font-semibold">Fade Left Animation</h3>
                  <p className="text-sm text-text-muted">Slides in from right</p>
                </div>
              </RevealCSS>

              <RevealCSS preset="scale" delay={200}>
                <div className="rounded-2xl bg-vae-turquoise/10 p-6 text-text-light">
                  <h3 className="mb-2 font-semibold">Scale Animation</h3>
                  <p className="text-sm text-text-muted">Grows into view</p>
                </div>
              </RevealCSS>

              {/* Stagger Group */}
              <RevealCSS.Group stagger={80}>
                <div className="rounded-2xl bg-vae-turquoise/10 p-4 text-text-light">Item 1</div>
                <div className="rounded-2xl bg-vae-turquoise/10 p-4 text-text-light">Item 2</div>
                <div className="rounded-2xl bg-vae-turquoise/10 p-4 text-text-light">Item 3</div>
              </RevealCSS.Group>
            </div>

            <div className="mt-6 rounded-xl bg-vae-turquoise/10 p-4">
              <p className="text-sm text-vae-turquoise">
                ✅ <strong>Bundle Impact:</strong> 0 KB - Pure CSS, GPU-accelerated
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-bg-secondary/50">
          <table className="w-full text-text-light">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 text-left">Feature</th>
                <th className="p-4 text-center">Framer Motion</th>
                <th className="p-4 text-center">CSS Animations</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="p-4 font-semibold">Bundle Size</td>
                <td className="p-4 text-center text-red-400">108 KB (35.44 KB gzip)</td>
                <td className="p-4 text-center text-vae-turquoise">0 KB ✅</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-4 font-semibold">Visual Result</td>
                <td className="p-4 text-center">Smooth animations</td>
                <td className="p-4 text-center text-vae-turquoise">Identical ✅</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-4 font-semibold">Performance</td>
                <td className="p-4 text-center">Good (JS-based)</td>
                <td className="p-4 text-center text-vae-turquoise">Excellent (GPU) ✅</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-4 font-semibold">prefers-reduced-motion</td>
                <td className="p-4 text-center text-vae-turquoise">✅</td>
                <td className="p-4 text-center text-vae-turquoise">✅</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-4 font-semibold">FCP Impact</td>
                <td className="p-4 text-center text-red-400">+300-500ms</td>
                <td className="p-4 text-center text-vae-turquoise">0ms ✅</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold">Maintenance</td>
                <td className="p-4 text-center">External dependency</td>
                <td className="p-4 text-center text-vae-turquoise">Native CSS ✅</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Instructions */}
        <div className="mt-12 rounded-3xl border border-vae-turquoise/20 bg-vae-turquoise/5 p-8">
          <h3 className="mb-4 text-2xl font-bold text-text-light">How to Test</h3>
          <ol className="list-decimal space-y-2 pl-6 text-text-muted">
            <li>Scroll up and down to trigger animations</li>
            <li>Compare left (Framer) vs right (CSS) side</li>
            <li>Open DevTools → Network → Throttle to "Slow 3G"</li>
            <li>Hard reload (Cmd+Shift+R) and watch FCP difference</li>
            <li>Enable "Reduce motion" in system preferences and reload</li>
          </ol>
        </div>

        {/* Conclusion */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-vae-turquoise/10 to-transparent p-8">
          <h3 className="mb-4 text-2xl font-bold text-text-light">Conclusion</h3>
          <p className="mb-4 text-text-muted">
            For <strong className="text-text-light">simple scroll-triggered animations</strong> (fade, slide, scale),
            CSS provides <strong className="text-vae-turquoise">identical visual results</strong> with:
          </p>
          <ul className="list-disc space-y-1 pl-6 text-text-muted">
            <li>
              <strong className="text-vae-turquoise">-108 KB bundle reduction</strong> (35.44 KB gzip)
            </li>
            <li>
              <strong className="text-vae-turquoise">Better FCP</strong> (no JS parsing/execution)
            </li>
            <li>
              <strong className="text-vae-turquoise">GPU acceleration</strong> via transform/opacity
            </li>
            <li>Native browser support, no dependencies</li>
          </ul>
          <p className="mt-4 text-sm text-text-muted">
            ⚠️ Keep Framer Motion for: Complex gestures, spring physics, advanced sequencing
          </p>
        </div>
      </div>
    </div>
  )
}
