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
    ? await viteDevServer.ssrLoadModule('virtual:remix/server-build')
    : await import('../build/server/index.js' as string);

const httpServer = await build.entry.module.createApp(build, viteDevServer);

const port = process.env.PORT || 8080;

// instead of running listen on the Express app, do it on the HTTP server
httpServer.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`);
});

export { };