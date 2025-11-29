<?php
function detectSpam($name, $email, $subject, $message) {
    $badPatterns = [
        "/free money/i",
        "/crypto/i",
        "/viagra/i",
        "/porn/i",
        "/http:/i",
        "/https:/i"
    ];
    
    foreach ($badPatterns as $p) {
        if (preg_match($p, $name) ||
            preg_match($p, $email) ||
            preg_match($p, $subject) ||
            preg_match($p, $message)) 
        {
            return "spam";
        }
    }

    /* Weird name (aaa, asd, qwerty...) */
    if (preg_match("/^(a+|asd+|qwerty+)$/i", $name)) {
        return "spam";
    }

    return "inbox";
}
?>
