interface IUser {
 _id: string;
 login: string;
 name: string;
 email: string;
 avatarUrl?: string;
 role: string;
 authentication?: {
  password: string;
  salt?: string;
  sessionToken?: string;
 };
}
