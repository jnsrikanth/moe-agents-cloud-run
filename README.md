# MoE (Mixture of Experts) Agent System - Cloud Run Ready

This repository contains a production-ready implementation of a Mixture of Experts (MoE) agent system, designed for easy deployment to Google Cloud Run.

## Project Structure

```
raw-agent-moe-app/
├── raw-agent-code/           # Python agent implementations
│   ├── moe_router/          # MoE Router orchestrator
│   ├── credit_agent/        # Credit evaluation agent
│   ├── fraud_agent/         # Fraud detection agent
│   ├── esg_agent/          # ESG analysis agent
│   ├── requirements.txt     # Python dependencies
│   └── Dockerfile          # Docker config for agents
│
├── web/                     # NextJS frontend application
│   ├── app/                # NextJS app directory
│   ├── components/         # React components
│   ├── lib/                # Utility libraries
│   ├── public/            # Static assets
│   ├── package.json       # Node dependencies
│   ├── next.config.js     # NextJS configuration
│   └── Dockerfile         # Docker config for web
│
├── deployment/             # Deployment configurations
│   ├── cloudbuild.yaml    # Cloud Build configuration
│   ├── agents/            # Agent-specific Cloud Run configs
│   └── web/               # Web-specific Cloud Run configs
│
└── docs/                   # Documentation
    ├── ARCHITECTURE.md
    ├── DEPLOYMENT.md
    └── API.md
```

## Quick Start

### Local Development

1. **Python Agents**:
```bash
cd raw-agent-code
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m moe_router.main
```

2. **Web Frontend**:
```bash
cd web
npm install
npm run dev
```

### Cloud Run Deployment

#### One-Command Deploy (All Services)
```bash
./deploy.sh --project YOUR_PROJECT_ID --region us-central1
```

#### Individual Service Deployment

**Deploy Agents**:
```bash
cd raw-agent-code
gcloud run deploy moe-agents \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

**Deploy Web Frontend**:
```bash
cd web
gcloud run deploy moe-web \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Architecture

The system consists of:

1. **MoE Router**: Intelligent request routing based on agent capabilities
2. **Specialized Agents**:
   - Credit Agent: Credit risk evaluation
   - Fraud Agent: Transaction fraud detection
   - ESG Agent: Environmental, Social, and Governance analysis
3. **Web Frontend**: Modern NextJS interface for interacting with agents

## Features

- ✅ Production-ready Python agents
- ✅ Async/await support with FastAPI
- ✅ Container-optimized for Cloud Run
- ✅ Auto-scaling capabilities
- ✅ Modern React/NextJS frontend
- ✅ WebSocket support for real-time updates
- ✅ Comprehensive error handling
- ✅ Structured logging
- ✅ Health check endpoints

## Environment Variables

### Agent Services
- `PORT`: Service port (default: 8080)
- `VERTEX_AI_PROJECT`: GCP project for Vertex AI
- `VERTEX_AI_LOCATION`: Vertex AI region
- `LOG_LEVEL`: Logging level (INFO/DEBUG/ERROR)

### Web Frontend
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXT_PUBLIC_WS_URL`: WebSocket URL

## License

MIT
