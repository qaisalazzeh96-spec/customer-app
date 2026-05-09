{
  "schema": "./src/db/schema.ts",
  "out": "./drizzle",
  "dialect": "postgresql",
  "driver": "neon-http",
  "dbCredentials": {
    "url": "${DATABASE_URL}"
  }
}
