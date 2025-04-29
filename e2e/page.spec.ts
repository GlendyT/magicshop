import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  // Ir al home
  await page.goto("http://localhost:3000/");

  // Click en el link de VPassport
  const link = page.getByRole("link", { name: "VPassport" }).nth(1);
  await expect(link).toBeVisible();
  await link.click();

  // Esperar a que aparezca el texto que confirma la sección de pasaporte
  const passportText = page.locator("div", {
    hasText: "get your passport 0/15Generate",
  });
  await expect(passportText.first()).toBeVisible();
  await passportText.first().click();

  // Verifica que el textbox de nombre sea visible y funcional
  const nameInput = page.getByRole("textbox", { name: "Your Name" });
  await expect(nameInput).toBeVisible();

  // Rellenar el nombre y verificar que el valor se actualizó
  await nameInput.fill("glendy");
  await expect(nameInput).toHaveValue("glendy");
});
