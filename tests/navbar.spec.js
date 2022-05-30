import { expect, test } from '@playwright/test'

const { describe, beforeEach } = test
describe('Tests for navbar component', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/')
  })

  test('Should render navbar', async ({ page }) => {
    const navBar = page.locator('nav')
    await expect(navBar).toBeVisible()
  })

  // Documentation: https://playwright.dev/docs/api/class-page#page-wait-for-url
  test('Click on search option, should redirect search page', async ({ page }) => {
    const searchOption = page.locator('nav > a:nth-child(2)')
    await searchOption.click()
    await page.waitForURL('**/search')
  })
})
