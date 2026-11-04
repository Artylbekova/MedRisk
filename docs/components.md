# Компоненты MedRisk

| Компонент | Назначение | Технология | Взаимодействие |
|---|---|---|---|
| Врач / Администратор | Пользователи системы с разными правами | Браузер | Frontend через UI |
| Frontend | Формы и визуализация; без него нет пользовательского интерфейса | React + TypeScript | Backend: HTTPS/JSON |
| API / Controllers | Принимает HTTP-запросы и возвращает коды/JSON | NestJS Controllers | Frontend; Services |
| Auth + RBAC Guards | Проверяет личность, роль и доступ к конкретному пациенту | NestJS Guards | Controllers; Users; Assignments |
| Patients + Observations Service | Ведёт карточки, показатели и назначения доступа | NestJS Services | ORM; PostgreSQL |
| RiskAssessment Service | Проверяет допустимость расчёта и сохраняет результат | NestJS Service | Observations; Inference API; ORM |
| Audit Service | Регистрирует чтение/изменение медицинских данных | NestJS Service | ORM; PostgreSQL |
| Prisma ORM | Типизированный доступ к таблицам и транзакциям | Prisma | Services; PostgreSQL |
| PostgreSQL | Хранит пользователей, пациентов, показатели, оценки и аудит | PostgreSQL | Только backend через SQL |
| Inference API | Возвращает предварительный риск и версию модели; недоступность не должна блокировать просмотр карточек | Python + FastAPI (проектируемый) | RiskAssessment Service: HTTPS/JSON |
