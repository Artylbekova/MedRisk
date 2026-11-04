
# Структура базы данных MedRisk

## Назначение
База данных PostgreSQL предназначена для хранения сведений о пациентах, медицинских показателях и результатах оценки рисков.

## Основные таблицы

### 1. Users
- id — идентификатор пользователя (PK)
- full_name — ФИО
- email — электронная почта
- password_hash — хеш пароля
- role — роль пользователя

### 2. Patients
- id — идентификатор пациента (PK)
- full_name — ФИО пациента
- birth_date — дата рождения
- created_by — идентификатор врача (FK → Users.id)

### 3. Observations
- id — идентификатор записи (PK)
- patient_id — пациент (FK → Patients.id)
- observation_date — дата измерения
- parameter_name — название показателя
- parameter_value — значение показателя

### 4. RiskAssessments
- id — идентификатор оценки (PK)
- patient_id — пациент (FK → Patients.id)
- risk_score — рассчитанная вероятность риска
- risk_level — уровень риска
- model_version — версия модели
- created_at — дата оценки

### 5. AuditLogs
- id — идентификатор события (PK)
- user_id — пользователь (FK → Users.id)
- action — выполненное действие
- created_at — дата и время события

## Связи между таблицами
- Users 1:N Patients
- Patients 1:N Observations
- Patients 1:N RiskAssessments
- Users 1:N AuditLogs

## Безопасность
Доступ к медицинским данным ограничивается ролями пользователей. Все изменения и обращения к конфиденциальной информации должны фиксироваться в журнале аудита.
