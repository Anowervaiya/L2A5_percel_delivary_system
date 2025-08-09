import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interfaces";
import { ParcelController } from "./percel.controller";

const router = Router()

router.get('/my-parcel', checkAuth(Role.RECEIVER, Role.SENDER), ParcelController.myParcel)


router.get('/track/:trackingId' , checkAuth(...Object.values(Role)),ParcelController.ParcelByTrackingId);

router.post(
  '/create-parcel',
  checkAuth(Role.SENDER),
  ParcelController.createParcel
);

router.patch('/cancel/:id', checkAuth(Role.SENDER), ParcelController.cancelParcel)

router.patch(
  '/status/:id',
  checkAuth(Role.ADMIN),
  ParcelController.changeParcelStatus
);


export const PercelRout = router;