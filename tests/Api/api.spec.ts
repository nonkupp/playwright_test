import { test, expect } from '@playwright/test'

test.describe.parallel('API Testing', () =>{
//const baseUrl = 'https://reqres.in/api'
    test('Simple API Test - Assert Response Status', async ({ request}) =>{
        //const response = await request.get('${baseUrl}/users/2')
        const response = await request.get('https://reqres.in/api/users/2')
        expect(response.status()).toBe(200) // success response send value is 200
        //expect(response.status()).toBe(400) // fail

        const responseBody = JSON.parse(await response.text())
        //console.log(responseBody)
    })

    test('Simple API Test - Assert Invalid Endpoint', async ({ request}) => {
        const response = await request.get('https://reqres.in/api/users/non-existing-endpoint')
        expect(response.status()).toBe(404) // 404 Not Found
    })

    test('GET Request - Get User Detail', async ({ request}) =>{
        const response = await request.get('https://reqres.in/api/users/1')
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(1) //tobe(id)
        expect(responseBody.data.first_name).toBe('George')
        expect(responseBody.data.last_name).toBe('Bluth')
        expect(responseBody.data.email).toBeTruthy()  //มันจะเป็นจริงเมื่อค่าไม่ใช่ zero, null, undefined
        console.log(responseBody)

    })

    test('POST Request - Create New User', async ({ request}) => {
        const response = request.post('https://reqres.in/api/users', {
            data: {
                id: 1000,
            },
        })
        const responseBody = JSON.parse(await (await response).text())
        console.log(responseBody)

        expect(responseBody.id).toBe(1000)
        expect(responseBody.createdAt).toBeTruthy()
    })

    test('POST Request - Login', async ({ request}) => {
        const response = request.post('https://reqres.in/api/login', {
            data: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka',
            },
        })
        const responseBody = JSON.parse(await (await response).text())
        console.log(responseBody)

        expect((await response).status()).toBe(200)
        expect(responseBody.token).toBeTruthy() //. token used to make sure that there is any value at all
    })

    test('POST Request - Login-fail', async ({ request}) => {
        const response = request.post('https://reqres.in/api/login', {
            data: {
                email: 'evo.holt@reqres.in',
            },
        })
        const responseBody = JSON.parse(await (await response).text())
        console.log(responseBody)

        expect((await response).status()).toBe(400)
        expect(responseBody.error).toBe('Missing password')
    })

    test('PUT Request - Update User', async ({ request}) => {
        const response = request.put('https://reqres.in/api/users/2', {
            data: {
                name: 'new name',
                job: 'new job'
            },
        })
        const responseBody = JSON.parse(await (await response).text())
        //console.log(responseBody)

        expect((await response).status()).toBe(200)
        expect(responseBody.name).toBe('new name')
        expect(responseBody.job).toBe('new job')
        expect(responseBody.updatedAt).toBeTruthy()
    })

    test('DELETE Request - Delete User', async ({ request}) => {
        const response = await request.delete('https://reqres.in/api/users/2')
        expect(response.status()).toBe(204)
    })
})