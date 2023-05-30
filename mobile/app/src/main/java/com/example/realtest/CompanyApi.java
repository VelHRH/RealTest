package com.example.realtest;

import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface CompanyApi {
    @GET("company")
    Call<List<Company>> getCompanies();

    @GET("company/{companyId}")
    Call<CompanyDetails> getCompany(@Path("companyId") String companyId);
}
