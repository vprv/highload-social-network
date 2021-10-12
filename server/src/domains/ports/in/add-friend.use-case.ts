import { AddFriendCommand } from "./add-friend.command";

export interface AddFriendUseCase {
    addFriend(command: AddFriendCommand): Promise<Boolean>;
}