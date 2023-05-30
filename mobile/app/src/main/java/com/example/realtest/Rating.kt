package com.example.realtest

import java.io.Serializable

data class Rating(
    val userId: String,
    val value: Int
) : Serializable