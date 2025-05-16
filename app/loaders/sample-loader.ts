import { data, LoaderFunctionArgs } from "@remix-run/node";

export interface SampleLoaderResponse {
  message: string;
}

export const sampleLoader = async ({
  request,
}: LoaderFunctionArgs) => {
  return data({ message: `sample loader response: ${request.url}` }, { status: 200 });
};
