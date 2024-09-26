import { v4 as uuid, v4 } from 'uuid';
class User {
    public id: string;
    public followers: string[] = [];
    public following: string[] = [];
    public isLokedAccount: boolean = false;
    public token?: string;

    constructor(
        public userName: string,
        public password: string,
        public email: string,
        public birthDate: Date,
        public avatarUrl: string,

    ) {
        this.id = v4();
    }
}

export default User;
