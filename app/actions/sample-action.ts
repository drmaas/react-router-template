import {
    ActionFunctionArgs,
    json,
    TypedResponse,
} from '@remix-run/node';

export interface SampleActionResponse {
    message?: string;
    error?: string;
}

export const sampleAction = async ({
    request,
}: ActionFunctionArgs): Promise<TypedResponse<SampleActionResponse>> => {
    console.log('post url: ', request.url);
    try {
        return json(
            { message: 'Sample action complete!' },
            { status: 201 }
        );
    } catch (error) {
        return json({ error: (error as Error).message }, { status: 400 });
    }
}