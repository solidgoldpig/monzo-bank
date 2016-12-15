_monzoCompletion() {
  COMPREPLY=()
  local word="${COMP_WORDS[COMP_CWORD]}"
  #args=$(printf "%s " "${COMP_WORDS[@]}")
  local args=${COMP_WORDS[1]}
  local completions="$(monzo $args --completions)"
  COMPREPLY=( $(compgen -W '$completions' -- $word) )
}

complete -F _monzoCompletion monzo
