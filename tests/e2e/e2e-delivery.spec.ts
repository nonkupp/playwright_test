import { test, expect, selectors } from '@playwright/test'

test.describe.skip('type information for delivery', () => {
    test.beforeEach(async ({ page }) => {
        // Login success
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').click();
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').click();
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        const pd = await page.locator('.title')
        await expect(pd).toContainText('Products')


        // add product to cart
        await page.click('.inventory_item_name')
        const pdselect2 = await page.locator('.inventory_details_desc_container')
        await expect(pdselect2).toBeVisible
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        //await page.click("input[name='add-to-cart-sauce-labs-backpack']")

        //check click add to cart (remove button appear)
        const logo = await page.locator('#remove-sauce-labs-backpack')
        await expect(logo).toBeVisible

        //click shopping cart and check item selected
        await page.click('.shopping_cart_link')
        const desc = await page.locator('.cart_desc_label')
        await expect(desc).toHaveText('DESCRIPTION')
        
        const itemselect = await page.locator('.inventory_item_name')
        await expect(itemselect).toContainText('Sauce Labs Backpack')
    })

    test('delivery', async ({ page }) => {
        await page.click('#checkout')
        await page.type('#first-name','firstname')
        await page.type('#last-name','lastname')
        await page.type('#postal-code','11355')
        await page.click("input[name='continue']")

        const titleCheckout = await page.locator('.title')
        await expect(titleCheckout).toContainText('Checkout: Overview')
        await page.click('#finish')

        const complete = await page.locator('.complete-header')
        await expect(complete).toContainText('THANK YOU FOR YOUR ORDER')
    })
})