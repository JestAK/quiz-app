export const ResultComponent = ({question, answer} : any) => {
    return (
        <div className="border-2 p-5 mb-2">
            <h2 className="text-2xl font-bold">Question: {question}</h2>
            <p>Answer: {answer}</p>
        </div>
    );
}