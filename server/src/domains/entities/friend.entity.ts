import { AccountId } from "./account.entity";

export class FriendEntity {
    constructor(
        private readonly _id: number | null,
        private readonly _sourceAccountId: AccountId,
        private readonly _targetAccountId: AccountId,
        private readonly _timestamp: Date
    ) { }

    get id(): number | null {
        return this._id;
    }

    get sourceAccountId(): AccountId {
        return this._sourceAccountId;
    }

    get targetAccountId(): AccountId {
        return this._targetAccountId;
    }

    get timestamp(): Date {
        return this._timestamp;
    }
}