package com.example.realtest

import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.squareup.picasso.Picasso


class CompanyDetailsActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_company_details)

        val companyDetails = intent.getSerializableExtra("companyDetails") as? CompanyDetails?

        if (companyDetails != null) {
            val companyNameTextView = findViewById<TextView>(R.id.companyNameTextView)
            val companyDescriptionTextView = findViewById<TextView>(R.id.companyDescriptionTextView)
            val avgRatingTextView = findViewById<TextView>(R.id.avgRatingTextView)
            val companyAvatarImageView = findViewById<ImageView>(R.id.companyAvatarImageView)

            companyNameTextView.text = companyDetails.name
            companyDescriptionTextView.text = companyDetails.description
            avgRatingTextView.text = companyDetails.avgRating.toString()
            companyDescriptionTextView.text = companyDetails.description

            Picasso.get()
                .load("http://192.168.0.104:8000/${companyDetails.avatarUrl}")
                .into(companyAvatarImageView)
        }
    }
    fun onBackButtonClick(view: View?) {
        finish()
    }
}