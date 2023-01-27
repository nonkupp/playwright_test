import { test, expect } from '@playwright/test'

import { LoginPage } from '../../page-objects/LoginPage';

test.describe.only('Login / Logout Flow', () => {
    let loginPage: LoginPage // เรียกใช้ class

    // Before Hook
    test.beforeEach(async ({ page }) => {
        //Page object model
        loginPage = new LoginPage(page)
        await loginPage.visit()
        //await page.goto('https://www.saucedemo.com/');
    })

    // Negative Scenario
    test('Negative Scenario for login', async ({ page }) => {
        // await page.locator('[data-test="username"]').click();
        // await page.locator('[data-test="username"]').fill('invalid username');
        // await page.locator('[data-test="password"]').click();
        // await page.locator('[data-test="password"]').fill('invalid password');
        // await page.locator('[data-test="login-button"]').click();
        await loginPage.login('invalid username', 'invalid password')
        // await page.click('.error-button')
        await loginPage.assertErrorMessage()
    })

    // Positive Scenario+Logout
    test('Positive Scenario for login + Logout', async ({ page }) => {
        //Login success
        // await page.locator('[data-test="username"]').click();
        // await page.locator('[data-test="username"]').fill('standard_user');
        // await page.locator('[data-test="password"]').click();
        // await page.locator('[data-test="password"]').fill('secret_sauce');
        // await page.locator('[data-test="login-button"]').click();
        await loginPage.login('standard_user', 'secret_sauce')

        const pd = await page.locator('.title')
        await expect(pd).toContainText('Products')

        //Logout
        await page.click('#react-burger-menu-btn')
        await page.click('#logout_sidebar_link')
        const logo = await page.locator('.login_logo')
        await expect(logo).toBeVisible

    })
})
//npm run tests:e2e // run test