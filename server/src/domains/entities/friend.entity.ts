import { AccountId } from "./account.entity";

export class FriendEntity {
    constructor(
        private readonly _sourceAccountId: AccountId,
        private readonly _targetAccountId: AccountId,
        private readonly _timestamp: Date
    ) { }

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