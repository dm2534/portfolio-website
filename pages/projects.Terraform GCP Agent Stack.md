# Terraform GCP Agent Stack

## Meta
- status: live
- category: Infrastructure & DevOps
- stack: Terraform, GCP, Cloud Run, Vertex AI, Secret Manager, VPC, GitHub Actions
- github: https://github.com/dnm54/terraform-gcp-agent-stack
- demo: null
- highlight: Reusable IaC module · Least-privilege IAM · One-command agent deployment

## Summary
A reusable, parameterised Terraform module that provisions a complete GCP infrastructure stack for deploying AI agents. One command gives you a Cloud Run service, Vertex AI endpoint, Secret Manager secrets, VPC with Private Service Access, Cloud NAT, and least-privilege IAM bindings — everything an enterprise AI deployment needs, reproduced consistently across environments.

## Problem
Every AI agent POC I delivered at DataPiper started with the same manual GCP setup — creating service accounts, wiring up Secret Manager, configuring VPC networking for Vertex AI private endpoints. That setup took hours, was error-prone, and produced environments that drifted from each other over time. Infrastructure should be code.

## Solution
A modular Terraform codebase with five submodules (networking, IAM, secrets, Vertex AI, Cloud Run) wired together at the root level. Pass in a project ID, region, agent name, and container image URI — everything else is handled. Built to be reused across projects with minimal variable changes.

## Module Structure
- `modules/networking` — VPC, subnet, Private Service Access, Cloud NAT, firewall rules
- `modules/iam` — dedicated service account with scoped roles (aiplatform.user, secretmanager.secretAccessor, logging.logWriter)
- `modules/secrets` — Secret Manager resources for API keys, lifecycle protection enabled
- `modules/vertex_ai` — Vertex AI endpoint with private networking and access logging
- `modules/cloud_run` — Cloud Run service with internal ingress, secret mounting, VPC connector

## Key Features
- Single root module call deploys the full stack — 12 GCP resources
- Least-privilege IAM by design — no Editor or Owner roles anywhere, documented in README
- Secrets provisioned as empty resources — values set out-of-band, never in Terraform state
- All resources labelled with managed-by, environment, and agent-name for governance
- GitHub Actions workflow runs terraform fmt, init, and validate on every PR
- Example usage in examples/basic_agent for quick onboarding

## Technical Details
- **Terraform version:** >= 1.6.0
- **Google provider:** ~> 5.0
- **Networking:** Custom VPC with Private Service Access peering for Vertex AI, Cloud NAT for private Cloud Run egress
- **Cloud Run config:** min_instances=1 (no cold starts), internal-and-cloud-load-balancing ingress, secrets mounted as env vars via secretKeyRef
- **Vertex AI:** Endpoint resource only — model deployment left to application CI/CD
- **CI:** GitHub Actions on PR — fmt check, init, validate

## Usage
```hcl
module "agent_stack" {
  source = "github.com/dnm54/terraform-gcp-agent-stack"

  project_id  = "my-gcp-project"
  region      = "us-central1"
  agent_name  = "news-analyst"
  environment = "dev"
  image_uri   = "gcr.io/my-gcp-project/news-agent:latest"
}
```

## What I learned
Writing reusable Terraform forces a level of discipline that single-use scripts don't — every hardcoded value becomes a variable, every assumption becomes a documented input. The biggest architectural decision was keeping the Vertex AI module as an endpoint-only resource rather than bundling model deployment, which keeps the module infrastructure-scoped and lets the application team own the model lifecycle separately.

## Status
Live on GitHub. Used as the base infrastructure for all personal GCP agent projects. Planning to publish to the Terraform Registry.