import { test } from "@playwright/test";

test("generate Tetris", async ({ page }) => {
  await page.goto("http://localhost:3000/tetris");

  await page.getByText('Play TimeTETRIS 0/15Start the').click();
  await page.getByTestId('title').click();
  await page.getByRole('heading', { name: 'TETRIS' }).click();
  await page.getByTestId('form').locator('div').first().click();
  await page.getByRole('textbox', { name: 'write your name' }).click();
  await page.getByRole('textbox', { name: 'write your name' }).fill('hola');
  await page.getByTestId('form').getByTestId('button').click();
  await page.locator('div').filter({ hasText: 'BTS-BTS-BTS-BTS-BTS ' }).nth(2).click();
  await page.locator('.bg-purple-950').first().click();
  await page.getByText('BTS-BTS-BTS-BTS-BTS').click();
  await page.getByText(' Gifts for future birthdays will').click();
  await page.locator('div:nth-child(3) > div:nth-child(2) > button').first().click();
  await page.locator('button:nth-child(2)').first().click();
  await page.locator('div:nth-child(2) > button').first().click();
  await page.locator('div:nth-child(3) > div > div > button').first().click();
  await page.locator('div:nth-child(2) > button:nth-child(2)').click();
  await page.getByRole('button', { name: 'Restart All' }).click();

});
