#!/usr/bin/env bash

set -euo pipefail

name="${1:-}"

if [[ -z "$name" ]]; then
  echo "Usage: npm run gen -- <experiment-name>"
  exit 1
fi

if [[ ! "$name" =~ ^[a-zA-Z0-9_-]+$ ]]; then
  echo "Experiment name must be alphanumeric/underscore/dash."
  exit 1
fi

root="$(pwd)"
template_path="$root/experiment.template.js"
dest_dir="$root/experiments"
dest_path="$dest_dir/$name.js"
index_path="$root/index.js"

if [[ ! -f "$template_path" ]]; then
  echo "experiment.template.js not found at project root."
  exit 1
fi

mkdir -p "$dest_dir"

if [[ -f "$dest_path" ]]; then
  echo "Experiment \"$name\" already exists at experiments/$name.js."
  exit 1
fi

{
  echo "// Experiment: $name"
  cat "$template_path"
} > "$dest_path"

echo "Created experiments/$name.js from template."

# Format name for nav label: replace -/_ with space, Title Case each word
label="${name//[-_]/ }"
label="$(echo "$label" | awk '{
  for (i=1;i<=NF;i++) {
    $i = toupper(substr($i,1,1)) tolower(substr($i,2))
  }
  print
}')"

# Add to EXPERIMENTS nav in index.js if not already present
if [[ -f "$index_path" ]]; then
  if grep -q "id: '$name'" "$index_path"; then
    echo "Experiment \"$name\" is already listed in index.js."
  else
    # Insert just before the closing bracket of EXPERIMENTS array
    perl -0pi -e "s/(const EXPERIMENTS = \\[\n)([^\\]]*)(\\])/\\1\\2   { id: '$name', label: '$label' },\n\\3/" "$index_path"
    echo "Added \"$label\" to experiments nav in index.js."
  fi
else
  echo "Warning: index.js not found, could not update experiments nav."
fi


