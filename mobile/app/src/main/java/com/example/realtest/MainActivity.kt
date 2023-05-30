package com.example.realtest

import android.content.Intent
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
        val companyRecyclerView = findViewById<RecyclerView>(R.id.companyRecyclerView)

        val testsButton = findViewById<Button>(R.id.testsButton)
        testsButton.setOnClickListener {
            val intent = Intent(this, TestListActivity::class.java)
            startActivity(intent)
        }

        val adapter = CompanyAdapter(emptyList())
        companyRecyclerView.adapter = adapter

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
                            adapter.updateData(companies)
                            adapter.notifyDataSetChanged()
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

class CompanyAdapter(private var companies: List<Company>) :
    RecyclerView.Adapter<CompanyAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_company, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val company = companies[position]

        holder.companyNameTextView.text = company.name
        holder.companyDescriptionTextView.text = company.description

        Picasso.get().load("http://192.168.0.104:8000/${company.avatarUrl}").into(holder.companyImageView)

        holder.itemView.setOnClickListener {
            val retrofit = Retrofit.Builder()
                .baseUrl("http://192.168.0.104:8000/")
                .addConverterFactory(GsonConverterFactory.create())
                .build()

            val companyApi = retrofit.create(CompanyApi::class.java)
            val call = companyApi.getCompany(company._id)

            call.enqueue(object : Callback<CompanyDetails> {
                override fun onResponse(call: Call<CompanyDetails>, response: Response<CompanyDetails>) {
                    if (response.isSuccessful) {
                        val companyDetails = response.body()
                        if (companyDetails != null) {

                            val intent = Intent(holder.itemView.context, CompanyDetailsActivity::class.java)
                            intent.putExtra("companyDetails", companyDetails)
                            holder.itemView.context.startActivity(intent)
                        }
                    } else {
                        println("========================Request failed")
                    }
                }

                override fun onFailure(call: Call<CompanyDetails>, t: Throwable) {
                    println("========================Request failed: ${t.message}")
                }
            })
        }
    }

    fun updateData(newCompanies: List<Company>) {
        companies = newCompanies
    }

    override fun getItemCount(): Int {
        return companies.size
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val companyNameTextView: TextView = itemView.findViewById(R.id.companyNameTextView)
        val companyDescriptionTextView: TextView = itemView.findViewById(R.id.companyDescriptionTextView)
        val companyImageView: ImageView = itemView.findViewById(R.id.companyImageView)
    }
}

