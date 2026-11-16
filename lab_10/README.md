# Lab 10: PHP Web Application

A unified web application implementing user input handling, age authorization, session tracking with duration calculation, and real-time Date/Time/Day reporting.

---

## Application Structure

All files reside directly under `lab_10/`:

- **[index.html](file:///D:/jain/WEB%20PROGRAMMING/LAB_WORKS/lab_10/index.html)**: The HTML entry form collecting `name` and `age`.
- **[hello.php](file:///D:/jain/WEB%20PROGRAMMING/LAB_WORKS/lab_10/hello.php)**: 
  - **Age < 18:** Displays `Hello <name>, you are not authorized to visit the site` alongside current Date, Time, and Day.
  - **Age >= 18:** Displays `Welcome to this site` and `Hello, <name>!`, starts a PHP session, shows the **Start Time at the right top corner**, displays current **Date, Time, and Day**, and provides a **Logout** button.
- **[logout.php](file:///D:/jain/WEB%20PROGRAMMING/LAB_WORKS/lab_10/logout.php)**:
  - Calculates the total duration of usage from the session.
  - Displays a personalized **Thank You, <name>!** message and usage duration.
  - Displays current **Date, Time, and Day** using PHP.
  - Terminates the session.
- **[css/style.css](file:///D:/jain/WEB%20PROGRAMMING/LAB_WORKS/lab_10/css/style.css)**: Modern styling with top-right corner indicator and responsive alert cards.
- **[run_server.bat](file:///D:/jain/WEB%20PROGRAMMING/LAB_WORKS/lab_10/run_server.bat)**: Double-click script to launch the local PHP development server.

---

## How to Run

1. Start the server (if not already running):
   ```bash
   php -S localhost:8000
   ```
   *(or double-click `run_server.bat`)*

2. Open in your browser:
   **[http://localhost:8000/lab_10/](http://localhost:8000/lab_10/)**
