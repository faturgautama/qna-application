import { environment } from "src/environments/environment";

export const USER_GET_BY_ID = `${environment.webApiUrl}/user/`;
export const USER_GET_ALL = `${environment.webApiUrl}/user.json`;
export const USER_SAVE = `${environment.webApiUrl}/user.json`;

export const QUESTION_GET = `${environment.webApiUrl}/question.json`;
export const QUESTION_SAVE = `${environment.webApiUrl}/question.json`;
export const QUESTION_GET_BY_ID = `${environment.webApiUrl}/question/`;
export const QUESTION_DELETE = `${environment.webApiUrl}/question/`;

export const ANSWER_GET = `${environment.webApiUrl}/answer.json`;
export const ANSWER_SAVE = `${environment.webApiUrl}/question/`;
export const ANSWER_GET_BY_ID = `${environment.webApiUrl}/answer/`;
export const ANSWER_DELETE = `${environment.webApiUrl}/answer/`;
