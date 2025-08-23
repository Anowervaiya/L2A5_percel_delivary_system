import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { ParcelService } from './percel.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { ParcelStatus } from './percel.interface';

const createParcel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user as JwtPayload;
    const parcel = await ParcelService.createParcel(user, req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.ACCEPTED,
      message: 'parcel is created succesfully',
      data: parcel,
    });
  }
);
const cancelParcel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const Id = req.params.id;
    const user = req.user as string;
    const parcel = await ParcelService.cancelParcel(Id, user);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.ACCEPTED,
      message: 'parcel is cancelled succesfully',
      data: parcel,
    });
  }
);

const confirmParcel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const Id = req.params.id;
    const user = req.user as string;
    const parcel = await ParcelService.confirmParcel(Id, user);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.ACCEPTED,
      message: 'parcel is delivered succesfully',
      data: parcel,
    });
  }
);
const finterParcelByStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const status  = req.query.status as string;
    const result = await ParcelService.finterParcelByStatus(status.toUpperCase())

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.ACCEPTED,
      message: 'specifice parcel is retrieved succesfully',
      meta: result.meta,
      data: result.data,
    });
  }
);
const deleteParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const Id = req.params.id;


     await ParcelService.deleteParcel(Id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: "Parcel  is deleted Successfully",
   data: null
  })
})

const changeParcelStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const Id = req.params.id;
    const user = req.user as string;
    const {status} = req.body;
    const parcel = await ParcelService.changeParcelStatus(Id, user , status);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.ACCEPTED,
      message: 'parcel status is changed succesfully',
      data: parcel,
    });
  }
);
const myParcel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user ;

   const parcel = await ParcelService.myParcel(user)
    
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.ACCEPTED,
      message: 'parcel status is changed succesfully',
      data: parcel,
    });
  }
);
const allParcel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
  

    const result = await ParcelService.allParcel();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.ACCEPTED,
      message: 'All parcel are retrieved succesfully',
      data: result.data,
      meta: result.meta
    });
  }
);
const ParcelByTrackingId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const trackingId = req.params.trackingId;

    const parcel = await ParcelService.ParcelByTrackingId(trackingId) ;

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.ACCEPTED,
      message: 'parcel retrieved succussfully',
      data:parcel
    });
  }
);



export const ParcelController = {
  createParcel,
  cancelParcel,
  changeParcelStatus,
  myParcel,
  ParcelByTrackingId,
  allParcel,
  confirmParcel,
  deleteParcel,
  finterParcelByStatus,
};
