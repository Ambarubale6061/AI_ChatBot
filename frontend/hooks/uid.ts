export function uid() {
  return 'id-' + Math.random().toString(36).slice(2,9)
}