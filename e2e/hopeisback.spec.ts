import { test, expect } from "@playwright/test";

test("generate Hobi is back", async ({ page }) => {
  await page.goto("http://localhost:3000/hopeisback");

  await page.locator('div').filter({ hasText: 'Access WordI´m your hope, you' }).nth(2).click();
  await page.locator('div').filter({ hasText: /^I´m your hope, you are my hope, I´m j-____$/ }).click();
  await page.getByRole('textbox', { name: 'Write the correct word' }).click();
  await page.getByRole('textbox', { name: 'Write the correct word' }).fill('hope');
  await page.getByRole('button', { name: 'Submit Guess' }).click();
  await page.getByTestId('form').click();
  await page.getByTestId('form').locator('div').filter({ hasText: '/15' }).first().click();
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill('glendy');
  await page.getByText('/20').click();
  await page.getByTestId('input-content').click();
  await page.getByTestId('input-content').fill('hola');
  await page.getByTestId('radio-options').click();
  await page.getByText('Let\'s welcome Hobi with a').click();
  await page.getByTestId('form').getByTestId('button').click();
  await page.getByText('glendyfrom hola').click();
  const download8Promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download' }).click();
  const download8 = await download8Promise;
  await page.getByRole('button', { name: 'restart' }).click();

});
