import { AuthedRequest, NextFunction, Response } from '@/types'
import { NextFunction as ENext, Request as EReq, Response as ERes } from 'express'

export function authedCr(controller: (req: AuthedRequest, res: Response, next: NextFunction) => any): (req: EReq, res: ERes, next: ENext) => (req: AuthedRequest, res: Response, next: NextFunction) => any {
    return (req, res, next) => controller(req as AuthedRequest, res as Response, next as NextFunction) as any;
}
