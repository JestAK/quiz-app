import { createClient } from 'contentful';

const client = createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE_ID!,
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN!,
});

export const fetchContent = async () => {
    try {
        const response = await client.getEntries({
            content_type: 'steps',
            include: 3,
        });

        console.log("Response from Contentful:", response);

        const transformedData: any = response.items.map((item: any) => {
            const steps = item.fields.steps.map((step: any) => {
                return step.fields
            })

            const result = steps.map((step: any) => {
                return {
                    id : step.id.toString(),
                    questions: step.questions.map((question: any) => {
                        return {
                            id: question.fields.id.toString(),
                            questionText: question.fields.questionText,
                            questionType: question.fields.questionType,
                            answers: (question.fields.answers ?? []).map((answer: any, index: number) => {
                                return {
                                    id: (index+1).toString(),
                                    text: answer,
                                }
                            }),
                            rightAnswer: question.fields.rightAnswer,
                        }
                    }),
                    questionOrder: step.questionOrder,
                }
            })

            return {
                steps: result,
            };
        })

        console.log("Transformed Data:", transformedData);
        return transformedData;

    } catch (error) {
        console.error("Error fetching content:", error);
        return { steps: [] };
    }

};

fetchContent();
