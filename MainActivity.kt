// Check for the "Display Over Apps" permission
if (!Settings.canDrawOverlays(this)) {
    val intent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION)
    startActivityForResult(intent, 123)
}

// Start the floating button
val intent = Intent(this, OverlayService::class.java)
startService(intent)
