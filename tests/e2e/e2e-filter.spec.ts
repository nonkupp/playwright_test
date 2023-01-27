import { test, expect, selectors } from '@playwright/test'

test.describe.skip('select filter', () => {
    test.beforeEach(async ({ page }) => {
        // Login success
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').click();
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').click();
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

    })

    test('filter', async ({ page }) => {
        await page.selectOption('.product_sort_container', 'lohi')
    })
})