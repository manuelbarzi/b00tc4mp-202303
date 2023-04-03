import { authenticateUser, registerUser, updateUserPassword } from './logic.js'

let authenticatedId: string

const loginPage: HTMLDivElement = document.querySelector<HTMLDivElement>('.login')!
const loginForm: HTMLFormElement = loginPage.querySelector<HTMLFormElement>('form')!
const registerPage: HTMLDivElement = document.querySelector<HTMLDivElement>('.register')!
const registerForm: HTMLFormElement = registerPage.querySelector<HTMLFormElement>('form')!
const homePage: HTMLDivElement = document.querySelector<HTMLDivElement>('.home')!
const profileLink: HTMLAnchorElement = homePage.querySelector<HTMLAnchorElement>('.nav-profile')!
const profilePanel: HTMLDivElement = homePage.querySelector<HTMLDivElement>('.profile')!
const updatePasswordForm: HTMLFormElement = profilePanel.querySelector<HTMLFormElement>('form')!

loginPage.querySelector('a')!.onclick = function (event: Event) {
    event.preventDefault()

    loginPage.classList.add('off')
    registerPage.classList.remove('off')
}

registerPage.querySelector('a')!.onclick = function (event: Event) {
    event.preventDefault()

    registerPage.classList.add('off')
    loginPage.classList.remove('off')
}

loginForm.onsubmit = function (event: Event) {
    event.preventDefault()

    const email: string = loginForm.querySelector<HTMLInputElement>('input[name=email]')!.value
    const password: string = loginForm.querySelector<HTMLInputElement>('input[name=password]')!.value

    try {
        authenticatedId = authenticateUser(email, password)

        loginForm.reset()

        loginPage.classList.add('off')
        homePage.classList.remove('off')
    } catch (error: any) {
        alert(error.message)
    }
}

registerForm.onsubmit = function (event: Event) {
    event.preventDefault()

    const name: string = registerForm.querySelector<HTMLInputElement>('input[name=name]')!.value
    const email: string = registerForm.querySelector<HTMLInputElement>('input[name=email]')!.value
    const password: string = registerForm.querySelector<HTMLInputElement>('input[name=password]')!.value

    try {
        registerUser(name, email, password)

        registerForm.reset()

        registerPage.classList.add('off')
        loginPage.classList.remove('off')
    } catch (error: any) {
        alert(error.message)
    }
}

profileLink.onclick = function (event: Event) {
    event.preventDefault()

    profilePanel.classList.remove('off')
}

updatePasswordForm.onsubmit = function (event: Event) {
    event.preventDefault()

    const password: string = updatePasswordForm.querySelector<HTMLInputElement>('input[name=password]')!.value
    const newPassword: string = updatePasswordForm.querySelector<HTMLInputElement>('input[name=newPassword]')!.value
    const newPasswordConfirm: string = updatePasswordForm.querySelector<HTMLInputElement>('input[name=newPasswordConfirm]')!.value

    try {
        updateUserPassword(authenticatedId, password, newPassword, newPasswordConfirm)

        alert('password updated')

        updatePasswordForm.reset()
    } catch (error: any) {
        alert(error.message)
    }
}