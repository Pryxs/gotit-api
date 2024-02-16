import { TokenType } from "../types";

export const mustBeOwner = (user: TokenType): any => ({
    ...(user.role !== 'admin' && {
        author: user.id
    })
});
