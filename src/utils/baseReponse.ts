export class BaseResponse {
    message: string
    errorCode: number
    data: any
    constructor(input: { errorCode?: number; data?: any; message?: string }) {
        this.errorCode = input.errorCode;
        this.data = input.data;
        this.message = input.message;
    }
}