import { expect, test } from '@playwright/test'

const { describe, beforeEach } = test

describe('Tests for index page', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/')
  })

  test('Should open main page', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:3000/')
  })

  test('Should render temperature, weather and city', async ({ page }) => {
    const cityNameNode = page.locator('h2').first()
    const temperatureNode = page.locator('h1').first()
    const conditionNode = page.locator('h4').first()

    await expect(cityNameNode).not.toContainText('undefined')
    await expect(temperatureNode).not.toContainText('undefinedº')
    await expect(conditionNode).not.toContainText('undefined')
  })

  test('Should render temperature per hour', async ({ page }) => {
    const header = page.locator('header').first()
    await expect(header).toHaveText('hourly forecast')

    const listTodayForecast = page.locator('ul:first-child > li:first-child')
    await expect(listTodayForecast).toHaveCount(24)
  })

  test('Should render three day forecast', async ({ page }) => {
    // Get second header of the page
    const header = page.locator('header >> nth=1')
    await expect(header).toHaveText('3-day-forecast')

    // Get forecast since now until the next 3 days
    const listNextThreeForecast = page.locator('.three-forecast-item')
    await expect(listNextThreeForecast).toHaveCount(3)
  })

  test('Should render uv index indicator and its value should be not undefined', async ({
    page
  }) => {
    await expect(page.locator('.uv-index')).toBeVisible()
    await expect(page.locator('.uv-index-value')).not.toContainText('undefined')
  })

  test('Should render sunset indicator and its value should be not undefined', async ({ page }) => {
    await expect(page.locator('.sunset')).toBeVisible()
    await expect(page.locator('.sunset-value')).not.toContainText('undefined')
    await expect(page.locator('.sunrise-value')).not.toContainText('undefined')
  })

  test('Should render wind indicator and its value should be not undefined', async ({ page }) => {
    await expect(page.locator('.wind')).toBeVisible()
    await expect(page.locator('.wind-value')).not.toContainText('undefined')
  })

  test('Should render precipitation indicator and its value should be not undefined', async ({
    page
  }) => {
    await expect(page.locator('.precipitation')).toBeVisible()
    await expect(page.locator('.precipitation-value')).not.toContainText('undefined mm')
  })

  test('Should render feels like indicator and its value should be not undefined', async ({
    page
  }) => {
    await expect(page.locator('.feels-like')).toBeVisible()
    await expect(page.locator('.feels-like-value')).not.toContainText('undefined º')
  })

  test('Should render humidity indicator and its value should be not undefined', async ({
    page
  }) => {
    await expect(page.locator('.humidity')).toBeVisible()
    await expect(page.locator('.humidity-value')).not.toContainText('undefined%')
  })

  test('Should render visibility indicator and its value should be not undefined', async ({
    page
  }) => {
    await expect(page.locator('.visibility')).toBeVisible()
    await expect(page.locator('.visibility-value')).not.toContainText('undefined km')
  })

  test('Should render pressure indicator and its value should be not undefined', async ({
    page
  }) => {
    await expect(page.locator('.pressure')).toBeVisible()
    await expect(page.locator('.pressure-value')).not.toContainText('undefined mb')
  })

  // Testing for navbar search option _ should be redirected to search page
  // Testing for navbar location option _ should be request user's location
})
