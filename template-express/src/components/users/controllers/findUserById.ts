import { NextFunction, Request, Response } from '@/types';
import { httpErrorService } from '@/services';
import { MESSAGES } from '@/enums';
import { IsDefined } from 'class-validator';
import { validateAndConvert } from '@/utils';
import { ObjectId } from "mongodb";
import { ConvertToObjectId } from "@/utils/classValidator";
import { userService } from "@/components/users/service";
import { IsObjectId } from "class-validator-mongo-object-id";

class Params {
    @IsDefined()
    @IsObjectId()
    @ConvertToObjectId()
    id!: ObjectId
}
export async function findUserById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = await validateAndConvert(Params, req.params)

        const user = await userService.findById(new ObjectId(id))
        if (! user) { throw httpErrorService.notFound(MESSAGES.notFound) }

        return res.send(user)
    } catch
        (e) { return next(e) }
}
