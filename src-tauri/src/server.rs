use axum::{
    extract::State,
    http::StatusCode,
    routing::post,
    Router,
};
use serde_json::Value;
use std::net::SocketAddr;
use tauri::{AppHandle, Emitter};
use tower_http::cors::{Any, CorsLayer};

pub async fn start(app_handle: AppHandle) {
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let router = Router::new()
        .route("/event", post(handle_event))
        .layer(cors)
        .with_state(app_handle);

    let addr: SocketAddr = "127.0.0.1:4317".parse().unwrap();

    let listener = match tokio::net::TcpListener::bind(addr).await {
        Ok(l) => l,
        Err(e) => {
            eprintln!("[companion] Could not bind to {}: {}. Another instance running?", addr, e);
            return;
        }
    };

    eprintln!("[companion] HTTP server listening on {}", addr);

    if let Err(e) = axum::serve(listener, router).await {
        eprintln!("[companion] Server error: {}", e);
    }
}

async fn handle_event(
    State(app): State<AppHandle>,
    body: axum::body::Bytes,
) -> StatusCode {
    let payload: Value = match serde_json::from_slice(&body) {
        Ok(v) => v,
        Err(_) => {
            Value::Object(serde_json::Map::new())
        }
    };

    match app.emit("cc-event", &payload) {
        Ok(_) => StatusCode::OK,
        Err(e) => {
            eprintln!("[companion] Failed to emit event: {}", e);
            StatusCode::INTERNAL_SERVER_ERROR
        }
    }
}
