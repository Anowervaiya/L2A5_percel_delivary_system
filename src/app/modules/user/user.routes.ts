import { Router } from "express";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interfaces";

const router = Router()
router.post("/register", UserControllers.createUser)

router.patch('/block/:id' , checkAuth(Role.ADMIN) , UserControllers.blockUser)

router.get('/all-users',checkAuth(Role.ADMIN), UserControllers.getAllUsers)

export const UserRoutes = router;