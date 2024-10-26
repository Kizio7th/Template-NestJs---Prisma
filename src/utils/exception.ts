import { InternalServerErrorException, Logger } from "@nestjs/common";

export class UnexpectedErrorException extends InternalServerErrorException {
    private logger = new Logger(UnexpectedErrorException.name);

    constructor(message?: string) {
        super('Đã xảy ra lỗi, vui lòng thử lại sau');
        this.logger.error(message);
    }
}
