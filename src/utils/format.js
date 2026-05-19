export function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr))
}

export function formatRelative(dateStr) {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'ahora'
  if (minutes < 60) return `hace ${minutes}m`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `hace ${hours}h`
  const days = Math.floor(hours / 24)
  if (days < 7) return `hace ${days}d`
  return formatDate(dateStr)
}

export function truncate(text, max = 80) {
  if (!text) return ''
  return text.length > max ? `${text.slice(0, max)}…` : text
}

export function getInitials(name, lastname) {
  const a = name?.[0] ?? ''
  const b = lastname?.[0] ?? ''
  return `${a}${b}`.toUpperCase() || '?'
}

export function shortId(id) {
  if (!id) return ''
  return id.slice(0, 8)
}
