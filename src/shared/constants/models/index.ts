import { createAction } from "@reduxjs/toolkit";

export const enum ErrorCode {
    UNAUTHORIZED = 401,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    FORBIDDEN = 403,
    SUCCESS = 200
}

export const revertAll = createAction('REVERT_ALL')
