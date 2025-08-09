import { Document, Model } from "mongoose";
export interface AdvertiseAttras{
    userId:string,
    comapnyName:string,
    companyWebsite:string,
    contactName:string,
    contactEmail:string,
    contactPhone:string,
    adDescription:string,
    adImage:string,
    targetAuddiance:string,
    advertisPlan:string,
    clicks:number,
    createdAt:Date
}

export interface AdvertiseDoc extends Document{
    userId:string,
    comapnyName:string,
    companyWebsite:string,
    contactName:string,
    contactEmail:string,
    contactPhone:string,
    adDescription:string,
    adImage:string,
    targetAuddiance:string,
    advertisPlan:string,
    clicks:number,
    createdAt:Date   
}
export interface AdvertiseModel extends Model<AdvertiseDoc>{
    build(attrs:AdvertiseAttras):AdvertiseDoc;
}