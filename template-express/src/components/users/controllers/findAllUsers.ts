import { AuthedRequest, NextFunction, Response } from '@/types';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ROLES } from "@/enums";
import { validateAndConvert } from '@/utils';
import { Type } from 'class-transformer';
import { userService } from "@/components/users/service";

class Filter {

  @IsOptional()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  roleId!: ROLES[] | undefined

  @IsOptional()
  @IsString()
  search!: string | undefined
}

class Query {
  @ValidateNested()
  @IsOptional()
  @Type(() => Filter)
  filter!: Filter | undefined

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit!: number | undefined


  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page!: number | undefined
}

export async function findAllUsers(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const { filter = {}, page = 1, limit = 100 } = await validateAndConvert(Query, req.query)
    const { search, ...filterRest } = await validateAndConvert(Filter, filter)

    const { users, count } = await userService.findAndCountAll()
    return res.send({
      data: users,
      page: page,
      total: count
    })
  } catch (e) { return next(e) }
}
