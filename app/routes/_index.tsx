import { useFetcher, useLoaderData } from "react-router";
import { useEffect, useState } from "react";
import PageContainer from "~/components/PageContainer";
import { sampleLoader } from "~/loaders/sample-loader";

export const loader = sampleLoader;

export default function Index() {
  const { message } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleButtonClick = () => {
    fetcher.submit(null, {
      method: "post",
      action: "/sample-action",
    });
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      const msg =
        typeof fetcher.data === "string"
          ? fetcher.data
          : fetcher.data.message || "Action completed!";
      setToastMsg(msg);
      // Hide toast after 3 seconds
      const timer = setTimeout(() => setToastMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <PageContainer>
      {toastMsg && (
        <div className="fixed top-4 z-50 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in">
          {toastMsg}
        </div>
      )}
      <p className="text-2xl font-semibold mb-8">
        Welcome to the React Router Template.
        <br />
        This template uses a custom express server to power server-rendered
        pages and APIs.
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
