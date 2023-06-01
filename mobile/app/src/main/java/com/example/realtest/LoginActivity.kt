package com.example.realtest

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import okhttp3.*
import okhttp3.JavaNetCookieJar
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import org.json.JSONObject
import java.io.IOException
import java.net.CookieManager
import java.net.CookiePolicy

class LoginActivity : AppCompatActivity() {
    fun onBackButtonClick(view: View?) {
        finish()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val usernameEditText = findViewById<EditText>(R.id.usernameEditText)
        val passwordEditText = findViewById<EditText>(R.id.passwordEditText)
        val loginButton = findViewById<Button>(R.id.loginButton)

        val cookieManager = CookieManager().apply {
            setCookiePolicy(CookiePolicy.ACCEPT_ALL)
        }

        loginButton.setOnClickListener {
            val username = usernameEditText.text.toString()
            val password = passwordEditText.text.toString()

            val client = OkHttpClient.Builder()
                .cookieJar(JavaNetCookieJar(cookieManager))
                .build()

            val requestBody = JSONObject().apply {
                put("login", username)
                put("password", password)
            }

            val mediaType = "application/json".toMediaTypeOrNull()
            val request = Request.Builder()
                .url("http://192.168.0.104:8000/user/login")
                .post(RequestBody.create(mediaType, requestBody.toString()))
                .build()

            client.newCall(request).enqueue(object : Callback {
                override fun onFailure(call: Call, e: IOException) {
                    println("========================Request failed: ${e.message}")
                }

                override fun onResponse(call: Call, response: Response) {
                    val responseBody = response.body?.string()
                    if (response.isSuccessful && responseBody != null) {
                        println("========================Request successful")

                        val cookieJar = client.cookieJar

                        if (cookieJar is CookieJar) {
                            val cookies = cookieJar.loadForRequest(request.url)

                            if (!cookies.isNullOrEmpty()) {
                                for (cookie in cookies) {
                                    println("Cookie: ${cookie.name}=${cookie.value}")
                                }
                            } else {
                                println("No cookies found")
                            }
                        } else {
                            println("No cookie jar found")
                        }

                        val intent = Intent(this@LoginActivity, MainActivity::class.java)
                        startActivity(intent)
                        finish()
                    } else {
                        println("========================Request failed")
                    }
                }
            })

        }
    }
}