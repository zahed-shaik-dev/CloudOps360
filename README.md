# CloudOps360

> Production-Grade Cloud-Native DevOps & SRE Platform

CloudOps360 is an end-to-end DevOps project demonstrating how a modern cloud-native application can be developed, containerized, secured, tested, provisioned, deployed, monitored, and continuously improved.

## Architecture

```text
Developer
    │
    ▼
GitHub
    │
    ▼
GitHub Actions
    │
    ├── Lint
    ├── Test
    ├── Security Scan
    └── Docker Build
            │
            ▼
    Container Registry
            │
            ▼
        Terraform
            │
            ▼
           AWS
            │
            ▼
      Kubernetes / EKS
            │
      ┌─────┴─────┐
      │           │
 Frontend      Backend
                  │
              PostgreSQL
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
  Prometheus    Loki    OpenTelemetry
       │          │          │
       └──────┬───┴──────────┘
              ▼
           Grafana
              │
              ▼
        Alertmanager
              │
              ▼
      AI Incident Assistant