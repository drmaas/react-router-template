import { json, LoaderFunctionArgs, TypedResponse } from "@remix-run/node";

export interface SampleLoaderResponse {
  message: string;
}

export const sampleLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<SampleLoaderResponse>> => {
  return json({ message: "sample loader response" }, { status: 200 });
};
