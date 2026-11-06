# Лабораторная №4 — типизация MedRisk

`npm install` → `npm run check` → `npm run dev`.

Файлы: `src/models.ts` (сущности), `src/dto.ts` (Omit/Partial/Pick, Paginated<T>, Result<T>), `src/mappers.ts` (явные преобразователи), `src/guards.ts` (unknown/type guard), `src/api.ts` (безопасный fetch), `src/demo.ts` (6 JSON-сценариев).

Таблица: Patient → CreatePatientDto, UpdatePatientDto; User → PublicUserDto (без email/passwordHash). Журнал: [compiler-errors.md](docs/compiler-errors.md).
