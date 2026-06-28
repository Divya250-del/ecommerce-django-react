# 🚀 NexusCart – Asynchronous E-Commerce & Task Processing Platform

# 🌐 Live Deployment

<div align="left">

<table>
<tr>

<td align="left" width="100%">

### ⚡ Live Full-Stack Application (Frontend & Backend Engine)

<a href="http://13.207.149.114/">
  <img src="https://img.shields.io/badge/AWS%20EC2-Live%20Deployment-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" />
</a>

<br><br>

🔗 **Public Address:** http://13.207.149.114/

</td>

</tr>
</table>

<br>

<img src="https://img.shields.io/badge/Infrastructure-AWS%20EC2-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/Containerized-Docker%20Compose-blue?style=for-the-badge&logo=docker" />
<img src="https://img.shields.io/badge/CI%2FCD-Fully%20Automated-success?style=for-the-badge" />

</div>

---

## 🧠 Overview

**NexusCart** is a `production-grade E-Commerce & Asynchronous Task Platform` built using `Python 3.11+`, `Django`, `Django REST Framework (DRF)`, and a scalable asynchronous task orchestration layout.

The platform demonstrates how enterprise-level web applications are optimized, secured, containerized, and automatically deployed onto cloud infrastructure using modern DevOps workflows.

It simulates a real-world, high-traffic retail backend ecosystem by implementing:

- 🔐 Secure authentication & authorization using `JWT Authentication` and Role-Based Access Control (RBAC)
- 🔌 Headless, resource-oriented RESTful web services via `Django REST Framework (DRF)`
- 🍽️ Granular Product, Inventory, and Order lifecycle schemas
- 💳 Secure online payment processing integrated via `Razorpay Webhooks`
- ⚡ Asynchronous task distribution & background processing using `Celery`
- 📢 Message brokerage and event orchestration using `RabbitMQ`
- 🚀 Distributed read-heavy dataset caching using `Redis`
- 🐳 Isolated container infrastructure using `Docker` & `Docker Compose`
- ☁️ Production architecture deployment on an `AWS EC2` instance
- 🔄 Automated continuous integration and delivery using `GitHub Actions CI/CD`
- 🌍 Reverse proxy, static asset serving, and secure request routing via `Nginx`

### 🎯 Key Highlights

- ✅ Clean separation of concerns with a decoupled Full-Stack layout
- ✅ Non-blocking HTTP request processing loop via worker offloading
- ✅ Optimized database layer utilizing localized key-value cache networks
- ✅ Automated `Lint → Test → Build → Deploy` GitHub Actions pipelines
- ✅ Resilient handling of high-priority third-party payment responses

### 👨‍💻 Users Can

- 👤 Register accounts and obtain rotating access permissions
- 🏷️ Browse paginated product listings, metadata categories, and inventory items
- 🛒 Add products to a secure, persistent shopping cart structure
- 📦 Submit transactions and trace real-time order states (Pending ➔ Confirmed ➔ Paid)
- 💳 Execute mock checkouts utilizing live-responsive Razorpay client gateways
- 📥 Download automatically compiled transactional histories and order invoices in PDF/XLS formats

---

## 🏗️ Architecture
![Architecture](./NexusCart-Architecture.png)

---

## 🏗️ CI/CD Pipeline Flow
![CI/CD Flow Diagram](./NexusCart-CiCdFlow.png)

---

## 🏗️ Request and Order Processing Flow
![Request Flow Diagram](./NexusCart-RequestFlow.png)

---

## ⚙️ Tech Stack

### 🧩 Core Technologies

![Python](https://img.shields.io/badge/Python-3.11+-blue?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-4.2+-092E20?style=for-the-badge&logo=django&logoColor=white)
![DRF](https://img.shields.io/badge/Django_REST_Framework-DRF-red?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-JWT%20%7C%20RBAC-blue?style=for-the-badge)

---

### 💾 Data & Caching

![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?style=for-the-badge&logo=postgresql)
![Redis](https://img.shields.io/badge/Cache-Redis-red?style=for-the-badge&logo=redis)

---

### 🔄 Messaging & Async Processing

![Celery](https://img.shields.io/badge/Task_Queue-Celery-green?style=for-the-badge&logo=celery)
![RabbitMQ](https://img.shields.io/badge/Messaging-RabbitMQ-orange?style=for-the-badge&logo=rabbitmq)

---

### 🐳 DevOps & Deployment

![Container](https://img.shields.io/badge/Container-Docker-blue?style=for-the-badge&logo=docker)
![Orchestration](https://img.shields.io/badge/Orchestration-Docker%20Compose-2496ED?style=for-the-badge&logo=docker)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions)

![Cloud](https://img.shields.io/badge/Cloud-AWS%20EC2-FF9900?style=for-the-badge&logo=amazonaws)
![Reverse Proxy](https://img.shields.io/badge/Reverse%20Proxy-NGINX-009639?style=for-the-badge&logo=nginx)
![SSL](https://img.shields.io/badge/SSL-Let's%20Encrypt-brightgreen?style=for-the-badge&logo=letsencrypt)

---

### 🎨 Frontend & Payments

![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)
![Razorpay](https://img.shields.io/badge/Payments-Razorpay-blue?style=for-the-badge)

---

## 🔑 Core Features

### 👤 Authentication & Authorization
- Token-based JWT authorization handling
- Strict Role-Based Access Control (RBAC) across administrative endpoints

### 🏷️ Inventory & Catalog Management
- Model definitions for complex multi-variant product relations
- Atomic database constraints enforcing inventory deductions on item selections

### 🛒 Persistent Shopping Carts
- Redis-backed and database-persisted session states preserving active user baskets
- Automatic pricing recalculations and cart mutation handling

### 📦 Decoupled Asynchronous Order System
- Non-blocking order capture mechanisms
- Event dispatch tasks handled out of line by secondary worker instances

### 💳 Payment Pipeline & Webhook Safety
- End-to-end checkout synchronization via the Razorpay gateway pipeline
- Secure custom webhook processing handling server-side transaction verifications

---

## 🔄 Asynchronous Order Task Flow

```text
🛒 Order Submitted (Client → Nginx Proxy → Django REST Framework API)
        │
        ▼
📦 Django Application Layer
- Validates structural fields & deducts inventory states
- Commits localized order record as (PENDING)
- Dispatches asynchronous execution payload to broker
        │
        ▼
📢 Message Broker (RabbitMQ)
        │
        ├──────────────► ⚙️ Celery Async Worker Queue
        │                - Picks up long-running execution context
        │                - Allocates processes to generate transactional invoices
        │
        └──────────────► 💳 Payment Gateway Engine (Razorpay)
                         - Registers external transaction identifiers
                         - Safely waits for payment validation callbacks

        ▼
⚙️ Background Workers (Consumer Pipeline)
- Listens to payment state changes:
    ✔ `payment_completed` (Webhook verification success)
    ✔ `payment_declined`  (Transaction termination)

- Executes internal routines:
    → Transitions state to PAID / FAILED
    → Flushes temporary caching keys in Redis
    → Automatically generates download materials (PDF history strings)

        ▼
📡 Instant Synchronized Output to Client View Layer