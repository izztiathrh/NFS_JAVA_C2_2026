const STORAGE_KEY = 'support-desk-auth';

function getTokenFromStorage() {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (!v) return null;
    const parsed = JSON.parse(v);
    return parsed?.token ?? null;
  } catch {
    return null;
  }
}

export async function apiRequest(path, options = {}) {
  const { method = 'GET', body = undefined, headers: userHeaders = {}, ...rest } = options;

  const token = typeof window !== 'undefined' ? getTokenFromStorage() : null;

  const headers = {
    ...userHeaders,
  };

  let payload = undefined;
  if (body !== undefined && body !== null) {
    // If body is FormData, let fetch set the content-type
    if (body instanceof FormData) {
      payload = body;
    } else {
      headers['Content-Type'] = headers['Content-Type'] || 'application/json';
      payload = JSON.stringify(body);
    }
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = path.startsWith('http') ? path : path.startsWith('/') ? path : `/${path}`;

  let response;
  try {
    response = await fetch(url, { method, headers, body: payload, ...rest });
  } catch (err) {
    throw new Error(err.message || 'Network request failed');
  }

  // No content
  if (response.status === 204) return null;

  const text = await response.text().catch(() => '');
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson && text ? JSON.parse(text) : text;

  if (!response.ok) {
    const message = (data && data.message) || data || response.statusText || 'Request failed';
    const err = new Error(typeof message === 'string' ? message : JSON.stringify(message));
    err.status = response.status;
    throw err;
  }

  return data;
}

export default apiRequest;
