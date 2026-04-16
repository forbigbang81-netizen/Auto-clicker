package com.example.tinytask

import android.app.Service
import android.content.Intent
import android.graphics.PixelFormat
import android.os.IBinder
import android.view.Gravity
import android.view.WindowManager
import android.widget.Button

class OverlayService : Service() {
    private lateinit var windowManager: WindowManager
    private var floatingButton: Button? = null

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onCreate() {
        super.onCreate()
        windowManager = getSystemService(WINDOW_SERVICE) as WindowManager

        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
            PixelFormat.TRANSLUCENT
        ).apply {
            gravity = Gravity.CENTER
        }

        floatingButton = Button(this).apply {
            text = "Play Macro"
            setOnClickListener {
                // This would trigger the TaskEngine to start clicking
                // defined coordinates
            }
        }

        windowManager.addView(floatingButton, params)
    }

    override fun onDestroy() {
        super.onDestroy()
        if (floatingButton != null) windowManager.removeView(floatingButton)
    }
}
