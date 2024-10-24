import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common';
import { BaseResponse } from '../utils/baseReponse';
export class ValidationExceptionFilter extends ValidationPipe {
    async transform(value: any, metadata: ArgumentMetadata) {
        try {
            return await super.transform(value, metadata);
        } catch (error) {
            const responseBody = new BaseResponse({
                errorCode: 400,
                message: "Có lỗi trong quá trình xác thực",
                data: error.response.message
            });
            throw new BadRequestException(responseBody);
        }
    }
}
