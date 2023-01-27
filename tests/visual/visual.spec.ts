import { test, expect } from '@playwright/test'

test.describe('Visual Regression testing example', () => {
    test('Full page snapshot', async ({ page}) => { //full screen
        await page.goto('https://www.example.com')
        expect(await page.screenshot()).toMatchSnapshot('homepage.png')
    })

    test('Single Element snapshot', async ({ page}) => { // specific element
        await page.goto('https://www.example.com')
        const pageElement = await page.$('h1')
        expect(await pageElement?.screenshot()).toMatchSnapshot('page-title.png')
    })

})
//npx playwright test --config=visual.config.ts --project=chromium