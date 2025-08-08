import { Types } from "mongoose";

export interface IAuthProvider {
  provider: 'google' | 'credentials'; // "Google", "Credential"
  providerId: string;
}

export enum IsActive{
  ACTIVE = "ACTIVE",
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED'
}
export enum Role {
  SENDER = 'SENDER',

  ADMIN = 'ADMIN',
  RECEIVER = 'RECEIVER',
}
export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isActive?: IsActive;
  isDeleted?: boolean;
  role: Role;
  auths: IAuthProvider[];
}