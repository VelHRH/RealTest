package com.example.realtest

import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity


class CompanyDetailsActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_company_details)

        val companyDetails = intent.getSerializableExtra("companyDetails") as? CompanyDetails?

        if (companyDetails != null) {
            val companyNameTextView = findViewById<TextView>(R.id.companyNameTextView)
            val companyDescriptionTextView = findViewById<TextView>(R.id.companyDescriptionTextView)
            val avgRatingTextView = findViewById<TextView>(R.id.avgRatingTextView)
            val balanceTextView = findViewById<TextView>(R.id.balanceTextView)

            companyNameTextView.text = companyDetails.name
            companyDescriptionTextView.text = companyDetails.description
            avgRatingTextView.text = companyDetails.avgRating.toString()
            balanceTextView.text = companyDetails.balance.toString()
        }
    }
    fun onBackButtonClick(view: View?) {
        finish()
    }
}