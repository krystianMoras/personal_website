# Setup

1. Download https://github.com/zoni/obsidian-export


Find the ports: section under the coolify: service and change it from this:

    ports:
      - "${APP_PORT:-8000}:8080"

to this:

    ports:
      # bind host‑only on 127.0.0.1
      - "127.0.0.1:${APP_PORT:-8000}:8080"


cd /data/coolify/source
docker compose \
  -f docker-compose.yml \
  -f docker-compose.prod.yml \
  up -d --no-deps --force-recreate coolify

