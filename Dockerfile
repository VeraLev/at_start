# Официальный образ Playwright: внутри уже есть Node.js и браузеры нужной версии.
# Версия образа должна совпадать с версией @playwright/test в package.json.
FROM mcr.microsoft.com/playwright:v1.64.1-noble

WORKDIR /app

# Сначала ставим зависимости (этот шаг кешируется, пока не меняется package-lock.json)
COPY package.json package-lock.json ./
RUN npm ci

# Затем копируем сами тесты
COPY . .

# По умолчанию — тесты под standard_user
CMD ["npm", "test"]
