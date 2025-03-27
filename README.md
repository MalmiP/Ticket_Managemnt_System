# Real-Time Event Ticketing System

## Introduction
This project is a **Real-Time Event Ticketing System** that handles concurrent ticket releases and purchases using **Java for CLI, React for the frontend, and Spring Boot for the backend**. It employs the **Producer-Consumer pattern** to simulate dynamic ticketing operations while ensuring data integrity through multi-threading and synchronization.

## Features
- **Concurrency handling** with multiple producers (vendors) and consumers (customers).
- **Data integrity** in a multi-threaded environment.
- **Basic reporting** to track ticket sales and availability.
- **Configurable system parameters** for customization.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Spring Boot (Java)
- **Command-Line Interface (CLI):** Java (for ticket operations)

## System Components

### 1. System Initialization and Configuration
The system allows users to configure the following parameters:
- **Total Number of Tickets**
- **Ticket Release Rate**
- **Customer Retrieval Rate**
- **Maximum Ticket Capacity**

#### CLI Configuration
- Users input system settings via the command line.
- The system validates and saves these settings for use during execution.

### 2. Ticket Vendor (Producer)
- Simulates multiple vendors releasing tickets concurrently.
- Implemented using Java's **Runnable Interface** and multi-threading.
- Uses synchronized methods to ensure thread safety when adding tickets.

### 3. Customer (Consumer)
- Simulates multiple customers purchasing tickets in real-time.
- Uses Java multi-threading to create concurrent customer threads.
- Ensures thread safety while removing tickets.

### 4. Ticket Management
- Implements a **shared ticket pool**.
- Uses thread-safe data structures:
  - `Vector`
  - `Collections.synchronizedList`
- Provides methods for:
  - `addTickets()`: Used by vendors.
  - `removeTicket()`: Used by customers.

### 5. Logging and Error Handling
- **Logging:**
  - Console logs for tracking ticket operations.
  - Optionally, logs can be saved to a file.
- **Error Handling:**
  - Try-catch blocks to handle exceptions gracefully.
  - User-friendly messages for invalid operations.

### 6. User Interface
- **CLI:** Java-based interface for configuring and managing the system.
- **Frontend (React):** Displays:
  - Ticket availability.
  - Configuration settings.
  - System controls (Start/Stop).

## Installation & Setup

### Prerequisites
- **Java 17+**
- **Spring Boot 3+**
- **React.js 18+**
- **Maven** (for backend dependency management)
- **Node.js 18+** (for frontend setup)

### Backend Setup (Spring Boot)
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/real-time-ticketing.git
   cd real-time-ticketing/backend
