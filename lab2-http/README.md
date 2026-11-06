# Лабораторная №2 — HTTP/HTTPS и REST API (MedRisk)

Используйте сервер `../mock-server/server.js` (Node.js 18+).

1. `node mock-server/server.js` из корня проекта.
2. Откройте `http://localhost:3000/api/health` и `http://localhost:3000/api/patients?page=1&limit=3`.
3. Импортируйте `MedRisk.postman_collection.json` в Postman. Запустите запросы по порядку: Health, List, Create, Get, Update, Delete, Not Found, Validation.
4. Зафиксируйте HTTP method, URL, заголовки, JSON body, status (200/201/204/404/422), время ответа.
5. В DevTools вкладка Network покажет запросы React-клиента.

Сервер учебный, хранение в памяти, данные вымышленные. HTTPS предусмотрен для продакшена, но локально используется HTTP.

## Вывод
Изучены GET/POST/PUT/DELETE, query/path/body, JSON, коды HTTP и проверка API. Для отчёта нужны реальные скриншоты Postman/DevTools после запуска.
