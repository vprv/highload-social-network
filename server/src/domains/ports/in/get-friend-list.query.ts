import { AccountId } from "../../entities/account.entity";
import { FriendWindowEntity } from "../../entities/friend-window.entity";

export interface GetFriendListQuery {
    getFriendList(accountId: AccountId): Promise<FriendWindowEntity>;
}
