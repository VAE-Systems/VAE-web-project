import { devices, expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

const goHome = async (page: Page) => {
  await page.goto('/')
}

const hoverMenu = async (page: Page, label: string) => {
  const trigger = page.getByRole('button', { name: label, exact: true })
  await trigger.hover()
  return trigger
}

test.describe('Dropdown menu – desktop', () => {
  test.beforeEach(async ({ page }) => {
    await goHome(page)
  })

  test('opens mega menu on hover', async ({ page }) => {
    test.skip(test.info().project.name !== 'chromium', 'Desktop interaction runs in chromium project only')
    await hoverMenu(page, 'UNSERE LEISTUNGEN')
    await expect(page.locator('#leistungen-panel')).toHaveAttribute('aria-hidden', 'false')
  })

  test('switches content when hovering menu items', async ({ page }) => {
    test.skip(test.info().project.name !== 'chromium', 'Desktop interaction runs in chromium project only')
    await hoverMenu(page, 'UNSERE LEISTUNGEN')
    const navMenu = page.getByRole('menu', { name: 'UNSERE LEISTUNGEN Navigation' })
    const menuItem = navMenu.getByRole('link', { name: /Langfristige Betreuung/ })
    await menuItem.hover()
    await expect(
      page.locator('#leistungen-panel').getByRole('heading', { level: 3, name: 'Langfristige Betreuung' })
    ).toBeVisible()
  })

  test('closes when clicking outside the panel', async ({ page }) => {
    test.skip(test.info().project.name !== 'chromium', 'Desktop interaction runs in chromium project only')
    await hoverMenu(page, 'UNSERE LEISTUNGEN')
    const viewport = page.viewportSize()
    const clickY = Math.min((viewport?.height ?? 900) - 10, 700)
    await page.mouse.click(30, clickY)
    await expect(page.locator('#leistungen-panel')).toHaveAttribute('aria-hidden', 'true')
  })
})

test.describe('Dropdown menu – mobile', () => {
  const { viewport, userAgent, deviceScaleFactor, isMobile, hasTouch } = devices['iPhone 14']
  test.use({
    viewport,
    userAgent,
    deviceScaleFactor,
    isMobile,
    hasTouch,
  })

  test('accordion expands and renders contextual content', async ({ page }) => {
    test.skip(test.info().project.name !== 'webkit-mobile', 'Mobile coverage runs in the mobile project only')
    await goHome(page)
    const toggle = page.getByRole('button', { name: 'Menü' })
    await toggle.click()
    const accordionTrigger = page.getByRole('button', { name: 'UNSERE LEISTUNGEN' })
    await accordionTrigger.click()
    await expect(page.locator('#leistungen-mobile-panel')).toHaveClass(/opacity-100/)
    await expect(
      page.locator('#leistungen-mobile-panel').getByRole('heading', { level: 3, name: 'Strategieberatung' })
    ).toBeVisible()
  })
})
