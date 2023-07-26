import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import { Module } from "@nestjs/common";

const loggingPath = "./logs/";

@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          dirname: loggingPath, //path to where save loggin result
          filename: "error.log", //name of file where will be saved logging result
          level: "error"
        }),
        new winston.transports.File({
          dirname: loggingPath, //path to where save loggin result
          filename: "debug.log", //name of file where will be saved logging result
          level: "debug"
        }),
        new winston.transports.File({
          dirname: loggingPath,
          filename: "info.log",
          level: "info"
        })
      ]
    })
  ]
})
export class LoggingModule {}
