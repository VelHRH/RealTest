package com.example.realtest

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class MainActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val companiesButton = findViewById<Button>(R.id.companiesButton)
        val companyNameTextView = findViewById<TextView>(R.id.companyNameTextView)

        val retrofit = Retrofit.Builder()
            .baseUrl("http://192.168.0.104:8000/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val companyApi = retrofit.create(CompanyApi::class.java)

        companiesButton.setOnClickListener {
            val call = companyApi.getCompanies()
            call.enqueue(object : Callback<List<Company>> {
                override fun onResponse(call: Call<List<Company>>, response: Response<List<Company>>) {
                    if (response.isSuccessful) {
                        val companies = response.body()
                        println("========================Request successful ${companies?.get(0)?.name}")
                        if (companies != null) {
                            val firstCompanyName = companies?.get(0)?.name
                            companyNameTextView.text = firstCompanyName
                            companyNameTextView.visibility = View.VISIBLE
                        }
                    } else {
                        println("========================Request failed")
                    }
                }

                override fun onFailure(call: Call<List<Company>>, t: Throwable) {
                    println("========================Request failed: ${t.message}")
                }
            })
        }
    }
}

