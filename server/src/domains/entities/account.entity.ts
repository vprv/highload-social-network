import { FriendWindowEntity } from "./friend-window.entity";
import { FriendEntity } from "./friend.entity";


export type AccountId = string;

export class AccountEntity {
    constructor(
        private readonly _id: AccountId,
        private readonly _friendWindow: FriendWindowEntity
    ) { }

    get id(): AccountId {
        return this._id;
    }

    get friendWindow(): FriendWindowEntity {
        return this._friendWindow;
    }

    requestFriend(targetAccountId: AccountId): Boolean {
        const friend = new FriendEntity(
            this._id,
            targetAccountId,
            new Date()
        )
        this._friendWindow.addFriend(friend);
        return true;
    }
}