import React from "react";
import {QuestionProps} from "../types";

export const OpenEndedQuestion = ({questionId, question, answerList, handler} : QuestionProps) => {

    return (
        <div className="single-question-container border-2 p-5 mb-2">
            <h2 className="text-2xl mb-3">{question}</h2>
            <form onChange={(e) => {
                const formData = new FormData(e.currentTarget);

                const formValues = {
                    questionId: questionId,
                    answer: formData.getAll("question"),
                };

                handler(formValues.questionId, formValues.answer);
            }}>
                <div key={1} className="mb-2">
                    <textarea className="w-full border-2 p-2"
                              placeholder="Enter your answer"
                              name="question"
                    ></textarea>
                </div>
            </form>
        </div>
    );
};