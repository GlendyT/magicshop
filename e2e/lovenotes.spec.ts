import { test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test("generate Lovenotes", async ({ page }) => {
  await page.goto("http://localhost:3000/lovenotes", { waitUntil: 'networkidle' });

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
  
  // Esperar a que el select tenga opciones cargadas
  const select = page.getByTestId('select');
  await select.waitFor({ state: 'visible' });
  await page.waitForFunction(() => {
    const selectElement = document.querySelector('[data-testid="select"]') as HTMLSelectElement;
    return selectElement && selectElement.options.length > 1;
  });
  
  await select.selectOption({ index: 1 });
  await page.getByTestId('form').getByTestId('button').click();
});
