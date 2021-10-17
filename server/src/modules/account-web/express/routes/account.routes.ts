const { Router } = require('express');

import { AccountPersistenceAdapterService } from "../../../account-persistence/account-persistence-adapter.service";
import { AccountMysqlEntity } from "../../../account-persistence/account.mysql-entity";
import { FriendMysqlEntity } from "../../../account-persistence/friend.mysql-entity";

import { GetAccountService } from "../../../../domains/services/get-account.service";



const router = new Router();


router.get("/ping", async (req: any, res: any) => {
    res.json({ ping: "pong" });
})
router.get("/:email", async (req: any, res: any) => {
    const { email } = req.params;
    const accountPersistenceAdapterService = new AccountPersistenceAdapterService(
        AccountMysqlEntity.getInstance(),
        FriendMysqlEntity.getInstance()
    );

    const account = await new GetAccountService(accountPersistenceAdapterService).getAccount(email);

    const responseObj: any = { ...account };
    delete responseObj._password;
    res.json(responseObj);
})

module.exports = router;