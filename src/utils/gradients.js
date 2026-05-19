const GRADIENTS = [
  'post-gradient-1',
  'post-gradient-2',
  'post-gradient-3',
  'post-gradient-4',
  'post-gradient-5',
  'post-gradient-6',
]

export function gradientForId(id) {
  if (!id) return GRADIENTS[0]
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  }
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length]
}
