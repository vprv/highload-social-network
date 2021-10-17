import { AccountEntity } from "../../domains/entities/account.entity";
import { FriendWindowEntity } from "../../domains/entities/friend-window.entity";
import { FriendEntity } from "../../domains/entities/friend.entity";
import { AccountMysqlEntity } from "./account.mysql-entity";
import { FriendMysqlEntity } from "./friend.mysql-entity";

export class AccountMapper {
    static mapToDomain(
        accountMysqlEntity: AccountMysqlEntity,
        friendsMysqlEntity: FriendMysqlEntity[]
    ): AccountEntity {

        const friendWindow = new FriendWindowEntity();

        friendsMysqlEntity.forEach(friendMysql => {
            const friend = new FriendEntity(
                friendMysql.id,
                friendMysql.sourceAccountId,
                friendMysql.targetAccountId,
                friendMysql.timestamp
            )
            friendWindow.addFriend(friend);
        })

        const { account_id, password, name, last_name, birthdate, gender, city, interests } = accountMysqlEntity

        return new AccountEntity(
            account_id,
            password,
            name,
            last_name,
            birthdate,
            gender,
            interests,
            city,
            friendWindow
        );
    }

    static mapFriendToMysqlEntity(friend: FriendEntity): FriendMysqlEntity {
        return new FriendMysqlEntity(friend.id, friend.sourceAccountId, friend.targetAccountId, friend.timestamp);
    }

    static mapAccountToMysqlEntity(account: AccountEntity): AccountMysqlEntity {
        const { id, password, name, lastName, birthday, city, interests } = account;
        const gender = account.gender === "m" ? true : false;
        return new AccountMysqlEntity(
            id,
            password,
            name,
            lastName,
            birthday,
            gender,
            city,
            interests
        )
    }
}