export function getApiBaseUrl() {
  const codespaceName = import.meta.env.CODESPACE_NAME || import.meta.env.VITE_CODESPACE_NAME

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000'
}

export async function fetchJson(path) {
  const response = await fetch(`${getApiBaseUrl()}${path}`)

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return response.json()
}