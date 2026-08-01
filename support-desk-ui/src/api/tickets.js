// Thin API helpers for the support-desk ticket endpoints.
// They always attach the Bearer token from AuthContext and convert
// non-2xx responses into a JS Error carrying the backend's `message`.

async function readErrorMessage(response, fallback) {
  // Try to read a structured { message } body first (matches ErrorResponse).
  try {
    const data = await response.json();
    if (data && typeof data.message === 'string' && data.message.trim()) {
      return data.message;
    }
  } catch {
    // Body wasn't JSON — fall through to plain-text below.
  }
  try {
    const text = await response.text();
    if (text && text.trim()) {
      // Trim long HTML pages (e.g. default Spring error pages) to a useful snippet.
      return text.trim().slice(0, 300);
    }
  } catch {
    // ignore
  }
  return `${fallback} (HTTP ${response.status})`;
}

function authHeaders(token, extra = {}) {
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

export async function getTicket(token, id) {
  const response = await fetch(`/api/v1/tickets/${encodeURIComponent(id)}`, {
    method: 'GET',
    headers: authHeaders(token),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, 'Failed to load ticket'));
  }

  return response.json();
}

export async function createTicket(token, payload) {
  const response = await fetch('/api/v1/tickets', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, 'Failed to create ticket'));
  }

  return response.json();
}

export async function updateTicket(id, token, payload) {
  const response = await fetch(`/api/v1/tickets/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, 'Failed to update ticket'));
  }

  return response.json();
}
