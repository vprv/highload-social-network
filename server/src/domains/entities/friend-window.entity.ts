import { FriendEntity } from "./friend.entity";

export class FriendWindowEntity {
    private readonly _friends: FriendEntity[] = [];

    get friends(): FriendEntity[] {
        return this._friends;
    }

    addFriend(friend: FriendEntity): Boolean {
        this._friends.push(friend);
        return true;
    }

}