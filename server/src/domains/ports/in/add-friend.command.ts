import { FriendEntity } from "../../entities/friend.entity";

export class AddFriendCommand {
    constructor(
        private readonly _friend: FriendEntity
    ) { }

    get friend(): FriendEntity {
        return this._friend;
    }
}