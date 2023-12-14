import express from "express";
import { getPayLoadCLient } from "./get-payload";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const start = async()=>{
  const payload = await getPayLoadCLient({
    initOptions:{
      express: app,
      onInit: async(cms) =>{
        cms.logger.info(`Adming URL  ${cms.getAdminURL()}`)
      },
    }
  })
}


start()