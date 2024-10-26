export class UserInfo {
    username: string;
    fullname: string;
    email: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(input: { username: string, fullname: string, email: string, avatar: string, createdAt: Date, updatedAt: Date }) {
        this.username = input.username;
        this.fullname = input.fullname;
        this.email = input.email;
        this.avatar = input.avatar;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
    }
}
