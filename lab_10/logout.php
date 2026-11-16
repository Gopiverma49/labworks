<?php
session_start();
date_default_timezone_set('Asia/Kolkata');

// Retrieve name and start time from session
$user_name = isset($_SESSION['name']) ? htmlspecialchars($_SESSION['name']) : 'User';
$start_time = isset($_SESSION['start_time']) ? $_SESSION['start_time'] : time();
$end_time = time();

// Calculate duration of usage
$duration_seconds = max(0, $end_time - $start_time);

if ($duration_seconds < 60) {
    $duration_text = $duration_seconds . " second" . ($duration_seconds !== 1 ? "s" : "");
} else {
    $minutes = floor($duration_seconds / 60);
    $seconds = $duration_seconds % 60;
    $duration_text = "{$minutes} min " . ($seconds > 0 ? "{$seconds} sec" : "");
}

// Current Date, Time, and Day using PHP Script
$current_date = date('d-m-Y');
$current_time = date('h:i:s A');
$current_day  = date('l');

// Clear and destroy session
$_SESSION = array();
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
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
            <span class="badge-tag" style="background: #ecfdf5; color: #059669;">Session Ended</span>
            <!-- Thank You message -->
            <h1>Thank You, <?php echo $user_name; ?>!</h1>
            <p>You have been successfully logged out.</p>
        </header>

        <!-- Duration of usage display -->
        <div class="duration-box">
            <span style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Duration of Usage</span>
            <div class="duration-number"><?php echo $duration_text; ?></div>
            <span style="font-size: 0.85rem; opacity: 0.85;">(Total: <?php echo $duration_seconds; ?> seconds)</span>
        </div>

        <!-- Display current Date, Time and Day using PHP Script -->
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

        <a href="index.html" class="btn btn-primary">
            Start New Session
        </a>
    </div>

</body>
</html>
