import { useFetcher, useLoaderData } from '@remix-run/react';
import PageContainer from '~/components/PageContainer';
import { sampleLoader } from '~/loaders/sample-loader';

export const loader = sampleLoader;

export default function Index() {
    const { message } = useLoaderData<typeof loader>();
    const fetcher = useFetcher();

    const handleButtonClick = () => {
        fetcher.submit(null, {
            method: 'post',
            action: '/sample-action',
        });
    };

    return (
        <PageContainer>
            <p className="text-2xl font-semibold mb-8">
                Welcome to the Remix App Template.
                <br />
                This template uses a custom express server to power server-rendered pages and APIs.
                <br />
                {message}
            </p>
            <button
                onClick={handleButtonClick}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Execute Action
            </button>
        </PageContainer>
    );
}
