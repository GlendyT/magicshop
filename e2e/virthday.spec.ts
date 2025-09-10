import { test, expect } from "@playwright/test";

test("generate (V)irthday", async ({ page }) => {
  await page.goto("http://localhost:3000/(V)irthday");


  await page.locator('.grid').click();
  await page.getByRole('button', { name: 'start' }).click();
  await page.getByText('Time left').click();
  //await page.locator('iframe[title="Spotify Playlist"]').contentFrame().getByText('This Is V').click();
});
