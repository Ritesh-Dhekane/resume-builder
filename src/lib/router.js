export function getPath() {
  const hash = window.location.hash.slice(1);
  const [path] = hash.split('?');
  return path || '/';
}

export function getQuery() {
  const hash = window.location.hash.slice(1);
  const [, query = ''] = hash.split('?');
  return new URLSearchParams(query);
}

export function navigate(path) {
  window.location.hash = path;
}
