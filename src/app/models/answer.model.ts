export interface IAnswer {
    id_question: string;
    id_answer: string;
    answer: string;
    id_user_created: string;
    full_name_created: string;
    time_created: Date;
}

export interface SaveAnswer {
    id_question: string;
    answer: string;
    id_user_created: string;
    full_name_created: string;
    time_created: Date;
}