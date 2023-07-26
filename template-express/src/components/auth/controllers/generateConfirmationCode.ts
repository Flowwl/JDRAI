import { AuthedRequest, NextFunction, Response } from '@/types';
import { ObjectId } from "mongodb";
import { userService } from "@/components/users/service";

export async function generateConfirmationCode(req: AuthedRequest, res: Response, next: NextFunction) {
    try {
        const { user } = req;
        const confirmationCode = new ObjectId().toString();

        await userService.update({ confirmationCode }, user._id);
        return res.send({ confirmationCode });
    } catch (e) { return next(e); }
}
