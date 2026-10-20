# at_start

Учебный проект: автотесты на Playwright для демо-магазина https://www.saucedemo.com.

## Тесты
| Файл | Сценарии |
|---|---|
| `tests/login.spec.ts` | 1. Вход с верным логином · 2. Неверный пароль · 3. Заблокированный пользователь · 9. Выход из аккаунта |
| `tests/cart.spec.ts` | 4. Добавление в корзину · 5. Удаление из корзины |
| `tests/sorting.spec.ts` | 6. Сортировка по цене (в обе стороны) |
| `tests/checkout.spec.ts` | 7. Оформление заказа · 8. Ошибка при пустых полях |

`tests/helpers.ts` — общий шаг «войти на сайт», который используют многие тесты.

## Запуск

Тесты гоняются под двумя пользователями сайта:
- `standard_user` — всё работает, тесты должны быть зелёными;
- `problem_user` — на сайте специально заложены баги, часть тестов должна упасть.

**На своём компьютере** (нужен Node.js 18+): один раз `npm ci` и `npx playwright install chromium`, затем:

| Команда | Что делает |
|---|---|
| `npm test` | все тесты под standard_user, браузер скрыт |
| `npm run test:headed` | то же с видимым браузером (действия замедлены) |
| `npm run test:problem` | все тесты под problem_user |
| `npm run test:problem:headed` | под problem_user с видимым браузером |
| `npm run report` | открыть отчёт последнего прогона |

**На GitHub**: тесты под standard_user запускаются сами при каждом изменении (вкладка **Actions**). Тесты под problem_user запускаются вручную: Actions → «Тесты под problem_user» → Run workflow. Отчёт с видео упавших тестов лежит в разделе *Artifacts* у прогона.

## Запуск в Docker

Нужен установленный и запущенный [Docker Desktop](https://www.docker.com/products/docker-desktop/). Node.js и браузеры ставить не нужно: всё есть внутри контейнера.

| Команда | Что делает |
|---|---|
| `npm run docker:test` | тесты под standard_user в контейнере |
| `npm run docker:problem` | тесты под problem_user в контейнере |

Без npm то же самое: `docker compose run --rm --build tests`.

В контейнере браузер работает без окна. Отчёт, скриншоты и видео сохраняются в папки `playwright-report` и `test-results` проекта, отчёт открывается командой `npm run report`. Смотреть на браузер вживую можно только без Docker: `npm run test:headed`.

Версия образа в `Dockerfile` должна совпадать с версией `@playwright/test` в `package.json`. При обновлении Playwright меняйте обе.
