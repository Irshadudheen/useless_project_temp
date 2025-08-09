import { currentUserRouter } from "./user/current-user";
import { singoutRouter } from "./user/signout";
import { googleAuthRouter } from "./user/googleAuth";
import { createUrlRouter } from "./url/create-url";
import { redirectUrlRouter } from "./url/get-url";
// import {getURLAnalyticsRouter} from "./analysis/getURLAnalytics";
// import { getOverallAnalyticsRouter } from "./analysis/getOverallAnalytics";
// import { topicAnalyticsRouter } from "./analysis/topic";
import { createQrRouter } from "./qrcode/createQr";
export {currentUserRouter,createQrRouter,singoutRouter,googleAuthRouter,createUrlRouter,redirectUrlRouter}