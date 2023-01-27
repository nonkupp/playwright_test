import { test, expect, selectors } from '@playwright/test'


test.skip('select checkbox', async ({ page }) => {

    await page.goto('https://ultimateqa.com/automation/');
    await page.getByRole('link', { name: 'Interactions with simple elements' }).click();
    //await page.getByRole('checkbox').nth(1).check();
    await page.click("input[value='Car']")
})
