package com.example.realtest

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import okhttp3.*
import okhttp3.CookieJar
import okhttp3.JavaNetCookieJar
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import org.json.JSONArray
import org.json.JSONException
import java.io.IOException
import java.net.CookieManager
import java.net.CookiePolicy

class TestListActivity : AppCompatActivity() {
    private lateinit var testRecyclerView: RecyclerView
    private lateinit var testAdapter: TestAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_test_list)

        testRecyclerView = findViewById(R.id.testRecyclerView)
        testRecyclerView.layoutManager = LinearLayoutManager(this)
        testAdapter = TestAdapter()
        testRecyclerView.adapter = testAdapter

        val testListUrl = "http://192.168.0.104:8000/test"
        val request = Request.Builder()
            .url(testListUrl)
            .build()

        val client = OkHttpClient()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                println("Request failed: ${e.message}")
            }

            override fun onResponse(call: Call, response: Response) {
                val responseBody = response.body
                if (response.isSuccessful && responseBody != null) {

                    val testListJson = responseBody.string()

                    val tests = parseTestListJson(testListJson)
                    runOnUiThread {
                        testAdapter.setTests(tests)
                    }
                } else {
                    println(responseBody?.string())
                }
            }
        })
    }

    fun onBackButtonClick(view: View?) {
        finish()
    }

    private fun parseTestListJson(jsonString: String): List<Test> {
        val tests = mutableListOf<Test>()
        try {
            val jsonArray = JSONArray(jsonString)
            for (i in 0 until jsonArray.length()) {
                val jsonTest = jsonArray.getJSONObject(i)
                val test = Test(
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
                tests.add(test)
            }
        } catch (e: JSONException) {
            e.printStackTrace()
        }
        return tests
    }
}
