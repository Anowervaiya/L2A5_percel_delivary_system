import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interfaces';
import { ParcelController } from './percel.controller';

const router = Router();

router.get(
  '/my-parcel',
  checkAuth(Role.RECEIVER, Role.SENDER),
  ParcelController.myParcel
);
router.get('/all-parcel', checkAuth(Role.ADMIN), ParcelController.allParcel);

router.post(
  '/create-parcel',
  checkAuth(Role.SENDER , Role.ADMIN),
  ParcelController.createParcel
);
router.get(
  '/filterByStatus',
  checkAuth(Role.ADMIN),
  ParcelController.finterParcelByStatus
);

router.get(
  '/track/:trackingId',
  checkAuth(...Object.values(Role)),
  ParcelController.ParcelByTrackingId
);

router.patch(
  '/cancel/:id',
  checkAuth(...Object.values(Role)),
  ParcelController.cancelParcel
);

router.patch(
  '/confirm/:id',
  checkAuth(...Object.values(Role)),
  ParcelController.confirmParcel
);

router.patch(
  '/status/:id',
  checkAuth(Role.ADMIN),
  ParcelController.changeParcelStatus
);

router.delete(
  '/delete/:id',
  checkAuth(Role.ADMIN),
  ParcelController.deleteParcel
);

export const PercelRout = router;
