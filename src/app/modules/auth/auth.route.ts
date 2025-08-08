import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { AuthConrollers } from "./auth.controller";

const router = Router()

router.get('/google', async(req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("google", {scope: ["profile" , "email"]})(req,res)
})


router.get('/google/callback', passport.authenticate("google", { failureRedirect: "/login" }), AuthConrollers.gooleCallbackController)

export const AuthRoutes = router;