import { startExpress } from "./src/modules/account-web/express/express-app";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4999;

console.log("🚀 Project started!");
startExpress(PORT);
