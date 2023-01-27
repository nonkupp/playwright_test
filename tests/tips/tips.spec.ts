import { test, expect} from '@playwright/test'
import { getRandomNumber, getRandomString } from '../../utils/data-helpers'

test.describe.only('Tips & Tricks Section', () => {
    test.only('TestInfo Object', async ({ page}, testInfo) => {
        await page.goto('https://example.com/')
        //console.log(testInfo) //all Information
        console.log(testInfo.title) // specific title

        //Random Number
        let newNumber = await getRandomNumber()
        console.log(newNumber)

        //Random String
        let newString = await getRandomString()
        console.log(newString)
    })

    test('Test Skip Browser', async ({ page, browserName}) =>{ // test case นี้จะไม่โดนเทสโดย chrome browser
        test.skip(browserName === 'chromium', 'Feature not ready in Chrome')
        await page.goto('https://example.com/')
    })

    test('Test Fixme Annotation', async ({ page, browserName}) =>{ // test case นี้จะไม่โดนเทสโดย chrome browser
        test.fixme(browserName === 'chromium', 'Test is not stable, needs revision')
        await page.goto('https://example.com/')
    })
    
    // const people = ['Mike', 'Judy', 'Peter', 'Elon', 'Alice']
    // for(const name of people){
    //     test('running test for ${name}', async ({ page }) => {
    //         await page.goto('http://zero.webappsecurity.com/index.html')
    //         await page.type('#searchTerm', '${name}')
    //         await page.waitForTimeout(3000)
    //     })
    // }

    test('Mouse Movement Simulation', async ({ page}) =>{
        await page.goto('https://example.com/')
        await page.mouse.move(0,0)
        await page.mouse.down()
        await page.mouse.move(0, 100)
        await page.mouse.up()
    })

    test('Multiple Browser Tabs inside 1 Browser', async ({browser }) =>{
        const context = await browser.newContext()
        const page1 = await context.newPage()
        const page2 = await context.newPage()
        const page3 = await context.newPage()

        await page1.goto('https://example.com/')
        await page2.goto('https://example.com/')
        await page3.goto('https://example.com/')

        await page1.waitForTimeout(5000)
    })

    //Emulator
    //npx playwright open --device="iPhone 12 Pro" wikipedia.org

    //Generate PDF File
    //npx playwright pdf https://www.example.com my-file.pdf

    //Generate Customize Screenshot
    // npx playwright screenshot --device="iPhone 12 Pro" --color-scheme=dark --wait-for-timeout=3000 twitter.com twitter-iphone-image.png

    //Emulate Browser Language&TimeZone
    // npx playwright open --timezone="Europe/Rome" --lang="it-IT" google.com


})