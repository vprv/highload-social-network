import { FindPersonQuery } from "../ports/in/find-person.query";
import { FindPesronPort } from "../ports/out/find-person.port";

export class FindPersonService implements FindPersonQuery {
    constructor(
        private readonly _findPersonPort: FindPesronPort
    ) { }

    async findPerson(name: string, last_name: string) {
        return await this._findPersonPort.findPerson(name, last_name)
    }
}