const { Router } = require('express');

import { AccountPersistenceAdapterService } from "../../../account-persistence/account-persistence-adapter.service";
import { AccountMysqlEntity } from "../../../account-persistence/account.mysql-entity";
import { FriendMysqlEntity } from "../../../account-persistence/friend.mysql-entity";
import { GetAccountService } from "../../../../domains/services/get-account.service";
import { FriendEntity } from "../../../../domains/entities/friend.entity";
import { AddFriendCommand } from "../../../../domains/ports/in/add-friend.command";
import { AddFriendService } from "../../../../domains/services/add-friend.service";
import { FindPersonService } from "../../../../domains/services/find-person.service";

const authMiddleware = require("../middleware/auth.middleware");

const router = new Router();

router.get("/ping", async (req: any, res: any) => {
    res.json({ ping: "pong" });
});


router.get("/find", authMiddleware, async (req: any, res: any) => {
    try {
        const { name, last_name } = req.query;
        if (!name || !last_name) {
            res.status(500).json({ message: 'Invalid name or last_name' });
        }

        const accountPersistenceAdapterService = new AccountPersistenceAdapterService(
            AccountMysqlEntity.getInstance(),
            FriendMysqlEntity.getInstance()
        );
        const accounts = await new FindPersonService(accountPersistenceAdapterService).findPerson(name, last_name);
        const filtered = accounts.map(account => {
            const responseObj: any = { ...account };
            delete responseObj._password;
            delete responseObj._birthday;
            delete responseObj._friendWindow;
            responseObj._age = account.age;
            responseObj._gender = account.gender ? "male" : "female";
            const friendsList = account.friendWindow.friends
                .map(friend => account.id === friend.sourceAccountId ? friend.targetAccountId : friend.sourceAccountId)
            responseObj._friends = [...new Set(friendsList)];
            return responseObj;
        })

        return res.json(filtered);

    }
    catch (error) {
        return res.status(404).json({ message: "Not found or another error", error });
    }
});


router.get("/:email", authMiddleware, async (req: any, res: any) => {
    try {
        const { email } = req.params;
        const accountPersistenceAdapterService = new AccountPersistenceAdapterService(
            AccountMysqlEntity.getInstance(),
            FriendMysqlEntity.getInstance()
        );

        const account = await new GetAccountService(accountPersistenceAdapterService).getAccount(email);

        const responseObj: any = { ...account };
        delete responseObj._password;
        delete responseObj._birthday;
        delete responseObj._friendWindow;
        responseObj._age = account.age;
        responseObj._gender = account.gender ? "male" : "female";
        const friendsList = account.friendWindow.friends
            .map(friend => account.id === friend.sourceAccountId ? friend.targetAccountId : friend.sourceAccountId)
        responseObj._friends = [...new Set(friendsList)];

        res.json(responseObj);
    } catch (error) {
        res.status(404).json({ message: "Not found or another error", error })
    }
});

router.post("/friend", authMiddleware, async (req: any, res: any) => {
    try {
        const { target_account_id } = req.body;
        const { sourceAccountId } = req

        if (!sourceAccountId) {
            res.status(500).json({ message: 'Invalid source account id' });
        }

        if (!sourceAccountId) {
            res.status(500).json({ message: 'Invalid target account id' });
        }

        const accountPersistenceAdapterService = new AccountPersistenceAdapterService(
            AccountMysqlEntity.getInstance(),
            FriendMysqlEntity.getInstance()
        )

        const friend = new FriendEntity(null, sourceAccountId, target_account_id, new Date())

        const command = new AddFriendCommand(friend);
        const service = new AddFriendService(accountPersistenceAdapterService, accountPersistenceAdapterService);
        const result = await service.addFriend(command);
        result
            ? res.status(201).json({ message: 'Friend added' })
            : res.status(500).json({ message: "Account doesn't exist" })
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again later' });
    }
});

module.exports = router;