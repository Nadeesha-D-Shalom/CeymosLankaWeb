<?php
// Lightweight image utilities: convert images to WebP using GD

function convert_image_to_webp($srcPath, $destPath = null, $quality = 80) {
    if (!file_exists($srcPath)) return false;

    $info = getimagesize($srcPath);
    if (!$info) return false;

    $mime = $info['mime'] ?? '';
    $image = null;

    switch ($mime) {
        case 'image/jpeg':
            $image = imagecreatefromjpeg($srcPath);
            break;
        case 'image/png':
            $image = imagecreatefrompng($srcPath);
            // preserve transparency
            imagepalettetotruecolor($image);
            imagealphablending($image, true);
            imagesavealpha($image, true);
            break;
        case 'image/webp':
            // already webp, optionally copy
            if ($destPath && $destPath !== $srcPath) {
                return copy($srcPath, $destPath) ? $destPath : false;
            }
            return $srcPath;
        default:
            return false;
    }

    if (!$image) return false;

    if ($destPath === null) {
        $destPath = preg_replace('/\.[^.]+$/', '.webp', $srcPath);
    }

    $ok = imagewebp($image, $destPath, $quality);
    imagedestroy($image);

    return $ok ? $destPath : false;
}

function make_unique_webp_name($prefix = '', $dir = '', $baseName = '') {
    $name = $prefix . uniqid('_', true);
    return $name . '.webp';
}

?>