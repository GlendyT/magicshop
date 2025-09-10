import { test, expect } from "@playwright/test";

test("generate (V)irthday", async ({ page }) => {
  await page.goto("http://localhost:3000/(V)irthday");


  await page.locator('.grid').click();
  await page.getByRole('button', { name: 'start' }).click();
  await page.getByText('Time left').click();
  await page.locator('iframe[title="Spotify Playlist"]').contentFrame().getByText('This Is V').click();
  await page.locator('div:nth-child(6) > .relative > div').first().click();
  await page.locator('.w-24 > .relative > div').first().click();
  await page.locator('.grid > div:nth-child(2) > .relative > div').first().click();
  await page.locator('div:nth-child(3) > .relative > div').first().click();
});
