export interface QuestionProps {
    questionId: string;
    question: string;
    answers: { id: number; text: string }[];
}