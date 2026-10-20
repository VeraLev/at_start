import { Page, expect, test } from '@playwright/test';

// Общий шаг для многих тестов: войти на сайт.
export async function login(page: Page, username = 'standard_user', password = 'secret_sauce') {
  await page.goto('/');
  await page.getByTestId('username').fill(username);
  await page.getByTestId('password').fill(password);
  await page.getByTestId('login-button').click();
}

// Войти пользователем, под которым идёт прогон (standard_user или problem_user,
// задаётся в playwright.config.ts), и убедиться, что открылся каталог.
export async function loginAsUser(page: Page) {
  const username = test.info().project.metadata.username ?? 'standard_user';
  await login(page, username);
  await expect(page).toHaveURL(/inventory\.html/);
}
