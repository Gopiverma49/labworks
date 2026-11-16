<?php
session_start();
date_default_timezone_set('Asia/Kolkata');

// Retrieve name and age from request
$name = isset($_REQUEST['name']) ? trim($_REQUEST['name']) : '';
$age_input = isset($_REQUEST['age']) ? trim($_REQUEST['age']) : '';

// If accessed directly without data, check if an existing session is active
if ($name === '' && isset($_SESSION['name'])) {
    $name = $_SESSION['name'];
    $age = 18; // already validated in session
} elseif ($name === '' || !is_numeric($age_input)) {
    header('Location: index.html');
    exit();
} else {
    $age = intval($age_input);
}

$sanitized_name = htmlspecialchars($name);

// Date, Time, and Day using PHP Script
$current_date = date('d-m-Y');
$current_time = date('h:i:s A');
$current_day  = date('l');

// Check age authorization
if ($age < 18):
    // Age < 18: Send unauthorized page
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Access Denied - Lab 10</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <div class="app-card">
        <header class="app-header">
            <span class="badge-tag" style="background: #fef2f2; color: #ef4444;">Access Denied</span>
            <h1>Authorization Status</h1>
        </header>

        <!-- Required message: "Hello <name>, you are not authorized to visit the site" -->
        <div class="alert-box alert-danger">
            <div class="alert-icon">&#9940;</div>
            <h2>Hello <?php echo $sanitized_name; ?>, you are not authorized to visit the site</h2>
            <p style="margin-top: 8px; font-size: 0.95rem; opacity: 0.9;">
                Age entered: <strong><?php echo $age; ?></strong>. You must be at least 18 years old to access this site.
            </p>
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

        <a href="index.html" class="btn btn-secondary">
            &larr; Back to Form
        </a>
    </div>

</body>
</html>
<?php
    exit();
endif;

// Age >= 18: Authorized! Initialize / maintain session
$_SESSION['name'] = $sanitized_name;
if (!isset($_SESSION['start_time'])) {
    $_SESSION['start_time'] = time();
    $_SESSION['start_time_str'] = date('h:i:s A');
}

$start_time_display = $_SESSION['start_time_str'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome - Hello <?php echo $sanitized_name; ?></title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- Start time shown at the right top corner of the page -->
    <div class="top-right-corner" id="start-time-indicator">
        <span class="indicator"></span>
        <span>Start Time: <strong><?php echo $start_time_display; ?></strong></span>
    </div>

    <div class="app-card">
        <header class="app-header">
            <span class="badge-tag">Session Active</span>
            <!-- Required Welcome message and Hello page taking name from request -->
            <h1>Hello, <?php echo $sanitized_name; ?>!</h1>
        </header>

        <!-- Required "Welcome to this site" message -->
        <div class="alert-box alert-success">
            <div class="alert-icon">&#10004;</div>
            <h2>Welcome to this site</h2>
            <p style="margin-top: 8px; font-size: 0.95rem; opacity: 0.9;">
                Your age has been verified and your active session has begun.
            </p>
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

        <!-- Provides a logout button -->
        <form action="logout.php" method="POST">
            <button type="submit" class="btn btn-danger">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/></svg>
                Logout
            </button>
        </form>

        <div class="nav-footer">
            <a href="index.html" class="nav-link">&larr; Re-enter Name / Age</a>
        </div>
    </div>

</body>
</html>
