import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common';
import { BaseResponse } from '../utils/baseReponse';
export class ValidationExceptionFilter extends ValidationPipe {
    async transform(value: any, metadata: ArgumentMetadata) {
        try {
            return await super.transform(value, metadata);
        } catch (error) {
            throw new BadRequestException("Dữ liệu đã nhập không hợp lệ");
        }
    }
}
