import { defineConfig, devices } from '@playwright/test';

// В режиме с видимым браузером (--headed) замедляем действия, чтобы за ними было удобно следить.
const headed = process.argv.includes('--headed');

export default defineConfig({
  testDir: './tests',
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    // На сайте у элементов есть метки data-test, по ним тесты находят кнопки и поля
    testIdAttribute: 'data-test',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    launchOptions: {
      slowMo: headed ? 500 : 0,
      // Необязательно: свой путь к браузеру (нужен только в некоторых средах)
      ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
    },
  },
  projects: [
    // Обычный пользователь: всё должно работать, тесты зелёные.
    {
      name: 'standard_user',
      metadata: { username: 'standard_user' },
      use: { ...devices['Desktop Chrome'] },
    },
    // «Сломанный» пользователь: на сайте специально заложены баги, часть тестов должна упасть.
    {
      name: 'problem_user',
      metadata: { username: 'problem_user' },
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
