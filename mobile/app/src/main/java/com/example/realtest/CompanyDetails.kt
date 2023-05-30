package com.example.realtest

import java.io.Serializable

data class CompanyDetails(
    val _id: String,
    val name: String,
    val owner: String,
    val admins: List<String>,
    val avatarUrl: String,
    val ratings: List<Rating>,
    val tests: List<String>,
    val avgRating: Float,
    val description: String,
    val balance: Int
) : Serializable

