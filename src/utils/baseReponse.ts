export class BaseResponse {
  message: string;
  errorCode: number;
  data: any;
  status: number
  constructor(input: { errorCode?: number; data?: any; message?: string, status?: number }) {
    this.errorCode = input.errorCode ?? input.status ?? 0;
    this.data = input.data;
    this.message = input.message;
  }
}
