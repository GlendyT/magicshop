import { test, expect } from "@playwright/test";

test("generate Lovenotes", async ({ page }) => {
  await page.goto("http://localhost:3000/lovenotes");

  await page.getByRole('heading', { name: 'Love Notes with BTS and ARMY' }).click();
  await page.getByText('/15').click();
  await page.getByText('To 0/').click();
  await page.getByRole('textbox', { name: 'Whom' }).click();
  await page.getByRole('textbox', { name: 'Whom' }).fill('hola');
  await page.getByText('From 0/').click();
  await page.getByText('/20').click();
  await page.getByTestId('input-content').click();
  await page.getByTestId('input-content').fill('hola2');
  await page.getByText('Select BTS or a member').click();
  await page.getByTestId('select').selectOption('Hoseok');
  await page.getByTestId('form').getByTestId('button').click();
});
