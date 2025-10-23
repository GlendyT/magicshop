import {  test } from "@playwright/test";

test("Generate a Sugaverse", async ({ page }) => {
  await page.goto("http://localhost:3000/sugaverse");

  await page.locator('div').filter({ hasText: 'Into thesuga-verseCreate and' }).nth(3).click();
  await page.getByText('Into thesuga-verseCreate and').click();
  await page.getByTestId('textarea').click();
  await page.getByText('From 0/').click();

  await page.getByRole('textbox', { name: 'write something first' }).click();
  await page.getByRole('textbox', { name: 'write something first' }).fill('hola');
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill('casa');
  await page.getByTestId('select').selectOption('Agust D');
  await page.getByTestId('form').getByTestId('button').click();
  await page.getByRole('button', { name: 'Restart' }).click();
});
