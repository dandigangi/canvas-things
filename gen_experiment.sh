#!/usr/bin/env bash
set -e

TEMPLATE="template.html"

if [ ! -f "$TEMPLATE" ]; then
  echo "Template file '$TEMPLATE' not found in current directory."
  exit 1
fi

read -rp "New experiment name (without .html): " NAME

if [ -z "$NAME" ]; then
  echo "Name cannot be empty."
  exit 1
fi

NEW_FILE="${NAME}.html"

if [ -e "$NEW_FILE" ]; then
  echo "File '$NEW_FILE' already exists. Aborting to avoid overwrite."
  exit 1
fi

cp "$TEMPLATE" "$NEW_FILE"

sed -i '' "s|\[%EXPERIMENT_TITLE%\]|$NAME|g" "$NEW_FILE"
echo "Created '$NEW_FILE' from '$TEMPLATE'."
