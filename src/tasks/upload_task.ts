import { Request,Response } from "express";
import { logger } from "./../logger";

import { sleep } from "./../utils";

export const upload_task = async (req:Request, res:Response) => {
  await sleep(2000)
  console.log(req.file)
  res.send({code:"ok",url:req.file?.path})
}