// Copyright 2025 Daniel Maas
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "react-router";

import "./tailwind.css";
import { SampleContextProvider } from "./context/sample-context";

export function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <SampleContextProvider>
      <div className="flex h-screen">
        <div className={`flex-1 flex flex-col bg-gray-400`}>
          <main className="flex-1 p-6 mt-16">
            <Outlet />
          </main>
        </div>
      </div>
    </SampleContextProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html lang="en">
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <p className="p-4">Oops! You went off the rails :)</p>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
