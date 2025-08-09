import { Request, Response, Router } from "express";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validateRequest";
import QRCode  from 'qrcode';
import { body } from "express-validator";
import { Url } from "../../models/url";
import { BadRequestError } from "../../errors/bad-request-error";
import nanoi from "nanoid";
// import { setValue } from "../../service/redisService";
import { createURLLimiter } from "../../middlewares/rateLimiter";
import { v6 } from "uuid";

const router = Router();
router.post('/api/url',
    
    
   
        [body('longUrl')
        .trim()
        .notEmpty()
        .withMessage('Please provide a valid URL')
        .matches(/^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w./?%&=-]*)?$/)
        .withMessage('Invalid URL format')],
    validateRequest,
    createURLLimiter
    ,
    async (req:Request,res:Response)=>{
        try {
            const {longUrl,topic} = req.body;
            let {customName} = req.body;
            // const checkUrl = await Url.findOne({userId:req.currentUser!.id,longUrl})
            if(!customName){
                customName =  v6().slice(-6) ;
            }
            // if(checkUrl){
            //     throw new BadRequestError('the Url already created')
            // }
           

            console.log(customName)
           const existing = await Url.findOne({longUrl})
           if(existing){
           const image =await genQr(`https://localhost:4000/api/url/${existing.shortUrl}`)
            res.send({existing,qr:image});

           }else{

               
               const url =Url.build({clicks:0,createdAt:new Date,longUrl,shortUrl:customName,topic})
            await url.save()
            const image =await genQr(`https://localhost:4000/api/url/${url.shortUrl}`)
            // await setValue(shortUrl, longUrl)
            res.send({existing:url,qr:image})
        }
        } catch (error:any) {
            console.error(error.message)
            throw new BadRequestError(`Failed to create url ${error.message}`)
        }

})
async function  genQr(url:string){
    return await QRCode.toDataURL(url);
}
export {router as createUrlRouter};