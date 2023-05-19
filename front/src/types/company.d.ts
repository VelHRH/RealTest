interface ICompany {
 _id: string;
 balance: number;
 name: string;
 owner: string;
 ratings: { userId: string; value: number }[];
 admins: string[];
 avatarUrl: string;
 description: string;
 avgRating: number;
}
