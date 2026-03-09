# AZN — Arquivo Zona Null

> PT — Plataforma editorial de artefatos digitais.  
> EN — A digital archive platform for editorial artifacts.

🌐 **Live:** [jpsalgueiro.mooo.com](http://jpsalgueiro.mooo.com)

---

## Stack

| | |
|---|---|
| Frontend | Next.js · TypeScript · Tailwind |
| Backend | Rust · Axum · SQLx |
| Database | PostgreSQL 16 |
| Infra | Docker · AWS EC2 · Nginx |

---

## Running locally / Rodando localmente

```bash
git clone https://github.com/jpsalgueiro/azn-project.git
cd azn-project
docker compose up -d
```

Run migrations:
```bash
docker exec -i azn-project-db-1 psql -U azn -d azn < api/migrations/001_init.sql
docker exec -i azn-project-db-1 psql -U azn -d azn < api/migrations/002_init.sql
```

Access at `http://localhost:3000`

---

**João Pedro Salgueiro** · [LinkedIn](https://linkedin.com/in/jpsalgueiro) · [GitHub](https://github.com/jpsalgueiro)

<sub>Built with Rust + Next.js · Deployed on AWS</sub>
