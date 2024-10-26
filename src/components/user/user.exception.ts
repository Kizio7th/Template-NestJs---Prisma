import { Logger } from "@nestjs/common";

export class UserException extends Error {
    private logger = new Logger(UserException.name);
    constructor(error?: string) {
        super('Đã xảy ra lỗi liên quan đến người dùng');
        if (error) this.logger.error(error);
    }

}
