import { Logger, NotFoundException } from '@nestjs/common';

export class RoleNotFoundException extends NotFoundException {
    private logger = new Logger(RoleNotFoundException.name);

    constructor(error?: any) {
        super('Không tìm thấy role');
        if (error) this.logger.error(error);
    }
}

