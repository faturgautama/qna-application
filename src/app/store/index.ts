import { ActionReducerMap } from "@ngrx/store";
import { IAnswer } from "../models/answer.model";
import { IQuestion } from "../models/question.model";
import { IUser } from "../models/user.model";
import { answerReducer } from "./reducer/answer.reducer";
import { questionReducer } from "./reducer/question.reducer";
import { registerReducer } from "./reducer/register.reducer";

interface MainReducer {
    register: IUser,
    question: IQuestion,
    answer: IAnswer,
}

export const reducer: ActionReducerMap<MainReducer> = {
    register: registerReducer,
    question: questionReducer,
    answer: answerReducer,
}