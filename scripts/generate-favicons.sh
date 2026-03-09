#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_ICON="${1:-$ROOT_DIR/public/assets/brand/iconfavicon.png}"
BRAND_DIR="$ROOT_DIR/public/assets/brand"
PUBLIC_DIR="$ROOT_DIR/public"
APP_DIR="$ROOT_DIR/src/app"

if ! command -v magick >/dev/null 2>&1; then
  echo "Error: ImageMagick 'magick' command not found." >&2
  exit 1
fi

if [[ ! -f "$SOURCE_ICON" ]]; then
  echo "Error: source icon not found at $SOURCE_ICON" >&2
  exit 1
fi

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

DARK_MASTER="$TMP_DIR/favicon-dark-master.png"
LIGHT_MASTER="$TMP_DIR/favicon-light-master.png"

# Build a square transparent master for reliable downscaling.
magick "$SOURCE_ICON" \
  -background none \
  -alpha on \
  -trim +repage \
  -resize 512x512 \
  -gravity center \
  -extent 512x512 \
  "PNG32:$DARK_MASTER"

# Light mode variant: invert the RGB channels while preserving alpha.
magick "$DARK_MASTER" \
  -channel RGB -negate +channel \
  "PNG32:$LIGHT_MASTER"

sizes=(16 32 64 128 180 256 512)
for size in "${sizes[@]}"; do
  magick "$DARK_MASTER" -filter Lanczos -resize "${size}x${size}" "PNG32:$BRAND_DIR/favicon-dark-${size}.png"
  magick "$LIGHT_MASTER" -filter Lanczos -resize "${size}x${size}" "PNG32:$BRAND_DIR/favicon-light-${size}.png"
done

# Canonical aliases used by metadata and legacy clients.
cp "$BRAND_DIR/favicon-dark-16.png" "$BRAND_DIR/favicon-16.png"
cp "$BRAND_DIR/favicon-dark-32.png" "$BRAND_DIR/favicon-32.png"
cp "$BRAND_DIR/favicon-dark-256.png" "$BRAND_DIR/favicon-256.png"
cp "$BRAND_DIR/favicon-dark-256.png" "$BRAND_DIR/favicon-dark.png"
cp "$BRAND_DIR/favicon-light-256.png" "$BRAND_DIR/favicon-light.png"
cp "$BRAND_DIR/favicon-dark-180.png" "$BRAND_DIR/apple-touch-icon.png"

# Keep Next's app icon route and legacy favicon in sync with dark default.
cp "$BRAND_DIR/favicon-dark-256.png" "$APP_DIR/icon.png"
magick "$BRAND_DIR/favicon-dark-16.png" "$BRAND_DIR/favicon-dark-32.png" "$PUBLIC_DIR/favicon.ico"

echo "Favicon assets generated from: $SOURCE_ICON"
