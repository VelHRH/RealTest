package com.example.realtest

data class Test(
    val id: String,
    val purchaseId: String,
    val productId: String,
    val name: String,
    val testCreator: String,
    val reportingFrequency: String,
    val trackingRange: Int,
    val isExecuted: Boolean,
    val version: Int,
    val testEnd: String?,
    val testStart: String?
)