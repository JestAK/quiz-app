import React, { useState, useEffect, useRef } from 'react';
import { SingleChoice } from "./Components/SingleChoice";
import { MultipleChoice } from "./Components/MultipleChoice";
import { OpenEndedQuestion } from "./Components/OpenEndedQuestion";
import test_data from "./test_data.json";
import { FinalResult, Question } from "./types";
import { fetchContent } from "./utils/contentfulAPI";
import {ResultPage} from "./Components/ResultPage";

function App() {
    const answersRef = useRef<FinalResult[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [contentData, setContentData] = useState(test_data);
    const [isCompleted, setIsCompleted] = useState(false);
    const [score, setScore] = useState(0);

    const QuestionList = ({ step, handler }: { step: number, handler: (questionId: string, answer: FormDataEntryValue[]) => void }) => {
        const questions = contentData.steps[step].questions;
        const questionOrder = contentData.steps[step].questionOrder;
        return (
            <>
                {questionOrder.map((questionId: string) => {
                    const question = questions.find((q: Question) => q.id === questionId);
                    if (!question) return null;

                    switch (question.questionType) {
                        case "single_choice":
                            return <SingleChoice key={question.id.toString()} questionId={question.id.toString()} question={question.questionText} answerList={question.answers} handler={handler} />;
                        case "multiple_choice":
                            return <MultipleChoice key={question.id.toString()} questionId={question.id.toString()} question={question.questionText} answerList={question.answers} handler={handler} />;
                        case "open_ended":
                            return <OpenEndedQuestion key={question.id.toString()} questionId={question.id.toString()} question={question.questionText} answerList={[]} handler={handler} />;
                        default:
                            return null;
                    }
                })}
            </>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchContent();
            setContentData(data[0]);
            console.log("Fetched data:", data[0]);
        };
        fetchData();
    }, []);

    const handleAnswerChange = (questionId: string, answer: FormDataEntryValue[]) => {
        const newAnswers: FinalResult[] = [...answersRef.current];
        const index = newAnswers.findIndex((a: FinalResult) => a.questionId === questionId);
        if (index !== -1) {
            newAnswers[index].answer = answer;
        } else {
            newAnswers.push({ questionId, answer});
        }
        answersRef.current = newAnswers;
    };

    const isLastStep = currentStep === contentData.steps.length - 1;

    const checkAnswer = ({ questionId, answer }: FinalResult) => {
        const questions = contentData.steps.map((step: any) => step.questions).flat();
        console.log(`Questions ${JSON.stringify(questions)}`);
        const question = questions.find((q: any) => q.id === questionId);
        console.log(`Checking answer for question ID: ${questionId}, Answer: ${answer} rightAnswer: ${question?.rightAnswer}`);
        console.log(`Question: ${JSON.stringify(question)}`);

        if (question) {
            if (!question.rightAnswer) {
                return true;
            }

            const answersArray: string[] = Array.isArray(answer) ? answer.map(ans => String(ans)) : [String(answer)];

            const isCorrect =
                question.rightAnswer.every((ans: string) => answersArray.includes(ans)) &&
                answersArray.every((ans: string) => question.rightAnswer.includes(ans));

            return !!isCorrect;
        }

        return false;
    }

    const countTotalQuestions = (steps: any[]) => {
        let totalQuestions = 0;

        steps.forEach((step) => {
            totalQuestions += step.questions.length;
        });

        return totalQuestions;
    };

    const countScore = () => {
        let correctAnswers = 0;

        answersRef.current.forEach((answer) => {
            const isCorrect = checkAnswer(answer);
            console.log(`Question ID: ${answer.questionId}, Answer: ${answer.answer}, Correct: ${isCorrect}`);
            if (isCorrect) {
                correctAnswers++;
            }
        })

        setScore(parseFloat((correctAnswers/countTotalQuestions(contentData.steps) * 100).toFixed(2)));
    };

    const handleSend = () => {
        setIsCompleted(true);
    };

    return (
        <>
            {!isCompleted ? (
                <div className="app-container w-[80%] max-w-[1000px] min-h-dvh justify-self-center border-4 p-5">
                    <p>Step {currentStep + 1}/{contentData.steps.length}</p>
                    <div className="flex justify-between border-3 mb-5 flex-wrap">
                        <h1 className="text-5xl content-center mb-3">Step {currentStep + 1}</h1>
                        <div className="place-content-center">
                            <button
                                className="p-4 border-2 rounded-l-xl"
                                onClick={() => {
                                    if (currentStep > 0) {
                                        setCurrentStep(currentStep - 1);
                                    }
                                }}
                            >
                                &lt; Prev
                            </button>

                            {isLastStep ? (
                                <button
                                    className="p-4 border-2 rounded-r-xl"
                                    onClick={() => {
                                        countScore();
                                        handleSend();
                                    }}
                                >
                                    Send
                                </button>
                            ) : (
                                <button
                                    className="p-4 border-2 rounded-r-xl"
                                    onClick={() => {
                                        if (currentStep < contentData.steps.length - 1) {
                                            setCurrentStep(currentStep + 1);
                                        }
                                    }}
                                >
                                    Next &gt;
                                </button>
                            )}
                        </div>
                    </div>
                    <QuestionList step={currentStep} handler={handleAnswerChange} />
                </div>
            ) : (
                <ResultPage resultData={answersRef.current} questionData={contentData} score={score}/>
            )}
        </>
    );
}

export default App;
