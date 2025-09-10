import { test, expect } from "@playwright/test";

test("generate Seokjin", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Seokjin" }).nth(1).click();
  await page.goto("http://localhost:3000/seokjin");


  await page.locator('div').filter({ hasText: 'Unlock the game by adding' }).nth(1).click();
  await page.getByTestId('form').click();
  await page.getByText('Unlock the game by adding').click();
  await page.getByText('/15').click();
  await page.getByRole('textbox', { name: 'Unlock the game by adding' }).click();
  await page.getByRole('textbox', { name: 'Unlock the game by adding' }).fill('hola');
  await page.getByTestId('form').getByTestId('button').click();
  await page.getByText('Let´s fish some music!').click();
  await page.getByRole('img', { name: 'fishingjin' }).click();
  await page.locator('span').filter({ hasText: 'a' }).first().click();
  await page.getByText('abcdefghijklmnopqrstuvwxyz').click();
  await page.getByTestId('waves').click();
  await page.getByTestId('fishing').getByRole('button', { name: 'y' }).click();
  await page.getByTestId('fishing').getByRole('button', { name: 'u' }).click();
  await page.getByTestId('fishing').getByRole('button', { name: 'o' }).click();
  await page.getByTestId('fishing').getByRole('button', { name: 'a' }).click();
  await page.getByTestId('fishing').getByRole('button', { name: 'b' }).click();
  await page.getByTestId('fishing').getByRole('button', { name: 's' }).click();
  await page.getByRole('img', { name: 'fishingjin' }).click();

  const download11Promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download' }).click();
  const download11 = await download11Promise;
  await page.getByRole('button', { name: 'Play again' }).click();
});
