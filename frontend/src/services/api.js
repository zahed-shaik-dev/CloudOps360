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
    const errorText = await response.text();

    throw new Error(
      errorText || `API request failed with status ${response.status}`
    );
  }

  return response.json();
}


// ------------------------------------------------------------
// HEALTH
// ------------------------------------------------------------

export async function getHealth() {
  return request("/health");
}

export async function getReadiness() {
  return request("/ready");
}


// ------------------------------------------------------------
// SERVICES
// ------------------------------------------------------------

export async function getServices() {
  return request("/services");
}

export async function getServiceById(id) {
  return request(`/services/${id}`);
}


// ------------------------------------------------------------
// DEPLOYMENTS
// ------------------------------------------------------------

export async function getDeployments() {
  return request("/deployments");
}

export async function getDeploymentById(id) {
  return request(`/deployments/${id}`);
}


// ------------------------------------------------------------
// INCIDENTS
// ------------------------------------------------------------

export async function getIncidents() {
  return request("/incidents");
}

export async function getIncidentById(id) {
  return request(`/incidents/${id}`);
}


// ------------------------------------------------------------
// METRICS
// ------------------------------------------------------------

export async function getMetrics() {
  return request("/metrics");
}

export async function getServiceMetrics(serviceName) {
  return request(
    `/metrics/service/${encodeURIComponent(serviceName)}`
  );
}