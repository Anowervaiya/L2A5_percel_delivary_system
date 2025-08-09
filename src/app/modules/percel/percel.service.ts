import AppError from "../../errorHelpers/appError";
import { sendResponse } from "../../utils/sendResponse";
import { IUser } from "../user/user.interfaces";
import { IParcel, ParcelStatus } from "./percel.interface";
import { Parcel } from "./percel.model";
import httpStatus from 'http-status-codes'

const createParcel = async (user: any, payload: Partial<IParcel>) => {


  
const  trackingId = `trackId_${Date.now()}_${Math.floor(Math.random() * 1000)}`





  const info = {
    ...payload,
    trackingId,
    statusLogs: [
      {
        status: 'REQUESTED',
        updatedBy: user.userId,
        updatedAt: new Date(),
      },
    ],
  };

  const parcel = await Parcel.create(info);

  return parcel;
};

const cancelParcel = async (id: string, user: any) => {
  
  const parcel = await Parcel.findById(id);
  if (!parcel) {
    throw new AppError(httpStatus.BAD_REQUEST, 'parcel does not exist');
  }

  if (
    parcel.statusLogs?.some(status => status.status === ParcelStatus.CANCELLED)
  ) {
    throw new AppError(
      httpStatus.BAD_GATEWAY,
      "parcel is already cancelled .. you can't change the status"
    );
  }


  const changableParcel = await Parcel.findByIdAndUpdate(
    id,
    {
      $set: {
        currentStatus: ParcelStatus.CANCELLED,
      },
      $push: {
        statusLogs: {
          status: ParcelStatus.CANCELLED,
          updatedBy: user.userId,
          updatedAt: new Date(),
        },
      },
    },
    { new: true, runValidators: true }
  );

  return changableParcel;
};
const changeParcelStatus = async (id: string, user: any, status: string) => {

  const parcel = await Parcel.findById( id )
  if (!parcel) {
    throw new AppError ( httpStatus.BAD_REQUEST,"parcel does not exist")
  }

  if (parcel.statusLogs?.some(status => status.status === ParcelStatus.CANCELLED)) {
    
    throw new AppError(httpStatus.BAD_GATEWAY, "parcel is cancelled .. you can't change the status")
  }
  
  if (parcel.statusLogs?.some(singleStatus => singleStatus.status === status)) {
    throw new AppError(httpStatus.BAD_GATEWAY, `You have already ${status} this parcel`);
  }
  

  const changableParcel = await Parcel.findByIdAndUpdate(
    id,
    {
      $set: {
        currentStatus: status,
      },
      $push: {
        statusLogs: {
          status: status,
          updatedBy: user.userId,
          updatedAt: new Date(),
        },
      },
    },
    { new: true, runValidators: true }
  );

  return changableParcel;
};
const myParcel = async (user : any) => {
  const userId = user.userId;

  const sendedParcel = await Parcel.find({ sender: userId })
  const receivedParcel = await Parcel.find({ receiver: userId })

  if (sendedParcel.length === 0 && receivedParcel.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No parcels found');
  }

  const parcel = { sendedParcel, receivedParcel };

  return parcel;
};
const ParcelByTrackingId = async (trackingId: string) => {
  const parcel = await Parcel.findOne({trackingId: trackingId });

  return parcel;
};

export const ParcelService = {
  createParcel,
  cancelParcel,
  changeParcelStatus,
  myParcel,
  ParcelByTrackingId,
};