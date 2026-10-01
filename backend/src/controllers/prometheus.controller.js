const client = require("prom-client");

const register = new client.Registry();

client.collectDefaultMetrics({
  register,
});

const httpRequests = new client.Counter({
  name: "cloudops360_http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

const httpResponseTime = new client.Histogram({
  name: "cloudops360_http_response_time_seconds",
  help: "HTTP response time in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.05, 0.1, 0.25, 0.5, 1, 2, 5],
});

register.registerMetric(httpRequests);
register.registerMetric(httpResponseTime);

function prometheusMetrics(req, res, next) {
  register
    .metrics()
    .then((metrics) => {
      res.set("Content-Type", register.contentType);
      res.send(metrics);
    })
    .catch(next);
}

module.exports = {
  register,
  httpRequests,
  httpResponseTime,
  prometheusMetrics,
};