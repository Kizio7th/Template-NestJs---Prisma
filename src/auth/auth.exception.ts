import { ConflictException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';

export class UserAlreadyExistsException extends ConflictException {
    private logger = new Logger(UserAlreadyExistsException.name);
    public errorCode: number; 

    constructor() {
        super('Tên đăng nhập đã tồn tại'); 
        this.errorCode = 1;
        this.logger.error(this.message);
    }
}

export class InvalidCredentialsException extends UnauthorizedException {
    private logger = new Logger(InvalidCredentialsException.name);
    public errorCode: number; 

    constructor() {
        super('Sai thông tin đăng nhập, vui lòng kiểm tra tên đăng nhập và mật khẩu'); 
        this.errorCode = 401; 
        this.logger.error(this.message);
    }
}

