console.log("Hello from server");




import mysql from "mysql"
import { AccountEntity } from "./src/domains/entities/account.entity";
import { FriendWindowEntity } from "./src/domains/entities/friend-window.entity";
import { FriendEntity } from "./src/domains/entities/friend.entity";
import { CreateAccountCommand } from "./src/domains/ports/in/create-account.command";
import { CreateAccountService } from "./src/domains/services/create-account.service";
import { AccountPersistenceAdapterService } from "./src/modules/account-persistence/account-persistence-adapter.service";
import { AccountMapper } from "./src/modules/account-persistence/account.mapper";
import { AccountMysqlEntity } from "./src/modules/account-persistence/account.mysql-entity";
import { FriendMysqlEntity } from "./src/modules/account-persistence/friend.mysql-entity";



async function executeQuery(sql: string, data: Object | Array<Object> | null = null): Promise<any> {
    return new Promise((resolve, reject) => {

        const poolConfig = {
            host: "localhost",
            user: "root",
            password: "mypass1234",
            insecureAuth: true,
            database: "sn"
        }
        const pool = mysql.createPool(poolConfig)

        pool.getConnection((err: any, connection: any) => {
            if (err) return reject(err);
            connection.query(sql, data, (err: any, result: any) => {
                connection.release();
                if (err) return reject(err);
                resolve(result);
            });
        });
    });
}



async function createAccount_test() {
    const friendWindow = new FriendWindowEntity()
    const account1 = new AccountEntity(
        "acc1",
        "adlfj",
        "aldkjf",
        new Date("1994-11-11"),
        true,
        "nope",
        "Don",
        friendWindow
    )

    const account2 = new AccountEntity(
        "acc2",
        "Elalfdj",
        "Lelkcvjlzckj",
        new Date("2021-01-01"),
        false,
        "Lclkjvlksjdf",
        "LOEoclvljl",
        friendWindow
    )


    const account3 = new AccountEntity(
        "acc3",
        "Llckjv",
        "jlzckj",
        new Date("2021-01-01"),
        false,
        "alclkcvjl",
        "LOEl",
        friendWindow
    )


    const account = account3
    const accountPersistenceAdapterService = new AccountPersistenceAdapterService(
        AccountMysqlEntity.getInstance(),
        FriendMysqlEntity.getInstance()
    )
    const command = new CreateAccountCommand(account);
    const service = new CreateAccountService(
        accountPersistenceAdapterService,
        accountPersistenceAdapterService
    )

    try {
        await service.createAccount(command);
        console.log("done")
    }
    catch (e) {
        console.log(e)
    }

}


createAccount_test()