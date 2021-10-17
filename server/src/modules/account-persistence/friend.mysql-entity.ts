import { AccountId } from "../../domains/entities/account.entity";
import { FriendEntity } from "../../domains/entities/friend.entity";

import { Mysql } from "../mysql/mysql";

export class FriendMysqlEntity {
    constructor(
        private _id: number | null,
        private _source_account_id: AccountId,
        private _target_account_id: AccountId,
        private _timestamp: Date
    ) { }

    static getInstance(): FriendMysqlEntity {
        const friend = new FriendEntity(null, "", "", new Date())
        return new FriendMysqlEntity(friend.id, friend.sourceAccountId, friend.targetAccountId, friend.timestamp)
    }

    get id(): number | null {
        return this._id;
    }

    get sourceAccountId(): AccountId {
        return this._source_account_id
    }

    get targetAccountId(): AccountId {
        return this._target_account_id;
    }

    get timestamp(): Date {
        return this._timestamp;
    }


    async getAll(accountId: AccountId): Promise<FriendMysqlEntity[]> {
        const sql = `
        SELECT * FROM friends
        WHERE source_account_id = "${accountId}" OR target_account_id = "${accountId}"
        `;
        const result = await Mysql.executeQuery(sql);
        if (!Array.isArray(result) && result.length === 0) return [];

        return result.map((row: any) => new FriendMysqlEntity(row.id, row.source_account_id, row.target_account_id, row.timestamp));
    }

    async save(): Promise<Boolean> {
        const sql = `
            INSERT INTO friends (id,source_account_id,target_account_id,\`timestamp\`)
            VALUES (?,?, ?, ?);
        `;
        await Mysql.executeQuery(sql, [this._id, this._source_account_id, this._target_account_id, this._timestamp]);
        return true;
    }
}