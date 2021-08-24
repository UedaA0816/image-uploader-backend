import { Request,Response } from "express";
import { logger } from "./../logger";

import { sleep } from "./../utils";

export const upload_task = async (req:Request, res:Response) => {
  await sleep(2000)
  res.send({code:"ok"})
}