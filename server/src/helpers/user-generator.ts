
const Fakerator = require("fakerator");
const fakerator = Fakerator();


const randomDate = (start: Date, end: Date) => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split("T")[0];
}

import { AccountPersistenceAdapterService } from "../modules/account-persistence/account-persistence-adapter.service";
import { AccountMysqlEntity } from "../modules/account-persistence/account.mysql-entity";
import { FriendMysqlEntity } from "../modules/account-persistence/friend.mysql-entity";
import { CreateAccountCommand } from "../domains/ports/in/create-account.command";
import { CreateAccountService } from "../domains/services/create-account.service";
import { FriendWindowEntity } from "../domains/entities/friend-window.entity";
import { AccountEntity } from "../domains/entities/account.entity";
const bcrypt = require('bcrypt');

async function createUser(email: string, password: string, name: string, last_name: string, birthdate: Date, gender: Boolean, interests: string, city: string) {

    const accountPersistenceAdapterService = new AccountPersistenceAdapterService(
        AccountMysqlEntity.getInstance(),
        FriendMysqlEntity.getInstance()
    );

    const createAccountService = new CreateAccountService(
        accountPersistenceAdapterService,
        accountPersistenceAdapterService
    )

    // const hashedPassword = await bcrypt.hash(password, 12);
    const hashedPassword = password;
    const friendWindow = new FriendWindowEntity();
    const account = new AccountEntity(
        email,
        hashedPassword,
        name,
        last_name,
        birthdate,
        gender,
        interests,
        city,
        friendWindow
    );

    return await createAccountService.createAccount(new CreateAccountCommand(account));

}



export async function userGenerator(count: number) {
    const arr = [];

    for (let i = 0; i < count; i++) {
        const gender = Math.random() > 0.6 ? true : false;
        const name = gender === false ? fakerator.names.firstNameF() : fakerator.names.lastNameM();
        const last = gender === false ? fakerator.names.lastNameF() : fakerator.names.lastNameM();

        const city = fakerator.address.city();
        const email = fakerator.internet.email(name, last) + "" + fakerator.lorem.word();

        const interests = fakerator.lorem.word();

        const birthdate = randomDate(new Date("1950-01-01"), new Date("2022-01-01"));

        arr.push({ email, name, last, gender, birthdate, city, interests });
        // const status = await createUser(email, "qwerty123", name, last, new Date(birthdate), gender, interests, city)
        //     .catch(e => {
        //         console.log(e)
        //     });
        console.log(status, i)
    }

    // const promises = arr.map(data => {
    //     const { email, name, last, birthdate, gender, interests, city } = data;
    //     return createUser(email, "qwerty123", name, last, new Date(birthdate), gender, interests, city);
    // })
    // Promise.all(promises);
    console.log("done")
    // console.table(arr)

}