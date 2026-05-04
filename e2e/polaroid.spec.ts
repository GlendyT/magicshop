import { test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test("generate a polaroid photo", async ({ page }) => {
  await page.goto("http://localhost:3000/polaroid", { waitUntil: 'networkidle' });
  await page.locator("#print").click();
  
  // Esperar a que las imágenes se carguen completamente
  await page.getByRole("img", { name: "btsphrase" }).waitFor({ state: 'visible', timeout: 60000 });
  await page.getByRole("img", { name: "btsphrase" }).click();
  
  await page.getByText("Special thanks to").click();
  await page.getByRole("img", { name: "logoarmy" }).click();
  await page.getByText("- BTS").click();
  //const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  //const download = await downloadPromise;
});
