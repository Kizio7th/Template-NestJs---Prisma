import { Logger } from "@nestjs/common";

export class UserException extends Error {
    private logger = new Logger(UserException.name);
    constructor(message: string = 'Đã xảy ra lỗi liên quan đến người dùng') {
        super(message);
        this.name = 'UserException';
        this.logger.error(message);
    }

}
