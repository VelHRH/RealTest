interface ICompany {
 _id: string;
 balance: number;
 name: string;
 owner: string;
 ratings: { userId: string; value: number }[] | any[];
 admins: string[] | any[];
 avatarUrl: string;
 description: string;
 avgRating: number;
 tests?: string[];
}
