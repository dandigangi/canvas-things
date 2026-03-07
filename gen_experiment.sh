#!/usr/bin/env bash
set -e

read -rp "Is this a 2d or 3d experiment? (2d/3d): " DIMENSION
DIMENSION_LOWER=$(printf '%s' "$DIMENSION" | tr '[:upper:]' '[:lower:]')

if [ "$DIMENSION_LOWER" != "2d" ] && [ "$DIMENSION_LOWER" != "3d" ]; then
  echo "Invalid choice. Please enter '2d' or '3d'."
  exit 1
fi

read -rp "Animation or static? (animation/static): " TYPE_RAW
TYPE_LOWER=$(printf '%s' "$TYPE_RAW" | tr '[:upper:]' '[:lower:]')

if [ "$TYPE_LOWER" = "animation" ]; then
  TEMPLATE="template.animation.html"
elif [ "$TYPE_LOWER" = "static" ]; then
  TEMPLATE="template.static.html"
else
  echo "Invalid choice. Please enter 'animation' or 'static'."
  exit 1
fi

if [ ! -f "$TEMPLATE" ]; then
  echo "Template file '$TEMPLATE' not found in current directory."
  exit 1
fi

read -rp "Experiment name (without .html): " NAME_RAW

if [ -z "$NAME_RAW" ]; then
  echo "Name cannot be empty."
  exit 1
fi

# normalize spaces
NAME_TRIMMED=$(printf '%s' "$NAME_RAW" | xargs)

# filename - all lowercase, words dash-separated
NAME_SLUG=$(printf '%s' "$NAME_TRIMMED" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
NEW_FILE="${DIMENSION_LOWER}-${NAME_SLUG}.html"

if [ -e "$NEW_FILE" ]; then
  echo "File '$NEW_FILE' already exists. Aborting to avoid overwrite."
  exit 1
fi

cp "$TEMPLATE" "$NEW_FILE"

# experiment title all caps, preserve brackets
EXPERIMENT_TITLE=$(printf '%s' "$NAME_TRIMMED" | tr '[:lower:]' '[:upper:]')

sed -i '' "s|\[%EXPERIMENT_TITLE%\]|[$EXPERIMENT_TITLE]|g" "$NEW_FILE"
echo "Created '$NEW_FILE' from '$TEMPLATE'."
