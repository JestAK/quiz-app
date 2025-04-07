export interface QuestionProps {
    questionId: string;
    question: string;
    answerList: Answer[];
    handler: (questionId: string, answer: FormDataEntryValue[]) => void;
}

export interface Answer {
    id: number|string;
    text: string;
}

export interface Question {
    id: number|string;
    questionText: string;
    questionType: string;
    answers: Answer[];
    rightAnswer: string[];
}

export interface Step {
    id: string;
    questions: Question[];
}

export interface ContentData {
    steps: Step[];
}

export interface FinalResult {
    questionId: string;
    answer: Answer[]|FormDataEntryValue[];
}