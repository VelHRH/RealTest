export const getProductsByCompany = async (id: string) => {
 const res = await fetch(`${process.env.API_HOST}/test/products/${id}`, {
  cache: "no-store",
 });
 return (await res.json()) as IProduct[];
};

export const getProduct = async (id: string) => {
 const res = await fetch(`${process.env.API_HOST}/test/product/${id}`, {
  cache: "no-store",
 });
 return (await res.json()) as IProduct;
};
