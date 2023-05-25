package com.example.realtest;

import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;

public interface CompanyApi {
    @GET("company")
    Call<List<Company>> getCompanies();
}