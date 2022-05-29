import { expect, test } from '@playwright/test'

const { describe, beforeEach } = test

describe('Tests for search page', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/search')
  })

  test('Should open search page', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:3000/search')
  })

  test('Should render input search', async ({ page }) => {
    const searchInput = page.locator('input[type=search]')
    await expect(searchInput).toBeVisible()
  })

  test('After enter valid city, shoud render 10 results', async ({ page }) => {
    const SELECTOR_LIST = '.list-results'

    const searchInput = page.locator('input[type=search]')
    await searchInput.type('Lima')

    const containerResults = page.locator(SELECTOR_LIST)
    await expect(containerResults).toBeVisible()

    const totalResults = page.locator(`${SELECTOR_LIST} > li`)
    await expect(totalResults).toHaveCount(10)
  })

  test('After click on result, shoud render detail modal', async ({ page }) => {
    // Type city
    const searchInput = page.locator('input[type=search]')
    await searchInput.type('Lima')

    // Click on first result
    await page.locator('.list-results > li:first-child').click()

    // Btn cancel should be visible as long as detail modal is present
    const btnCancel = page.locator('button').first()
    await expect(btnCancel).toBeVisible()
  })

  test('When press add button, should add new favorite', async ({ page, context }) => {
    // Type city
    const searchInput = page.locator('input[type=search]')
    await searchInput.type('Lima')

    // Click on first result
    await page.locator('.list-results > li:first-child').click()

    // Click on add button
    const btnAdd = page.locator('button >> nth=1')
    await btnAdd.click()

    // Get favorite weather stored on localStorage, there will be only one
    const storage = await context.storageState('favorites')
    const totalFavorites = storage.origins[0].localStorage[0].value[0].length
    expect(totalFavorites).toBe(1)
  })
})
