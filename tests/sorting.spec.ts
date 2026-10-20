import { test, expect, Page } from '@playwright/test';
import { loginAsStandardUser } from './helpers';

// Цены всех товаров на странице как числа, например «$29.99» → 29.99.
async function getPrices(page: Page) {
  const texts = await page.getByTestId('inventory-item-price').allTextContents();
  return texts.map((t) => Number(t.replace('$', '')));
}

// Сценарий 6: сортировка по цене работает.
test('сортировка по цене: от дешёвых к дорогим', async ({ page }) => {
  await loginAsStandardUser(page);

  await page.getByTestId('product-sort-container').selectOption('lohi');

  const prices = await getPrices(page);
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

test('сортировка по цене: от дорогих к дешёвым', async ({ page }) => {
  await loginAsStandardUser(page);

  await page.getByTestId('product-sort-container').selectOption('hilo');

  const prices = await getPrices(page);
  expect(prices).toEqual([...prices].sort((a, b) => b - a));
});
