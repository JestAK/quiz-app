import {FinalResult} from "../types";
import {ResultComponent} from "./ResultComponent";

export const ResultPage = ({resultData, questionData, score} : any) => {
    const getQuestionText = (questionId: string) => {
        for (const step of questionData.steps) {
            const question = step.questions.find((q: any) => q.id === questionId);
            if (question) {
                return question.questionText;
            }
        }
        return "Unknown Question";
    }


    return (
        <div className="result-page-container w-[80%] max-w-[1000px] min-h-dvh justify-self-center border-4 p-5">
            <h1 className="text-center text-5xl mb-5">Result Page</h1>
            <h2 className="text-center text-3xl mb-5">Your Score: {score}%</h2>
            {resultData.map((item: FinalResult, index: number) => (
                <ResultComponent key={index} question={getQuestionText(item.questionId)} answer={item.answer.join(", ")}/>
            ))}
        </div>
    );
}