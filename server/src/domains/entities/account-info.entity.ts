import { AccountId } from "./account.entity";

export class AccountInfoEntity {
    constructor(
        private readonly _id: AccountId,
        private readonly _name: string,
        private readonly _last_name: string,
        private readonly _birthday: Date,
        private readonly _gender: Boolean,
        private readonly _interests: string[],
        private readonly _city: string
    ) { }

    get id(): AccountId {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get lastName(): string {
        return this._last_name
    }
    get age(): number {
        return Math.floor((new Date().getTime() - this._birthday.getTime()) / 3.15576e+10)
    }

    get gender(): string {
        return this._gender ? "m" : "f";
    }

    get interests(): string[] {
        return this._interests;
    }

    get city(): string {
        return this._city
    }
}