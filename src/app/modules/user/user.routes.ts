import { Router } from "express";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interfaces";

const router = Router()
router.post("/register", UserControllers.createUser)
router.get('/all-users', checkAuth(Role.ADMIN), UserControllers.getAllUsers)
router.get('/me', checkAuth(...Object.values(Role)), UserControllers.getMe);
router.patch('/block', checkAuth(Role.ADMIN), UserControllers.blockUser);
router.delete('/delete/:id', checkAuth(Role.ADMIN) , UserControllers.deleteUser)

export const UserRoutes = router;