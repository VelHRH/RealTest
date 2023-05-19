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
    const { name, price, companyId, imgUrl, identityLogin } = req.body;

    const data = await service.CreateProduct({
     name,
     price,
     companyId,
     imgUrl,
     identityLogin,
    });
    res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );

 app.get(
  "/product/:id",
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const data = await service.GetProductById({
     productId: req.params.id,
    });
    res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );

 app.get(
  "/products/:id",
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const data = await service.GetProductByCompanyId({
     companyId: req.params.id,
    });
    res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );

 app.post(
  "/product/rate/:id",
  checkAuth,
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const { identity, rating } = req.body;
    const data = await service.RateProduct({
     productId: req.params.id,
     identity,
     rating,
    });
    res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );

 app.delete(
  "/product/rate/:id",
  checkAuth,
  async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
  ) => {
   try {
    const { identity } = req.body;
    const data = await service.DeleteRating({
     productId: req.params.id,
     identity,
    });
    res.status(200).json(data);
   } catch (err) {
    next(err);
   }
  }
 );
};
