<?php
session_start();
date_default_timezone_set('Asia/Kolkata');

$current_date = date('d-m-Y');
$current_time = date('h:i:s A');
$current_day  = date('l');

// Action 1: Handle Logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    $user_name = isset($_SESSION['name']) ? htmlspecialchars($_SESSION['name']) : 'User';
    $start_time = isset($_SESSION['start_time']) ? $_SESSION['start_time'] : time();
    $end_time = time();
    $duration_seconds = max(0, $end_time - $start_time);

    if ($duration_seconds < 60) {
        $duration_text = $duration_seconds . " second" . ($duration_seconds !== 1 ? "s" : "");
    } else {
        $mins = floor($duration_seconds / 60);
        $secs = $duration_seconds % 60;
        $duration_text = "{$mins} min " . ($secs > 0 ? "{$secs} sec" : "");
    }

    // Terminate session
    $_SESSION = array();
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
    }
    session_destroy();
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Logout - Thank You</title>
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <div class="app-card">
            <header class="app-header">
                <span class="badge-tag" style="background: #ecfdf5; color: #059669;">Session Terminated</span>
                <h1>Thank You, <?php echo $user_name; ?>!</h1>
                <p>You have been successfully logged out.</p>
            </header>

            <div class="duration-box">
                <span style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Duration of Usage</span>
                <div class="duration-number"><?php echo $duration_text; ?></div>
                <span style="font-size: 0.85rem; opacity: 0.85;">(Total: <?php echo $duration_seconds; ?> seconds)</span>
            </div>

            <div class="info-panel">
                <span class="info-title">Current PHP System Information</span>
                <div class="info-grid">
                    <div class="info-tile">
                        <span class="label">Date</span>
                        <span class="value"><?php echo $current_date; ?></span>
                    </div>
                    <div class="info-tile">
                        <span class="label">Time</span>
                        <span class="value"><?php echo $current_time; ?></span>
                    </div>
                    <div class="info-tile">
                        <span class="label">Day</span>
                        <span class="value"><?php echo $current_day; ?></span>
                    </div>
                </div>
            </div>

            <a href="index.php" class="btn btn-primary">Start New Session</a>
        </div>
    </body>
    </html>
    <?php
    exit();
}

// Action 2: Handle Form Submission (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $age = isset($_POST['age']) ? intval($_POST['age']) : 0;
    $sanitized_name = htmlspecialchars($name);

    // Age validation check
    if ($age < 18) {
        // Less than 18: Access Denied
        ?>
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Access Denied</title>
            <link rel="stylesheet" href="css/style.css">
        </head>
        <body>
            <div class="app-card">
                <header class="app-header">
                    <span class="badge-tag" style="background: #fef2f2; color: #ef4444;">Access Denied</span>
                    <h1>Authorization Status</h1>
                </header>

                <div class="alert-box alert-danger">
                    <div class="alert-icon">&#9940;</div>
                    <h2>Hello <?php echo $sanitized_name; ?>, you are not authorized to visit the site</h2>
                    <p style="margin-top: 8px; font-size: 0.95rem; opacity: 0.9;">
                        Age entered: <strong><?php echo $age; ?></strong>. Visitors must be 18 years or older.
                    </p>
                </div>

                <div class="info-panel">
                    <span class="info-title">Current PHP System Information</span>
                    <div class="info-grid">
                        <div class="info-tile">
                            <span class="label">Date</span>
                            <span class="value"><?php echo $current_date; ?></span>
                        </div>
                        <div class="info-tile">
                            <span class="label">Time</span>
                            <span class="value"><?php echo $current_time; ?></span>
                        </div>
                        <div class="info-tile">
                            <span class="label">Day</span>
                            <span class="value"><?php echo $current_day; ?></span>
                        </div>
                    </div>
                </div>

                <a href="index.php" class="btn btn-secondary">&larr; Back to Form</a>
            </div>
        </body>
        </html>
        <?php
        exit();
    } else {
        // 18 or older: Authorized! Start session
        $_SESSION['name'] = $sanitized_name;
        $_SESSION['start_time'] = time();
        $_SESSION['start_time_str'] = date('h:i:s A');
    }
}

// Action 3: Display Active Session / Hello Page (if session is active)
if (isset($_SESSION['name'])) {
    $user_name = $_SESSION['name'];
    $start_time = $_SESSION['start_time_str'] ?? date('h:i:s A');
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome - Hello <?php echo $user_name; ?></title>
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <!-- Start time at the right top corner of the page -->
        <div class="top-right-corner">
            <span class="indicator"></span>
            <span>Start Time: <strong><?php echo $start_time; ?></strong></span>
        </div>

        <div class="app-card">
            <header class="app-header">
                <span class="badge-tag">Session Active</span>
                <h1>Hello, <?php echo $user_name; ?>!</h1>
            </header>

            <div class="alert-box alert-success">
                <div class="alert-icon">&#10004;</div>
                <h2>Welcome to this site</h2>
                <p style="margin-top: 8px; font-size: 0.95rem; opacity: 0.9;">
                    Your age has been verified and your active session has begun.
                </p>
            </div>

            <div class="info-panel">
                <span class="info-title">Current PHP System Information</span>
                <div class="info-grid">
                    <div class="info-tile">
                        <span class="label">Date</span>
                        <span class="value"><?php echo $current_date; ?></span>
                    </div>
                    <div class="info-tile">
                        <span class="label">Time</span>
                        <span class="value"><?php echo $current_time; ?></span>
                    </div>
                    <div class="info-tile">
                        <span class="label">Day</span>
                        <span class="value"><?php echo $current_day; ?></span>
                    </div>
                </div>
            </div>

            <a href="index.php?action=logout" class="btn btn-danger">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/></svg>
                Logout
            </a>
        </div>
    </body>
    </html>
    <?php
    exit();
}

// Action 4: Display Initial Input Form (when no session is active)
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lab 10 - Web Application</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <div class="app-card">
        <header class="app-header">
            <span class="badge-tag">Experiment 10</span>
            <h1>Web Application</h1>
            <p>Please enter your name and age to enter the site.</p>
        </header>

        <form action="index.php" method="POST">
            <div class="form-group">
                <label for="name">Your Name</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    class="form-input" 
                    placeholder="e.g. John Doe" 
                    required 
                    autocomplete="name"
                    autofocus
                >
            </div>

            <div class="form-group">
                <label for="age">Your Age</label>
                <input 
                    type="number" 
                    id="age" 
                    name="age" 
                    class="form-input" 
                    placeholder="e.g. 19" 
                    min="1" 
                    max="120" 
                    required
                >
            </div>

            <button type="submit" class="btn btn-primary">
                Submit &rarr;
            </button>
        </form>
    </div>

</body>
</html>
