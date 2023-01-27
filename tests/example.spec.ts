import { test, expect } from '@playwright/test';

import { loadHomepage, assertTitle} from '../helpers'

test('Simple basic test', async ({ page }) => {
  await page.goto('https://example.com/');  // เปิดเว็บอะไรก็ใส่ไป 

  const pageTitle = await page.locator('h1')
  await expect(pageTitle).toContainText('Example Domain') // หาคำว่า Example Domain ในหน้าเว็บ
});

test('Click on Elements', async ({ page }) => {

  await page.goto('http://zero.webappsecurity.com/index.html')
  await page.click('#signin_button') // id ของปุ่ม
  await page.click('text= Sign in') // ชื่อปุ่ม value="?""

  const errorMessage = await page.locator('.alert-error') // class
  await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test.skip('Selectors', async ({ page }) => {  //.skip เวลาเราสั่งรันทั้งหมดอันนี้จะไม่ถูกรัน
  // text
  await page.click('text = ...')

  // CSS selectors
  await page.click('button')
  await page.click('#id')
  await page.click('.classname')

  // Only visible CSS Selector
  await page.click('.submit-button:visible')  // จะ click ที่ class submit-button ที่แสดงบนหน้าจอเท่านั้น

  // Combinations
  await page.click('#username .first') //click on id of username with class first

  // XPath
  await page.click('//buttonXPath')

})

// test('Working with Inputs', async ({ page }) => {

//   await page.goto('http://zero.webappsecurity.com/index.html')
//   await page.click('#signin_button') // id ของปุ่ม

//   await page.type('#user_login','some username')  //(id, input ที่จะใส่)
//   await page.type('#user_password','password')  //(id, input ที่จะใส่)
//   await page.click('text= Sign in')

//   const errorMessage = await page.locator('.alert-error') // class
//   await expect(errorMessage).toContainText('Login and/or password are wrong.')
// })

// // test.only('Assertions', async ({ page }) => {  // .only เวลาสั่งรันทั้งหมดจะรันแค่อันนี้อันเดียว
// //   await page.goto('https://example.com/');
// //   await expect(page).toHaveURL('https://example.com/')
// //   await expect(page).toHaveTitle('Example Domain')

// //   const element = await page.locator('h1')
// //   await expect(element).toBeVisible()
// //   await expect(element).toHaveText('Example Domain')
// //   await expect(element).toHaveCount(1)

// //   const nonExistingElement = await page.locator('h5')  // จริงๆแล้ว web นี้ก็ไม่มี h5 อยู่แล้วแต่เราเช็คว่าไม่มี h5 อยู่จริงๆใช่ไหม
// //   await expect(nonExistingElement).not.toBeVisible()
// // })

test.describe("My First test suite", () =>{ //จัดกลุ่มของ test case
  test('Working with Inputs @mytag', async ({ page }) => {

    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button') // id ของปุ่ม
  
    await page.type('#user_login','some username')  //(id, input ที่จะใส่)
    await page.type('#user_password','password')  //(id, input ที่จะใส่)
    await page.click('text= Sign in')
  
    const errorMessage = await page.locator('.alert-error') // class
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })
  
  test('Assertions @mytag', async ({ page }) => {  // .only เวลาสั่งรันทั้งหมดจะรันแค่อันนี้อันเดียว
    await page.goto('https://example.com/');
    await expect(page).toHaveURL('https://example.com/')
    await expect(page).toHaveTitle('Example Domain')
  
    const element = await page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)
  
    const nonExistingElement = await page.locator('h5')  // จริงๆแล้ว web นี้ก็ไม่มี h5 อยู่แล้วแต่เราเช็คว่าไม่มี h5 อยู่จริงๆใช่ไหม
    await expect(nonExistingElement).not.toBeVisible()
  })
})


test.describe('Hooks', () => {
  test.beforeEach(async ({ page} )=> {  // ใช้เมื่ออะไรที่ต้องทำก่อนแน่ๆและทำเหมือนกันทุกๆ case ที่จะ test
    await page.goto('https://example.com/')
  })
  test('Screenshorts', async ({ page }) => {  
    // 1. Step is load website
    //await page.goto('https://example.com/')
    // 2. take Screenshot of full page
    await page.screenshot({ path: 'screenshot.png', fullPage: true})
  
  })
  
  test('Single element Screenshorts', async ({ page }) => {  
    //await page.goto('https://example.com/')
    const element = await page.$('h1')
    await element?.screenshot({ path: 'single_screenshot.png'})
  })
})

test('Custom Helpers', async ({ page }) => {  // ใช้ function file helpers.ts
  await loadHomepage(page)
  //await page.pause()  
  await assertTitle(page)
})





//จะเปลี่ยน browser run ไปที่ file playwright.config.ts
//npx playwright test --grep=@tagname -> ใช้เพื่อระบว่าจะรันแค่อันไหน
// run specific browser -> npx playwright test --project=chromium

