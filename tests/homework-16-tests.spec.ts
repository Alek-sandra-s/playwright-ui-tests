import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker/locale/en'

test.describe('FE delivery app login page testing', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.APP_URL as string)
  })

  test('FE delivery app login page opens', async ({ page }) => {
    const loginField = page.locator('#username')
    const passwordField = page.locator('#password')
    const signInButton = page.locator('[data-name="signIn-button"]')

    await expect(loginField).toBeVisible()
    await expect(passwordField).toBeVisible()
    await expect(signInButton).toBeVisible()
  })

  test('If username and password are empty by clicking on "Sign in" button nothing changes', async ({
    page,
  }) => {
    const signInButton = page.locator('[data-name="signIn-button"]')
    const loginField = page.locator('#username')
    const passwordField = page.locator('#password')

    await expect(signInButton).toBeEnabled()
    await signInButton.click()
    await expect(loginField).toBeVisible()
    await expect(passwordField).toBeVisible()
    await expect(signInButton).toBeVisible()
  })

  test('"Sign in" button is not enabled if username is inserted, password field is empty', async ({
    page,
  }) => {
    const loginField = page.locator('#username')
    const signInButton = page.locator('[data-name="signIn-button"]')

    await loginField.fill(faker.string.alpha(2))
    await expect(signInButton).toBeDisabled()
  })

  test('"Sign in" button is not enabled if username is empty, password field is inserted', async ({
    page,
  }) => {
    const passwordField = page.locator('#password')
    const signInButton = page.locator('[data-name="signIn-button"]')

    await passwordField.fill(faker.internet.password({ length: 8 }))
    await expect(signInButton).toBeDisabled()
  })

  test('"The field must contain at least of characters: 2" error message appears if username length is less than 2 symbols', async ({
    page,
  }) => {
    const loginField = page.locator('#username')
    const signInButton = page.locator('[data-name="signIn-button"]')
    const nameInputError = page.locator('#username+[data-name="username-input-error"]')

    await loginField.fill(faker.string.alpha(1))
    await expect(signInButton).toBeDisabled()
    await expect(nameInputError).toBeVisible()
  })

  test('"The field must contain at least of characters: 8" error message appears if password length is less than 8 symbols', async ({
    page,
  }) => {
    const passwordField = page.locator('#password')
    const signInButton = page.locator('[data-name="signIn-button"]')
    const passwordInputError = page.locator('#password+[data-name="username-input-error"]')

    await passwordField.fill(faker.internet.password({ length: 7 }))
    await expect(signInButton).toBeDisabled()
    await expect(passwordInputError).toBeVisible()
  })

  test('Unsuccessful login with invalid username and password', async ({ page }) => {
    const passwordField = page.locator('#password')
    const loginField = page.locator('#username')
    const signInButton = page.locator('[data-name="signIn-button"]')
    const errorPopupMessage = page.locator('[data-name="authorizationError-popup"]')

    await loginField.fill(faker.internet.username())
    await passwordField.fill(faker.internet.password({ length: 9 }))
    await expect(signInButton).toBeEnabled()
    await signInButton.click()
    await expect(errorPopupMessage).toBeVisible()
  })
})
