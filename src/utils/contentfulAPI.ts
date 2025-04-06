import { createClient } from 'contentful';
import { ContentData, Step } from "../types";

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
        // console.log("Response from Contentful:", response);
        //
        // console.log("Items from Contentful:", response.items);

        const transformedData: any = response.items.map((item: any) => {
            const steps = item.fields.steps.map((step: any) => {
                return step.fields
            })

            const result = steps.map((step: any) => {
                return {
                    id : step.id,
                    questions: step.questions.map((question: any) => {
                        return question.fields
                    }),
                    questionOrder: step.questionOrder,
                }
            })
            return {
                steps: result,
            };
        })

        return transformedData;

    } catch (error) {
        console.error("Error fetching content:", error);
        return { steps: [] };
    }

};

fetchContent();
