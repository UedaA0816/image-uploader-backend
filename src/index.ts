import express, { Express, Request, Response, Router } from 'express'
import multer from "multer";

if (process.env.NODE_ENV !== 'production') require('dotenv').config()
import { logger } from "./logger";

import { upload_task } from "./tasks/upload_task"

const app: Express = express()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, '/tmp/image-uploader')
  },
  filename: function (req, file, cb) {
      cb(null, getFileName(file.originalname))
  }
})

function getFileName(filename: string) {
  const [front, ...rears] = filename.split(".")
  return `${front}:${new Date().toISOString()}${rears.length ? "." : ""}${rears.join(".")}`
}

const upload = multer({ storage: storage })

const port = process.env.PORT || 3000

// CORSの許可
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// body-parserに基づいた着信リクエストの解析
// app.use(express.json({ type: 'application/*+json' }));

// app.use(express.raw());

// parse application/x-www-form-urlencoded 
// app.use(express.urlencoded({
//   extended: false,
//   type: 'application/x-www-form-urlencoded'
// }));

// GetとPostのルーティング
const router: Router = express.Router()

const fieldName = "file"
router.post('/upload',upload.single(fieldName), upload_task)

app.use(router)

// 3000番ポートでAPIサーバ起動
app.listen(port,()=> logger.info(`Example app listening on port ${port}!`) )