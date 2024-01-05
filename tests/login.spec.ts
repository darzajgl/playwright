import { test, expect } from '@playwright/test';
test.describe('user login to Demobank', () => {
  test('successfull login with correct credentials', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('test1234');
    await page.getByTestId('password-input').fill('test1234');
    await page.getByTestId('login-button').click();
    await page.getByTestId('user-name').click();

    await (expect(page.getByTestId('user-name'))).toHaveText('Jan Demobankowy');
  });

  test('unsuccessfull login with incorrect username', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.locator('div').filter({ hasText: 'Wersja demonstracyjna serwisu' }).nth(2).click();
    await page.getByTestId('login-input').fill('test3');
    await page.getByTestId('password-input').click();

    await (expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków'));
  });

  test('unsuccessfull login with too short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.locator('div').filter({ hasText: 'Wersja demonstracyjna serwisu' }).nth(2).click();
    await page.getByTestId('login-input').fill('test21');
    await page.getByTestId('password-input').fill('sssdd');
    await page.getByTestId('password-input').blur();
   
    await (expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków'));
  });

});