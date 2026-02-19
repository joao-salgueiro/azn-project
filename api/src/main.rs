use axum::{
    routing::get,
    Json, Router,
    extract::State,
    extract::Path,
};

use sqlx::{Pool, Postgres};
use sqlx::postgres::PgPoolOptions;
use sqlx::FromRow;
use std::env;


use serde::Serialize;
use tower_http::cors::{Any, CorsLayer};

#[derive(Serialize)]
struct HealthResponse {
    ok: bool,
    msg: &'static str,
}

#[derive(Serialize, FromRow)]
struct Artefato {
    id: i32,
    titulo: String,
    resumo: Option<String>,
    conteudo: String,
    imagem_capa: Option<String>,
    estado: String,
    criado_em: chrono::NaiveDateTime,
}


#[derive(Clone)]
struct AppState {
    db: Pool<Postgres>,
}


async fn listar_artefatos(
    State(state): State<AppState>,
) -> Result<Json<Vec<Artefato>>, axum::http::StatusCode> {
    let artefatos = sqlx::query_as::<_, Artefato>(
    r#"
    SELECT id, titulo, resumo, conteudo, imagem_capa, estado, criado_em
    FROM artefatos
    ORDER BY criado_em DESC
    "#
)
.fetch_all(&state.db)
.await
.map_err(|_| axum::http::StatusCode::INTERNAL_SERVER_ERROR)?;


    Ok(Json(artefatos))
}

async fn buscar_artefato_por_id(
    Path(id): Path<i32>,
    State(state): State<AppState>,
) -> Result<Json<Artefato>, axum::http::StatusCode> {

    let artefato = sqlx::query_as::<_, Artefato>(
        r#"
        SELECT id, titulo, resumo, conteudo, imagem_capa, estado, criado_em
        FROM artefatos
        WHERE id = $1 
        "#
    )
    .bind(id)
    .fetch_optional(&state.db)
    .await
    .map_err(|_| axum::http::StatusCode::INTERNAL_SERVER_ERROR)?;

    match artefato {
        Some(a) => Ok(Json(a)),
        None => Err(axum::http::StatusCode::NOT_FOUND),
    }
}




async fn health() -> Json<HealthResponse> {
    Json(HealthResponse {
        ok: true,
        msg: "Bateu na API e voltou",
    })
}

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL não definido");

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Falha ao conectar ao banco de dados");

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/health", get(health))
        .route("/artefatos", get(listar_artefatos))
        .route("/artefatos/:id", get(buscar_artefato_por_id))
        .with_state(AppState { db: pool } )
        .layer(cors);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080")
        .await
        .expect("Falha ao bindar porta 8080");

    println!("API rodando em http://localhost:8080");
    axum::serve(listener, app).await.unwrap();
}
