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

🔗 **Public Access:** http://13.207.149.114/

</td>

</tr>
</table>

<br>

<img src="https://img.shields.io/badge/Infrastructure-AWS%20EC2-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/Containerized-Docker%20Compose-blue?style=for-the-badge&logo=docker" />
<img src="https://img.shields.io/badge/CI%2FCD-Fully%20Automated-success?style=for-the-badge" />

</div>

<hr />

## 🧠 Overview

**NexusCart** is a `production-grade E-Commerce & Asynchronous Task Platform` built using `Python 3.11+`, `Django`, `Django REST Framework (DRF)`, and a scalable asynchronous task orchestration layout. 

The platform features a specialized **Dual-Portal Architecture** segregating workflows for **Sellers** and **Customers** under a unified headless backend. Independent merchants can securely onboard to manage isolated product storefronts and fulfill multi-customer orders, while buyers interact with a consolidated multi-vendor marketplace catalog.

The platform demonstrates how enterprise-level web applications are optimized, secured, containerized, and automatically deployed onto cloud infrastructure using modern DevOps workflows.

It simulates a real-world, high-traffic retail backend ecosystem by implementing:

- 👥 **Dual-Role Registration Gateways:** Distinct authentication flows tailored dynamically for `Sellers` and `Customers`.
- 🔐 Secure authentication & authorization using `JWT Authentication` and Role-Based Access Control (RBAC).
- 🔌 Headless, resource-oriented RESTful web services via `Django REST Framework (DRF)`.
- 🍽️ Granular Product, Category, and Multi-Vendor Order lifecycle schemas.
- 💳 Secure online payment processing integrated via `Razorpay Webhooks`.
- ⚡ Asynchronous task distribution & background processing using `Celery`.
- 📢 Message brokerage and event orchestration using `RabbitMQ`.
- 🚀 Distributed read-heavy dataset caching using `Redis`.
- 🐳 Isolated container infrastructure using `Docker` & `Docker Compose`.
- ☁️ Production architecture deployment on an `AWS EC2` instance.
- 🔄 Automated continuous integration and delivery using `GitHub Actions CI/CD`.
- 🌍 Reverse proxy, static asset serving, and secure request routing via `Nginx`.

### 🎯 Key Highlights

- ✅ Clean separation of concerns with a decoupled Full-Stack layout
- ✅ Non-blocking HTTP request processing loop via worker offloading
- ✅ Optimized database layer utilizing localized key-value cache networks
- ✅ Automated `Lint → Test → Build → Deploy` GitHub Actions pipelines
- ✅ Resilient handling of high-priority third-party payment responses

### 👨‍💻 Platform User Workflows

#### **As a Seller:**
- 👤 Register a dedicated merchant account via the Seller Signup flow.
- 🏷️ Gain full ownership of an isolated inventory catalogue to **Create, Read, Update, and Delete (CRUD)** custom products.
- 📋 Access a real-time order fulfillment pipeline listing items purchased specifically from their store by various marketplace customers.

#### **As a Customer:**
- 👤 Register via the Customer Signup flow to access the consumer marketplace.
- 🌐 Browse a consolidated global home page compiling product listings from **all active merchants** across the platform.
- 🛒 Add products from multiple sellers to a secure, persistent shopping cart.
- 💳 Execute mock checkouts utilizing live-responsive Razorpay client gateways.
- 📦 Access a dedicated "My Orders" history page compiling all historically purchased orders.

<hr />

## 🏗️ Architecture

![Architecture](./NexusCart-Architecture.png)

<hr />

## 🏗️ CI/CD Pipeline Flow

![CI/CD Flow Diagram](./NexusCart-CiCdFlow.png)

<hr />

## 🏗️ Request and Order Processing Flow

![Request Flow Diagram](./NexusCart-RequestFlow.png)

<hr />

## ⚙️ Tech Stack

### 🧩 Core Technologies

![Python](https://img.shields.io/badge/Python-3.11+-blue?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-4.2+-092E20?style=for-the-badge&logo=django&logoColor=white)
![DRF](https://img.shields.io/badge/Django_REST_Framework-DRF-red?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-JWT%20%7C%20RBAC-blue?style=for-the-badge)

<hr />

### 💾 Data & Caching

![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?style=for-the-badge&logo=postgresql)
![Redis](https://img.shields.io/badge/Cache-Redis-red?style=for-the-badge&logo=redis)

<hr />

### 🔄 Messaging & Async Processing

![Celery](https://img.shields.io/badge/Task_Queue-Celery-green?style=for-the-badge&logo=celery)
![RabbitMQ](https://img.shields.io/badge/Messaging-RabbitMQ-orange?style=for-the-badge&logo=rabbitmq)

<hr />

### 🐳 DevOps & Deployment

![Container](https://img.shields.io/badge/Container-Docker-blue?style=for-the-badge&logo=docker)
![Orchestration](https://img.shields.io/badge/Orchestration-Docker%20Compose-2496ED?style=for-the-badge&logo=docker)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions)

![Cloud](https://img.shields.io/badge/Cloud-AWS%20EC2-FF9900?style=for-the-badge&logo=amazonaws)
![Reverse Proxy](https://img.shields.io/badge/Reverse%20Proxy-NGINX-009639?style=for-the-badge&logo=nginx)
![SSL](https://img.shields.io/badge/SSL-Let's%20Encrypt-brightgreen?style=for-the-badge&logo=letsencrypt)

<hr />

### 🎨 Frontend & Payments

![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)
![Razorpay](https://img.shields.io/badge/Payments-Razorpay-blue?style=for-the-badge)

<hr />

## 🔑 Core Features

### 👤 Authentication & Session Controls
- Separate user registration flows for Sellers and Customers with custom metadata mapping.
- Cookie-based session login workflows, standard logout mechanics, and explicit route blocking using Role-Based Access Control (RBAC).

### 🛍️ Marketplace Catalog & Merchant Management
- Multi-seller product environment allowing automated aggregation of independent merchant catalogs on the central landing page.
- Isolated seller controls protecting listings so only the authorized creator can execute updates or removals (`/api/products/{id}/manage`).

### 🛒 High-Throughput Basket Management
- Redis-backed and database-persisted session states preserving active user baskets across devices.
- Real-time basket mutation controllers processing product increments, absolute quantity alterations, or item flushes.

### 📦 Multi-Vendor Transaction & Fulfillment Mesh
- Customers can dispatch checkout requests to consolidate multi-merchant selections into unique personal tracking orders (`/api/orders/`).
- Real-time order routing arrays separating incoming purchases so individual merchants see only line-items belonging to their catalog (`/api/seller/orders/`).

### 💳 Payment Pipeline & Webhook Safety
- End-to-end checkout synchronization via the Razorpay gateway pipeline.
- Secure background validation engines verifying payment verification signals away from the main server routing threads.

<hr />

## 🔄 Asynchronous Order Task Flow

```text
🛒 Order Submitted (Client → Nginx Proxy → Django REST Framework API)
        │
        ▼
📦 Django Application Layer
- Validates structural input data fields
- Commits localized order record as (PENDING)
- Dispatches asynchronous execution payload to broker
        │
        ▼
📢 Message Broker (RabbitMQ)
        │
        ├──────────────► ⚙️ Celery Async Worker Queue
        │                - Picks up background validation context
        │                - Offloads long-running execution sequences from main loop
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
    → Splits visibility profiles across Customer History and Seller Fulfillment Views

        ▼
📡 Instant Synchronized Output to Client View Layer