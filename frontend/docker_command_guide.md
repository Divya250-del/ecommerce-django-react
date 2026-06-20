# The Full-Stack Engineer's Practical Guide to Docker & Compose
A hand-picked reference guide covering the essential commands required to manage, debug, and orchestrate containerized applications.

---

## 🎼 1. Docker Compose Commands (Multi-Container Orchestration)
Docker Compose is used to manage your entire stack (`db`, `backend`, `frontend`) simultaneously using the configurations defined in your `docker-compose.yml` file. **Always run these commands from your root project directory (`EcommerceProjects`)**.

### 🚀 Starting the Stack

* `docker-compose up`
    * **What it does:** Boots up all containers defined in your file and streams their logs directly to your terminal.
* `docker-compose up --build`
    * **What it does:** Tells Docker to check for any code or configuration changes, rebuild the container images if changes are found, and then boot the stack.
* `docker-compose up -d`
    * **What it does:** Runs the containers in **Detached Mode** (in the background). This frees up your terminal window and keeps the app running even if you close the terminal. *(Crucial for AWS deployment).*

### 🛑 Stopping the Stack

* `docker-compose down`
    * **What it does:** Safely stops all running containers and destroys the internal virtual network. **Note:** Your data is completely safe; it does *not* erase your registered database volumes.
* `docker-compose down --rmi all`
    * **What it does:** Stops the containers and completely deletes the compiled images from your hard drive. Excellent for doing a complete "hard reset" of your environment.

### 🛠️ Execution & Management

* `docker-compose exec <service_name> <command>`
    * **What it does:** Enters an already running, active container and executes a command inside it.
    * *Example:* `docker-compose exec backend python manage.py migrate`
* `docker-compose ps`
    * **What it does:** Lists all containers managed by your compose file along with their current operational state (Up, Exited) and port mappings.
* `docker-compose logs -f <service_name>`
    * **What it does:** Streams live, real-time error and system logs for a specific service.
    * *Example:* `docker-compose logs -f backend`

---

## 🐋 2. Core Docker Engine Commands (Single Image/Container Context)
These commands are built into the primary Docker engine and are used to audit the overall state of Docker on your operating system.

### 🖥️ Managing Containers (The Living Processes)

* `docker ps`
    * **What it does:** Shows every single container running globally on your machine across all active projects.
* `docker ps -a`
    * **What it does:** Shows *all* containers on your machine, including stopped, crashed, or exited containers. Essential for tracking down why a backend failed to boot.
* `docker stop <container_id>`
    * **What it does:** Sends a graceful stop request to an individual container.
* `docker rm <container_id>`
    * **What it does:** Permanently deletes a stopped container process from your system disk.

### 📦 Managing Images (The Blueprints)

* `docker images`
    * **What it does:** Lists every compiled blueprint/image currently downloaded or built on your laptop. Shows their total size on disk.
* `docker rmi <image_id>`
    * **What it does:** Deletes a specific image from your computer to free up storage space.

---

## 🗄️ 3. Volume & System Maintenance (The Cleanup)

* `docker volume ls`
    * **What it does:** Lists all persistent storage drives (like your `postgres_data` and `django_media` volumes).
* `docker volume rm <volume_name>`
    * **What it does:** Permanently wipes out a volume and all data inside it. *(Warning: Running this on your database volume will erase your stored users and products!)*
* `docker system prune -a --volumes`
    * **What it does:** The ultimate nuclear option. It deletes every stopped container, unused image, cached build layer, and unattached volume on your machine, freeing up gigabytes of disk space.

---

## 🧠 Interview Concept Cheat Sheet

* **Image vs. Container:** An **Image** is a read-only blueprint package (like an uninstalled `.exe` file or a recipe). A **Container** is a live, running instance of that image executing in an isolated memory space (like an active running application or the cooked meal).
* **Bind Mount vs. Named Volume:** A **Bind Mount** maps a specific folder on your local laptop directly into the container (great for editing code in real time). A **Named Volume** is an isolated virtual hard drive managed completely by Docker's native Linux layer (great for data security and avoiding cross-platform permission errors).