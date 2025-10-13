const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type ApiOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  credentials?: RequestCredentials;
};

export async function api(endpoint: string, options: ApiOptions = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: options.credentials || "include",
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error: ${res.status} - ${errorText}`);
  }

  return res.json();
}
