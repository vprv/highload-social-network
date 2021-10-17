console.log("Hello from server");


import { FriendEntity } from "./src/domains/entities/friend.entity";
import { AddFriendCommand } from "./src/domains/ports/in/add-friend.command";

import { AddFriendService } from "./src/domains/services/add-friend.service";
import { AccountPersistenceAdapterService } from "./src/modules/account-persistence/account-persistence-adapter.service";
import { AccountMysqlEntity } from "./src/modules/account-persistence/account.mysql-entity";
import { FriendMysqlEntity } from "./src/modules/account-persistence/friend.mysql-entity";
import { startExpress } from "./src/modules/account-web/express/express-app";


async function addFriend_test() {
    try {
        const accountPersistenceAdapterService = new AccountPersistenceAdapterService(
            AccountMysqlEntity.getInstance(),
            FriendMysqlEntity.getInstance()
        )

        const friend = new FriendEntity(null, "acc2", "acc3", new Date())

        const command = new AddFriendCommand(friend);
        const service = new AddFriendService(accountPersistenceAdapterService, accountPersistenceAdapterService);
        const result = await service.addFriend(command);
        console.log("done")
    } catch (e) {
        console.log(e)
    }
}

startExpress();
