export async function apiRequest(url, options  =  {}) {
    const {
        method = 'GET',
        token = '',
        body,
        headers = {}
    } = options;

    const requestHeaders = { ...headers };
    
    if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
    }

if (body) {
    requestHeaders['Content-Type'] = 'application/json';
    }       
    
    const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined
    });
        
    const contentType = response.headers.get('Content-Type') ?? '';
    const data = contentType.includes('application/json') ? await response.json() : null;

    if (!response.ok) {
        const errorMessage = data?.message || `Request failed with status ${response.status}` || 'An unknown error occurred.';
        throw new Error(errorMessage);
    }

    return data;
}

export function buildQueryString(params) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, value);
        }

    });

    return searchParams.toString();
}