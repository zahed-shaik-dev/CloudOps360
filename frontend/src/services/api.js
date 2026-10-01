const API_URL = "/api";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export async function getHealth() {
  return request("/health");
}

export async function getReadiness() {
  return request("/ready");
}

export async function getServices() {
  return request("/services");
}

export default {
  getHealth,
  getReadiness,
  getServices,
};