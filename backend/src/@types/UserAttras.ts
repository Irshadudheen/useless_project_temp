import { Model ,Document} from "mongoose";

export interface UserAttrs {
    email:string,
    googleId:string,
    name:string,
    picture:string
}
export interface UserDoc extends Document{
    email:string,
    googleId:string,
    name:string,
    picture:string,
}
export interface UserModel extends Model<UserDoc>{
    build(attrs:UserAttrs):UserDoc;
}