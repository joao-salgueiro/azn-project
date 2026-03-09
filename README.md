AZN — Arquivo Zona Null

PT — Plataforma editorial de artefatos digitais.
EN — A digital archive platform for editorial artifacts.

🌐 Live: jpsalgueiro.mooo.com

Stack
FrontendNext.js · TypeScript · TailwindBackendRust · Axum · SQLxDatabasePostgreSQL 16InfraDocker · AWS EC2 · Nginx

Running locally / Rodando localmente
bashgit clone https://github.com/jpsalgueiro/azn-project.git
cd azn-project
docker compose up -d
Run migrations:
bashdocker exec -i azn-project-db-1 psql -U azn -d azn < api/migrations/001_init.sql
docker exec -i azn-project-db-1 psql -U azn -d azn < api/migrations/002_init.sql
Access at http://localhost:3000

João Pedro Salgueiro · LinkedIn · GitHub
<sub>Built with Rust + Next.js · Deployed on AWS</sub>
