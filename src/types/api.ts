import { User } from "@prisma/client";

//########## Account ############//

export interface GetAccountsResponse {
    user: User;
}

export interface EditAccountPayload {
    userId: string;
    name?: string;
    image?: string;
}

export interface EditAccountResponse {
    user: User;
}
