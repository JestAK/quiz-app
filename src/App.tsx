import React from 'react';
import {SingleChoice} from "./Components/SingleChoice";
import {MultipleChoice} from "./Components/MultipleChoice";
import {OpenEndedQuestion} from "./Components/OpenEndedQuestion";
import test_data from "./test_data.json";

function App() {
    const answersTest = [
        { id: 1, text: 'A1' },
        { id: 2, text: 'A2' },
        { id: 3, text: 'A3' },
        { id: 4, text: 'A4' },
    ]



    const [answers, setAnswers] = React.useState({})
    const [currentStep, setCurrentStep] = React.useState(1);
    const contentData = test_data

    const handleAnswerChange = (questionId: number, answer: number[]|string) => {
        setAnswers((prevAnswers: any) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    }

  return (
      <>
        <div className="app-container w-[80%] max-w-[1000px] min-h-dvh justify-self-center border-4 p-5">
            <p>Step {currentStep}/{contentData.steps.length}</p>
            <div className="flex justify-between border-3 mb-5">
                <h1 className="text-5xl content-center">Step 1</h1>
                <div className="place-content-center">
                    <button className="p-4 border-2 rounded-l-xl">&lt; Prev</button>
                    <button className="p-4 border-2 rounded-r-xl">Next &gt;</button>
                </div>
            </div>
            <SingleChoice questionId = {"q1"} question = {"MyQuestion"} answers = {answersTest}/>
            <MultipleChoice questionId = {"q2"} question = {"MyMultipleQuestion"} answers = {answersTest}/>
            <OpenEndedQuestion questionId = {"q3"} question = {"MyOpenEndedQuestion"} answers = {[]}/>
        </div>
      </>

  );
}

export default App;
