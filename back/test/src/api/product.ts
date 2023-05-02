import express from "express";
import { ProductService } from "../services/ProductService";
import { checkAuth } from "../utils/check-auth";

export const productAPI = async (app: express.Application) => {
 const service = new ProductService();
 app.post(
  "/product/create",
  checkAuth,
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const { name, price, companyId, imgUrl, identity } = req.body;

    const data = await service.CreateProduct({
     name,
     price,
     companyId,
     imgUrl,
     identity,
    });
    res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );
};
