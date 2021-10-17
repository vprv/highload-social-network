import { AccountId } from "../../domains/entities/account.entity";
import { Mysql } from "../mysql/mysql";
export class AccountMysqlEntity {
    constructor(
        public account_id: string,
        public password: string,
        public name: string,
        public last_name: string,
        public birthdate: Date,
        public gender: Boolean,
        public city: string,
        public interests: string
    ) { }

    static getInstance(): AccountMysqlEntity {
        return new AccountMysqlEntity("", "", "", "", new Date(), true, "", "");
    }

    async findOne(accountId: AccountId) {
        const sql = `
            SELECT * FROM accounts WHERE account_id = "${accountId}"
        `;

        const result = await Mysql.executeQuery(sql);
        if (!Array.isArray(result) || result.length === 0) return null;

        const { account_id, password, name, last_name, birthdate, gender, city, interests } = result[0];
        return new AccountMysqlEntity(account_id, password, name, last_name, birthdate, gender, city, interests);
    }

    async save(): Promise<Boolean> {

        const sqlAccountInfo = `
            INSERT INTO accounts (account_id,password,name,last_name,birthdate,gender,city,interests)
            VALUES (?,?,?,?,?,?,?,?);
        `;
        const dataAccountInfo = [
            this.account_id,
            this.password,
            this.name,
            this.last_name,
            this.birthdate,
            this.gender,
            this.city,
            this.interests,
        ];

        await Mysql.executeQuery(sqlAccountInfo, dataAccountInfo);
        return true;
    }
}