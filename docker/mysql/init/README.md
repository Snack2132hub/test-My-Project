Place your SQL dump file in this folder if you want automatic import on first startup.

Example:
- copy your dump as docker/mysql/init/001-initial-data.sql
- run npm run docker:up

Notes:
- Files in this folder run only when MySQL initializes a fresh data volume.
- If you already started the database once, use npm run docker:reset-db and then npm run docker:up.