import { IAnswer } from "./answer.model";

export interface IQuestion {
    id_question: string;
    question: string;
    answer: IAnswer[];
    id_user_created: string;
    full_name_created: string;
    time_created: Date;
}

export interface SaveQuestion {
    question: string;
    id_user_created: string;
    full_name_created: string;
    time_created: Date;
}