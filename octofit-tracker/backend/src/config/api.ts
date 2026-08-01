const defaultPort = 8000;

export function getApiPort() {
  const parsedPort = Number.parseInt(process.env.PORT ?? '', 10);

  return Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : defaultPort;
}

export function getApiBaseUrl(port = getApiPort()) {
  const codespaceName = process.env.CODESPACE_NAME;

  return codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`;
}