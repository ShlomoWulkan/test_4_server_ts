import NewBeeperDto from '../DTO/newBeeperDto';
import User from '../models/beeperModel';
import { getFileData, saveFileData } from '../config/fileDataLayer';

class UserService {

    public static async getUser(id: string): Promise<User | undefined> {
        const users: User[] = await getFileData<User>('users') as User[];
        if (!users)  return undefined;
        return users.find(user => user.id === id);
    }

    public static async createNewUser(newUser: NewBeeperDto): Promise<boolean> {
        const { userName, password, email, birthDate, avatarUrl } = newUser;
        const user: User = new User(
            userName,
            password,
            email,
            birthDate,
            avatarUrl
        );

        let users: User[] = await getFileData<User>('users') as User[];
        if (!users)  users = [];
        users.push(user);
        return await saveFileData('users', users);
    }

    public static async createFollowUser(userId: string, followId: string): Promise<boolean> {
        const users: User[] = await getFileData<User>('users') as User[];
        if (!users)  return false;
        const user = users.find(user => user.id === userId);
        if (!user)  return false;
        const following = users.find(user => user.id === followId);
        if (!following)  return false;
        user.following.push(followId);
        following.followers.push(userId);
        return await saveFileData('users', users);
    }

    // public static async searchUserByUserName(userName: string): Promise<User | undefined> {
    //     const users: User[] = await getFileData<User>('users') as User[];
    //     if (!users)  return undefined;
    //     return users.filter(user: User => users.u.includes(user.userName));
    // }

}

export default UserService;
