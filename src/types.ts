export interface QuestionProps {
    questionId: string;
    question: string;
    answerList: Answer[];
    handler: (questionId: string, answer: FormDataEntryValue[]) => void;
}

export interface Answer {
    id: string;
    text: string;
}

export interface Question {
    id: string;
    questionText: string;
    questionType: string;
    answers: Answer[];
}

export interface FinalResult {
    questionId: string;
    answer: Answer[]|FormDataEntryValue[];
}