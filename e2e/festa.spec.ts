import { test, expect } from "@playwright/test";

test("generate Festa", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Festa" }).nth(1).click();
  await page.goto("http://localhost:3000/festa");



  await page.getByTestId('form').click();
  await page.getByText('Let\'s welcome with a special').click();
  await page.getByTestId('form').locator('div').filter({ hasText: '/15' }).first().click();
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill('hola');
  await page.getByText('/20').click();
  await page.getByTestId('input-content').click();
  await page.getByTestId('input-content').fill('hola2');
  await page.getByTestId('radio-options').click();
  await page.getByText('JungKook').click();
  await page.getByTestId('form').getByTestId('button').click();
  await page.getByRole('img', { name: 'JungKook' }).click();
  await page.locator('div').filter({ hasText: /^holafrom hola2$/ }).nth(1).click();
  const download13Promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download' }).click();
  const download13 = await download13Promise;
  await page.getByRole('button', { name: 'Restart' }).click();

});
