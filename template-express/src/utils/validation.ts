import 'reflect-metadata'
import { validate, ValidationError, ValidatorOptions } from "class-validator"
import { httpErrorService } from '@/services'
import { ClassConstructor, plainToClass } from "class-transformer"

type ConversionOptions = {
    strict?: boolean;
}
export async function validateAndConvert<T>(
    schema: ClassConstructor<T>,
    plainObject: any,
    { strict = true }: ConversionOptions = {}
): Promise<T> {
    await assertValidObject();
    return plainToClass(schema, plainObject, {
        exposeDefaultValues: true,
        groups: ["conversion"]
    });

    async function assertValidObject() {
        const input = plainToClass(schema, plainObject);
        const errors = await validate(input as Record<string, unknown>, buildValidatorOptions());
        if (errors.length > 0) {
            throw httpErrorService.badRequest(`Request validation failed: ${extractErrorMessage(errors[0])}`);
        }

        function buildValidatorOptions() {
            const validatorOptions: ValidatorOptions = {
                skipMissingProperties: true, // Set every fields as optional
                stopAtFirstError: true
            };
            if (strict) {
                // Throw when non-decorated fields are provided (extra fields)
                validatorOptions.whitelist = true;
                validatorOptions.forbidNonWhitelisted = true;
            }
            return validatorOptions;
        }
    }
}

function extractErrorMessage(error: ValidationError): string {
    if (error.constraints !== undefined) {
        return Object.values(error.constraints)[0];
    }
    if (error.children !== undefined) {
        return extractErrorMessage(error.children[0]);
    }
    return "";
}
