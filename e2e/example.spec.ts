import { test, expect } from "@playwright/test";

test.describe("Fluxo de Autenticação e Catálogo", () => {
  test("deve realizar login com sucesso e visualizar a grade de produtos", async ({
    page,
  }) => {
    await page.goto("/login");

    await page.getByPlaceholder("Usuário").fill("dinamica");
    await page.getByPlaceholder("Senha").fill("123");

    await page.getByRole("button", { name: /entrar|login/i }).click();

    await expect(page).toHaveURL(/.*produtos/, { timeout: 10000 });

    const firstProductTitle = page.locator("h3").first();
    await expect(firstProductTitle).toBeVisible({ timeout: 10000 });

    await expect(firstProductTitle).not.toBeEmpty();
  });
});
