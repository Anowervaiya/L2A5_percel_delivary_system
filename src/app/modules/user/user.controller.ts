import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

import httpStatus from 'http-status-codes'
import AppError from "../../errorHelpers/appError";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
 
  const user = await UserServices.createUser(req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Created Successfully",
    data: user
  })
})

const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const result = await UserServices.getMe(decodedToken.userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Your profile Retrieved Successfully',
      data: result.data,
    });
  }
);
const blockUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const Id = req.params.id;
  const status = req.body.isBlock;


  const user = await UserServices.blockUser(Id, status);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User status is changed Successfully",
    data: user
  })
})
const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const Id = req.params.id;


     await UserServices.deleteUser(Id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User  is deleted Successfully",
   data: null
  })
})

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'All Users Retrieved Successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);

export const UserControllers = {
  createUser,
  getAllUsers,
  blockUser,
  deleteUser,getMe
};