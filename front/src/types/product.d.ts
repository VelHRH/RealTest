interface IProduct {
 _id: string;
 name: string;
 description?: string;
 imgUrl: string;
 price: number;
 avgRating: number;
 ratings: { value: number; userId: string }[];
 companyId: string;
}
