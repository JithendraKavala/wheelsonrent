#!/bin/bash
set -e

# --- CONFIG ---
# Render DB
REMOTE_HOST="dpg-d2van4v5r7bs73cmca00-a.oregon-postgres.render.com"
REMOTE_PORT="5432"
REMOTE_USER="wheelsonrend_db_user"
REMOTE_DB="wheelsonrend_db"
REMOTE_PASS="1HbEw53IN8VCr0DYQdSaAyVF9uFwNFQq"

# Local DB
LOCAL_DB="wheelsonrent"
LOCAL_USER="wheelsonrent_user"
LOCAL_HOST="localhost"
LOCAL_PORT="5432"
LOCAL_PASS="jithu7043"

# Dump files
REMOTE_DUMP="remote_dump.dump"
LOCAL_DUMP="local_dump.dump"

usage() {
    echo "Usage: $0 [--to-local | --to-remote]"
    echo "  --to-local    Copy data from Render → Local"
    echo "  --to-remote   Copy data from Local → Render"
    exit 1
}

if [[ "$1" == "--to-local" ]]; then
    echo "🔄 Dumping from Render..."
    PGPASSWORD="$REMOTE_PASS" pg_dump -Fc -h "$REMOTE_HOST" -p "$REMOTE_PORT" -U "$REMOTE_USER" "$REMOTE_DB" > "$REMOTE_DUMP"

    echo "💾 Restoring into Local DB..."
    PGPASSWORD="$LOCAL_PASS" pg_restore -h "$LOCAL_HOST" -p "$LOCAL_PORT" -U "$LOCAL_USER" -d "$LOCAL_DB" --clean < "$REMOTE_DUMP"

    echo "🧹 Cleaning up dump file..."
    rm -f "$REMOTE_DUMP"

    echo "✅ Local DB updated from Render!"

elif [[ "$1" == "--to-remote" ]]; then
    echo "🔄 Dumping from Local..."
    PGPASSWORD="$LOCAL_PASS" pg_dump -Fc -h "$LOCAL_HOST" -p "$LOCAL_PORT" -U "$LOCAL_USER" "$LOCAL_DB" > "$LOCAL_DUMP"

    echo "💾 Restoring into Render DB..."
    PGPASSWORD="$REMOTE_PASS" pg_restore -h "$REMOTE_HOST" -p "$REMOTE_PORT" -U "$REMOTE_USER" -d "$REMOTE_DB" --clean < "$LOCAL_DUMP"

    echo "🧹 Cleaning up dump file..."
    rm -f "$LOCAL_DUMP"

    echo "✅ Render DB updated from Local!"

else
    usage
fi
