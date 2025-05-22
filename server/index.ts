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

// https://github.com/remix-run/examples/tree/main/socket.io

const viteDevServer =
    process.env.NODE_ENV === "production"
        ? undefined
        : await import("vite").then((vite) =>
            vite.createServer({
                server: { middlewareMode: true },
            }),
        );

const build = viteDevServer
    ? await viteDevServer.ssrLoadModule('virtual:react-router/server-build')
    : await import('../build/server/index.js' as string);

const httpServer = await build.entry.module.createApp(build, viteDevServer);

const port = process.env.PORT || 8080;

// instead of running listen on the Express app, do it on the HTTP server
httpServer.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`);
});

export { };