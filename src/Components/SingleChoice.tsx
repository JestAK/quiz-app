import React from 'react';
import {QuestionProps} from "../types";

export const SingleChoice = ({questionId, question, answerList, handler} : QuestionProps) => {
    // console.log(questionId, question, answerList);

    return (
        <div className="single-question-container border-2 p-5 mb-2">
            <h2 className="text-2xl mb-3">{question}</h2>
            <form onChange={(e) => {
                const formData = new FormData(e.currentTarget);
                const selectedAnswer = e.currentTarget.value;

                const formValues = {
                    questionId: questionId.toString(),
                    answerIds: formData.getAll("question"),
                };

                handler(formValues.questionId, formValues.answerIds);

                e.currentTarget.value = selectedAnswer;

            }}>
                {answerList.map((answer) => (
                    <div key={answer.id} className="mb-2">
                        <input
                            type="radio"
                            id={answer.text}
                            name="question"
                            value={answer.text}
                            className="mr-2"
                        />
                        <label htmlFor={answer.text}>{answer.text}</label>
                    </div>
                ))}
            </form>
        </div>
    );
};