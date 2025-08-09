import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validate } from "uuid";
import { validateRequest } from "../../middlewares/validateRequest";
import QRCode  from 'qrcode';

const router = Router();
router.post('/api/qrcode',[body('url').isURL().withMessage('invalid url')],validateRequest,
async (req:Request,res:Response)=>{
    const {url}=req.body;
    const grCodeImage:string = await QRCode.toDataURL(url);
    res.send(grCodeImage).status(201);
 
    
})
export {router as createQrRouter}