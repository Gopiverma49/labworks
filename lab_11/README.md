# Lab 11: Simple User Validation Web Application

A lightweight, self-contained **Single Web Application** implementing user authentication and database validation without PHP or external database server setup.

---

## Key Features

1. **Zero PHP & Zero External DB Engine**:
   - Runs directly in **any web browser** without installing PHP, Apache, MySQL, or Node.js.
   - Fully compatible with static web hosting (e.g. GitHub Pages).

2. **One Database Having Different Tables**:
   - Built with a client-side relational storage system (`UserValidationDB`):
     - **Table 1 (`users`)**: Stores `id`, `username`, `password`, `full_name`, `role_id`, and `email`.
     - **Table 2 (`roles`)**: Stores `id`, `role_name`, `access_level`, and `description`.
     - **Table 3 (`login_logs`)**: Records `id`, `username`, `timestamp`, and authentication `status`.

3. **Validation Workflow**:
   - **User Input**: Submits Login Name (`username`) & `password`.
   - **Database Check**: Queries the `users` table and joins with the `roles` table.
   - **Success Response**: Displays the **Successful Login Page** with matched profile, role badges, and access rights.
   - **Failure Response**: Displays the **Failure Message Page** alerting to invalid credentials with a *"Try Again"* option.

4. **Interactive Database Tables Viewer**:
   - Includes a dedicated tab to view all 3 tables (`users`, `roles`, and `login_logs`).
   - Allows dynamically inserting new records into the `users` table and immediately validating them.

---

## Pre-seeded Database Records

| Username | Password | Full Name | Role | Test Result |
| :--- | :--- | :--- | :--- | :--- |
| `admin` | `admin123` | System Administrator | Administrator | **Success (Match)** |
| `student` | `student123` | Demo Student | Student | **Success (Match)** |
| `john_doe` | `password123` | John Doe | Student | **Success (Match)** |
| `alice` | `secret456` | Prof. Alice Smith | Faculty | **Success (Match)** |
| *(Any incorrect)* | `badpass` | &mdash; | &mdash; | **Failure (Mismatch)** |

---

## How to Run

Simply **double-click** [index.html](file:///D:/jain/WEB%20PROGRAMMING/LAB_WORKS/lab_11/index.html) or [run_server.bat](file:///D:/jain/WEB%20PROGRAMMING/LAB_WORKS/lab_11/run_server.bat) in File Explorer to open it in your browser.
