function hasValue(value) {
  return typeof value === 'string' && value.trim().length > 0
}

export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  if (hasValue(codespaceName)) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  // Fallback prevents malformed URLs like https://undefined-8000.app.github.dev.
  return 'http://localhost:8000'
}

export function getApiEndpoint(resource) {
  return `${getApiBaseUrl()}/api/${resource}/`
}

function getArrayFromPayload(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const candidates = [
    payload.data,
    payload.items,
    payload.results,
    payload.docs,
    payload.records,
    payload.rows,
  ]

  const match = candidates.find((candidate) => Array.isArray(candidate))
  return match || []
}

function getPaginationFromPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    return null
  }

  if (payload.pagination && typeof payload.pagination === 'object') {
    return payload.pagination
  }

  if ('page' in payload || 'totalPages' in payload || 'limit' in payload || 'total' in payload) {
    return {
      page: payload.page ?? null,
      totalPages: payload.totalPages ?? null,
      limit: payload.limit ?? null,
      total: payload.total ?? payload.count ?? null,
      hasNextPage: payload.hasNextPage ?? null,
    }
  }

  return null
}

export function normalizeCollectionPayload(payload) {
  return {
    items: getArrayFromPayload(payload),
    pagination: getPaginationFromPayload(payload),
    raw: payload,
  }
}

export async function fetchCollection(resource) {
  const response = await fetch(getApiEndpoint(resource))

  if (!response.ok) {
    throw new Error(`Request failed for ${resource}: ${response.status}`)
  }

  const payload = await response.json()
  return normalizeCollectionPayload(payload)
}