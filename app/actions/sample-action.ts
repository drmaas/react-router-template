import {
    ActionFunctionArgs,
    data,
} from '@remix-run/node';

export interface SampleActionResponse {
    message?: string;
    error?: string;
}

export const sampleAction = async ({
    request,
}: ActionFunctionArgs) => {
    console.log('post url: ', request.url);
    try {
        return data(
            { message: 'Sample action complete!' },
            { status: 201 }
        );
    } catch (error) {
        return data({ error: (error as Error).message }, { status: 400 });
    }
}