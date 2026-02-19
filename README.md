# 🤖 Autonomous AI Social Media Manager

An asynchronous multi-agent AI system that detects trends, generates content using LLMs, and routes posts through a human approval workflow.

## 🚀 Features

- Trend → Strategy → Content → Image → Approval pipeline
- BullMQ + Redis async architecture
- Groq Llama 3 powered AI generation
- Human-in-the-loop approval dashboard (React)
- Dockerized Redis
- Real-time polling UI

## 🏗 Tech Stack

Backend:
- Node.js
- Express
- BullMQ
- Redis (Docker)
- Groq API (Llama 3)

Frontend:
- React (Vite)
- Axios

## 🔄 Architecture

Trend Worker → Strategy Agent → Content Agent → Image Worker → Approval Queue → Dashboard

## 📦 Setup

### Backend

cd backend
npm install

```bash
Create `.env`:
```
REDIS_HOST=127.0.0.1
REDIS_PORT=6380
GROQ_API_KEY=your_key_here

```bash

Start Redis:

```

docker start redis-ai

Run workers:

node src/server.js
node src/workers/strategy.worker.js
node src/workers/content.worker.js
node src/workers/image.worker.js
node src/workers/trend.worker.js

