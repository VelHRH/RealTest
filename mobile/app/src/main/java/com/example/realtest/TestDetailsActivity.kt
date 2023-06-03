package com.example.realtest

import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil.setContentView
import okhttp3.Call
import okhttp3.Callback
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import org.json.JSONException
import org.json.JSONObject
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale

class TestDetailsActivity : AppCompatActivity() {
    private lateinit var testNameTextView: TextView
    private lateinit var testCreatorTextView: TextView
    private lateinit var testStartTextView: TextView
    private lateinit var testEndTextView: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_test_details)

        testNameTextView = findViewById(R.id.testNameTextView)
        testCreatorTextView = findViewById(R.id.testCreatorTextView)
        testStartTextView = findViewById(R.id.testStartTextView)
        testEndTextView = findViewById(R.id.testEndTextView)
        val startButton = findViewById<Button>(R.id.startButton)

        val testId = intent.getStringExtra("testId")
        if (testId != null) {
            val testDetailsUrl = "http://192.168.0.104:8000/test/$testId"
            val request = Request.Builder()
                .url(testDetailsUrl)
                .build()

            val client = OkHttpClient()
            client.newCall(request).enqueue(object : Callback {
                override fun onFailure(call: Call, e: IOException) {
                    runOnUiThread {
                        println("Request failed")
                    }
                }

                override fun onResponse(call: Call, response: Response) {
                    val responseBody = response.body?.string()
                    if (response.isSuccessful && responseBody != null) {
                        val test = parseTestDetailsJson(responseBody)
                        runOnUiThread {
                            testNameTextView.text = test?.name
                            testCreatorTextView.text = test?.testCreator
                            testStartTextView.text = test?.testStart
                            testEndTextView.text = test?.testEnd

                            if (test?.testEnd?.length!! > 0) {
                                testStartTextView.visibility = View.VISIBLE
                                testEndTextView.visibility = View.VISIBLE
                                startButton.visibility = View.GONE
                            } else {
                                testStartTextView.visibility = View.GONE
                                testEndTextView.visibility = View.GONE
                                startButton.visibility = View.VISIBLE
                                startButton.setOnClickListener {
                                    val currentDateTime = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault()).format(
                                        Date()
                                    )
                                    val calendar = Calendar.getInstance()
                                    calendar.add(Calendar.DAY_OF_MONTH, 1)
                                    val nextDateTime = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault()).format(calendar.time)

                                    testStartTextView.text = currentDateTime
                                    testEndTextView.text = nextDateTime

                                    testStartTextView.visibility = View.VISIBLE
                                    testEndTextView.visibility = View.VISIBLE
                                    startButton.visibility = View.GONE
                                }
                            }
                        }
                    } else {
                        runOnUiThread {
                            println("Data get failed")
                        }
                    }
                }
            })
        } else {
            println("Test _id failed")
        }
    }

    fun onBackButtonClick(view: View?) {
        finish()
    }

    private fun parseTestDetailsJson(jsonString: String): Test? {
        try {
            val jsonTest = JSONObject(jsonString)
            return Test(
                jsonTest.getString("_id"),
                jsonTest.getString("purchaseId"),
                jsonTest.getString("productId"),
                jsonTest.getString("name"),
                jsonTest.getString("testCreator"),
                jsonTest.getString("reportingFrequency"),
                jsonTest.getInt("trackingRange"),
                jsonTest.getBoolean("isExecuted"),
                jsonTest.optInt("__v"),
                jsonTest.optString("testEnd"),
                jsonTest.optString("testStart")
            )
        } catch (e: JSONException) {
            e.printStackTrace()
        }
        return null
    }
}

