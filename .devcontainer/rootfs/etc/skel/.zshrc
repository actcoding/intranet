# enable completions
autoload -Uz compinit
compinit

eval "$(starship init zsh)"

# completions
INCLUDE_DIR=~/.zsh/completions

# Check if the directory exists
if [ -d "$INCLUDE_DIR" ]; then
  # Add the directory to the fpath
  fpath+=("$INCLUDE_DIR")

  # Include all *.zsh and *.sh files in the directory
  for file in "$INCLUDE_DIR"/*.zsh; do
    if [ -f "$file" ]; then
      source "$file"
    fi
  done
fi
