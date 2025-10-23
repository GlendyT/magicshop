import { test } from "@playwright/test";

test("Generate a Hobipalooza", async ({ page }) => {
  await page.goto("http://localhost:3000/hobipalooza");

  await page.locator('div').filter({ hasText: '0/15Choose your favoriteHope' }).nth(2).click();
  await page.getByRole('img', { name: 'hobipalooza', exact: true }).click();
  await page.getByTestId('form').locator('div').first().click();
  await page.getByRole('textbox', { name: 'Use your X @username' }).click();
  await page.getByRole('textbox', { name: 'Use your X @username' }).fill('casa');
  await page.locator('select[name="diseño"]').selectOption('Jack In The Box');
  await page.locator('#song').selectOption('What If...');
  await page.getByTestId('form').getByTestId('button').click();
  await page.getByText('happy').click();
  //await page.getByText('HOBI-DAY').click();
  //await page.getByText('Don´t forget to scan your QR').click();
  //await page.getByText('Here it is your ticket, keep').click();
  await page.locator('div').filter({ hasText: /^Name: casaRow: Jack In The BoxSeat: What If\.\.\.$/ }).nth(2).click();
  // const download3Promise = page.waitForEvent('download');
  // await page.getByText('Download Restart').click();
  // const download3 = await download3Promise;
  // const download4Promise = page.waitForEvent('download');
  // await page.getByRole('button', { name: 'Download' }).click();
  // const download4 = await download4Promise;
  // await page.getByRole('button', { name: 'Restart' }).click();

});
