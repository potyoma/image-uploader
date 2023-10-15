# ImageKeeper

The app allows you to upload and view saved images.

### Tech stack:
 - Backend:
   - Node.js
   - Nest
   - Prisma
   - PostgreSQL
 - Frontend
   - TypeScript
   - React.js
   - Next.js
   - zustand

## Run the project locally

First run the database:
```bash
docker compose up -d
```

Then add `.env` file to `apps/server` with following data (replace with your credentials or use default)
```env
POSTGRES_HOST="localhost"
POSTGRES_PORT="5432"
POSTGRES_NAME="mydb"
POSTGRES_USER="admin"
POSTGRES_PASSWORD="admin"

DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_NAME}?schema=public"
```

Nest step is to apply migrations: 
```bash
pnpm run migrate
```

And finally run both backend and frontend with:
```bash
pnpm run dev
```
