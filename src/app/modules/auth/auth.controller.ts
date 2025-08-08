import { NextFunction, Response,Request } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { createUserTokens } from "../../utils/userTokens";
import AppError from "../../errorHelpers/appError";
import { setAuthCookie } from "../../utils/setCookie";
import { envVars } from "../../config/env";





const gooleCallbackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user; //google set user in req.user auto
  console.log(user);
  if (!user) {
    throw new AppError(404, 'user not found');
  }
  const tokenInfo = createUserTokens(user);

  setAuthCookie(res, tokenInfo);

  res.redirect(envVars.FRONTEND_URL);
})


export const AuthConrollers = {
  gooleCallbackController,
};