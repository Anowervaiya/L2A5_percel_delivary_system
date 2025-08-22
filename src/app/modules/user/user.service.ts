import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/appError";
import { IAuthProvider, IUser, Role } from "./user.interfaces";
import { User } from "./user.model";
import bcryptjs from "bcryptjs"
import httpStatus from "http-status-codes"

const createUser = async (payload: Partial<IUser>) => {
  
  const { email, password, role, ...rest } = payload;
  const capitalizedRole = role?.toUpperCase()
  if (capitalizedRole === Role.ADMIN) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "you can't register as a admin , please register as a sender or reciever"
    );
  }

 const isUserExist = await User.findOne({ email });

 if (isUserExist) {
   throw new AppError(httpStatus.BAD_REQUEST, 'User Already Exist');
  }

     const hashedPassword = await bcryptjs.hash(
       password as string,
       Number(envVars.BCRYPT_SALT_ROUND)
     );

   const authProvider: IAuthProvider = {
     provider: 'credentials',
     providerId: email as string,
   };
  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    role: capitalizedRole,
    ...rest,
  });
  return user;

};



const getAllUsers = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

const blockUser = async (id: string, status: boolean) => {
  
  const user = await User.findById(id);
  
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'user does not exist');
  }

  if (user.isBlock === status) {
   throw new AppError(403, `user is already ${user.isBlock === true ? 'blocked' : 'unblock'}`)
 }

  


  const changableUser = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        isBlock: status,
      },
      
    },
    { new: true, runValidators: true }
  );

  return changableUser;
};

const deleteUser = async (id: string,) => {

  const user = await User.findById(id)

 if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, 'user does not exist');
  }

  const result = await User.findOneAndDelete({_id : id})
  return result;
};

export const UserServices = {
  createUser,
  getAllUsers,
  blockUser,
  deleteUser,
};