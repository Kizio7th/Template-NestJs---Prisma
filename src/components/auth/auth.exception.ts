import { ConflictException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';

export class UserAlreadyExistsException extends ConflictException {
    private logger = new Logger(UserAlreadyExistsException.name);
    public errorCode: number; 

    constructor(error?: string) {
        super('Tên đăng nhập đã tồn tại'); 
        this.errorCode = 1;
        if (error) this.logger.error(error);
    }
}

export class InvalidCredentialsException extends UnauthorizedException {
    private logger = new Logger(InvalidCredentialsException.name);

    constructor(error?: string) {
        super('Sai thông tin đăng nhập, vui lòng kiểm tra tên đăng nhập và mật khẩu'); 
        if (error) this.logger.error(error);
    }
}

