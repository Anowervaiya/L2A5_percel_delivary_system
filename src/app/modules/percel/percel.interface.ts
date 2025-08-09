import { Types } from "mongoose";

export enum ParcelStatus{
  REQUESTED = 'REQUESTED',
  APPROVED = 'APPROVED',
  DISPATCHED = 'DISPATCHED',
   CANCELLED= 'CANCELLED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
 
  
}

export interface IParcelStatusLog {
  status: ParcelStatus;
  timestamp: Date;
  updatedBy: Types.ObjectId;
  location?: string;
  note?: string
}

export  interface IParcel {
  _id?: Types.ObjectId;
  trackingId: string;
  type: string;
  weight: number;
  fee: number;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  deliveryAddress: string;
  deliveryDate: Date;
  currentStatus?: string;
  statusLogs?: IParcelStatusLog[];
  isBlocked?: boolean;
  isCancelled?: boolean;
}