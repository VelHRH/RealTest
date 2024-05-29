import { UserModel } from "../database/models/User";
import { random, authenticationToken } from "../utils";
import { AppError } from "../utils/app-errors";

export class AuthService {
  async RegisterUser(data: {
    email: string;
    login: string;
    password: string;
    name: string;
  }) {
    try {
      const { email, password, login, name } = data;
      if (!email || !password || !name || !login) {
        throw AppError.badRequest("All fields should be filled");
      }
      const existingEmail = await UserModel.findOne({ email });
      const existingLogin = await UserModel.findOne({ login });
      if (existingEmail || existingLogin) {
        throw AppError.badRequest(
          "User with this email/login alredy registered"
        );
      }
      const salt = random() as string;

      const user = new UserModel({
        email,
        login,
        name,
        authentication: {
          salt,
          password: authenticationToken(salt, password),
        },
      });
      await user.save();
      return {
        email: user.email,
        login: user.login,
        _id: user._id,
        role: user.role,
      };
    } catch (err) {
      throw err;
    }
  }

  async LoginUser(data: { email: string; login: string; password: string }) {
    try {
      const { email, login, password } = data;
      if ((!email && !login) || !password) {
        throw AppError.badRequest("Wrong login, email or password");
      }
      const user = email
        ? await UserModel.findOne({ email }).select(
            "+authentication.salt +authentication.password"
          )
        : await UserModel.findOne({ login }).select(
            "+authentication.salt +authentication.password"
          );
      if (!user) {
        throw AppError.badRequest("Wrong login, email or password");
      }
      const expectedHash = authenticationToken(
        user.authentication.salt,
        password
      );

      if (user.authentication.password !== expectedHash) {
        throw AppError.badRequest("Wrong login, email or password");
      }

      const salt = random();
      user.authentication.sessionToken = authenticationToken(
        salt,
        user._id.toString()
      );
      await user.save();
      const { authentication, ...userData } = user;
      return { data: userData, token: authentication.sessionToken };
    } catch (err) {
      throw err;
    }
  }

  async LogoutUser(sessionToken: string) {
    try {
      const user = await UserModel.findOne({
        "authentication.sessionToken": sessionToken,
      });
      user.authentication.sessionToken = undefined;
      await user.save();
    } catch (err) {
      throw err;
    }
  }

  async MyInformation(id: string) {
    const user = await UserModel.findById(id);
    return user;
  }

  async EditPassword(data: {
    oldPassword: string;
    newPassword: string;
    repeatPassword: string;
    _id: string;
  }) {
    try {
      const { oldPassword, newPassword, repeatPassword, _id } = data;
      const user = await UserModel.findById(_id).select(
        "+authentication.salt +authentication.password"
      );
      const expectedHash = authenticationToken(
        user.authentication.salt,
        oldPassword
      );

      if (user.authentication.password !== expectedHash) {
        throw AppError.badRequest("Wrong old password");
      }

      if (newPassword !== repeatPassword) {
        throw AppError.badRequest("Passwords do not match");
      }

      const salt = random();

      user.authentication.salt = salt;
      user.authentication.password = authenticationToken(salt, newPassword);

      await user.save();
      const { authentication, ...userData } = user;
      return userData;
    } catch (err) {
      throw err;
    }
  }
}
