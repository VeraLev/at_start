# at_start

Учебный проект: автотесты на Playwright для демо-магазина https://www.saucedemo.com.

## Тесты
- `tests/login.spec.ts` — вход с верным логином открывает каталог.

## Запуск
- Автоматически: при каждом изменении в GitHub (вкладка **Actions**). Отчёт лежит в разделе *Artifacts* у прогона.
- Вручную: `npm ci`, `npx playwright install chromium`, `npm test`.
