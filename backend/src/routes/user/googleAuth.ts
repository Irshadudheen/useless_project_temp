import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validateRequest";
import { BadRequestError } from "../../errors/bad-request-error";
import jwt from "jsonwebtoken";
import axios from "axios";
import { User } from "../../models/user";
import { jwtDecode } from 'jwt-decode';
import { IgoogleAuth } from "../../@types/googleAuth";


const router = Router();
router.post('/api/users/googleAuth', [
    body('loginData')
        .notEmpty()
        .withMessage('Token is required')
], validateRequest, async (req: Request, res: Response) => {
    const { loginData } = req.body;
    let userData=null;
    try {
        const userInfoResponse:IgoogleAuth =loginData;
        console.log(userInfoResponse)
          userData = {
            googleId: userInfoResponse.sub,
            email: userInfoResponse.email,
            name: userInfoResponse.name,
            picture: userInfoResponse.picture
          };
    } catch (error:any) {
        console.error(
            "Failed to fetch user info:",
            error.response?.data || error.message
          );
          throw new BadRequestError("Invalid access token");
    }
    if (!userData || !userData.googleId) {
        throw new BadRequestError("Failed to get user information from Google");
       
      }
      let user = await User.findOne({ googleId: userData.googleId });
      if(user){
         const userJWt = jwt.sign({
                id:user.id,
                email:user.email
            },process.env.JWT_KEY!)
            res.send(userJWt);
      }else{

        const newUser = User.build(userData);
        await newUser.save();
        const userJWt = jwt.sign({
            id:newUser.id,
            email:newUser.email
          },process.env.JWT_KEY!)
           res.send({token:userJWt});
        }

})
export { router as googleAuthRouter };