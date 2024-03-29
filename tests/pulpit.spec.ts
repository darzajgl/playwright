import {test, expect} from '@playwright/test';

test.describe('Pulpit test', ()=>{
    
test('quick payment with correct data', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');

    await page.getByTestId('login-input').fill('tester21');
    await page.getByTestId('password-input').fill('password');
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_transfer_receiver').selectOption('2');
    await page.locator('#widget_1_transfer_amount').fill('150,00');
    await page.locator('#widget_1_transfer_title').fill('pizza');
        
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();
    await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza');
  });

  test('successful mobile top-up', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('tester21');
    await page.getByTestId('password-input').fill('test2137');
    await page.getByTestId('login-button').click();
    await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill('40');
    await page.locator('#uniform-widget_1_topup_agreement span').check();
    
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();
    await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 40,00PLN na numer 500 xxx xxx');
  });



});