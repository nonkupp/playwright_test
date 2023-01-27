import { expect, Locator, Page } from '@playwright/test'

export class LoginPage {
    // Define Selectors
    readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator

    // Init selectors using constructor
    constructor(page: Page){
        this.page = page
        this.usernameInput = page.locator('[data-test="username"]')  //#id
        this.passwordInput = page.locator('[data-test="password"]')
        this.submitButton = page.locator('[data-test="login-button"]')
        this.errorMessage = page.locator('.error-button') //.class
    }
    // Define login page methods
    async visit(){
        await this.page.goto('https://www.saucedemo.com/')
    }

    async login(username: string, password: string){
        await this.usernameInput.type(username)
        await this.passwordInput.type(password)
        await this.submitButton.click()
    }

    async assertErrorMessage(){
        await this.errorMessage.click()
    }
}

//await this.page.goto('https://courses.ultimateqa.com/users/sign_in')
//testtest1234@gmail.com password Test123456789
