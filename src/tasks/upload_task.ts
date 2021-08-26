import { Request,Response } from "express";
import { logger } from "./../logger";

import { sleep } from "./../utils";

export const upload_task = async (req:Request, res:Response) => {
  logger.debug(req.file)

  const isFileImage = req.file?.mimetype.includes("image")
  if(!isFileImage) {
    res.status(403).send({code:40301})
    return
  }

  await sleep(2000)
  
  res.send({code:20000,url:req.file?.path})
}