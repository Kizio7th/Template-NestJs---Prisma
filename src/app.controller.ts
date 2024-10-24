import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from './utils/baseReponse';
class User {
  id: number;
  username: string;
  email: string;
}
@ApiTags('example')
@Controller('example')
export class AppController {

  @Get('get')
  @ApiOperation({
    summary: 'Kiểm tra trạng thái máy chủ'
  })
  @ApiResponse({
    status: 400,
    example: {
      message: 'Yêu cầu không hợp lệ',
      errorCode: 400,
    }
  })
  @ApiResponse({
    status: 401,
    example: {
      message: 'Không được phép - Thông tin đăng nhập không hợp lệ',
      errorCode: 401,
    }
  })
  @ApiResponse({
    status: 403,
    example: {
      message: 'Bị cấm - Truy cập bị từ chối',
      errorCode: 403,
    }
  })
  @ApiResponse({
    status: 500,
    example: {
      message: 'Đã xảy ra lỗi, vui lòng thử lại sau',
      errorCode: 500,
    }
  })
  async getServerStatus() {
    return {
      message: 'API is running',
      errorCode: 0,
    };
  }
}
