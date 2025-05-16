// created via npx remix reveal entry.server

import { PassThrough } from 'node:stream';

import { createRequestHandler } from '@remix-run/express';
import type {
    EntryContext,
    ServerBuild,
} from '@remix-run/node';
import { createReadableStreamFromReadable } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import * as isbotModule from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import { ViteDevServer } from 'vite';
import { createServer } from 'http';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';

const ABORT_DELAY = 5_000;

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext,
) {
    const prohibitOutOfOrderStreaming =
        isBotRequest(request.headers.get('user-agent')) ||
        remixContext.isSpaMode;

    return prohibitOutOfOrderStreaming
        ? handleBotRequest(
              request,
              responseStatusCode,
              responseHeaders,
              remixContext
          )
        : handleBrowserRequest(
              request,
              responseStatusCode,
              responseHeaders,
              remixContext
          );
}

// We have some Remix apps in the wild already running with isbot@3 so we need
// to maintain backwards compatibility even though we want new apps to use
// isbot@4.  That way, we can ship this as a minor Semver update to @remix-run/dev.
function isBotRequest(userAgent: string | null) {
    if (!userAgent) {
        return false;
    }

    // isbot >= 3.8.0, >4
    if ('isbot' in isbotModule && typeof isbotModule.isbot === 'function') {
        return isbotModule.isbot(userAgent);
    }

    // isbot < 3.8.0
    if ('default' in isbotModule && typeof isbotModule.default === 'function') {
        return isbotModule.default(userAgent);
    }

    return false;
}

function handleBotRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    return new Promise((resolve, reject) => {
        let shellRendered = false;
        const { pipe, abort } = renderToPipeableStream(
            <RemixServer
                context={remixContext}
                url={request.url}
                abortDelay={ABORT_DELAY}
            />,
            {
                onAllReady() {
                    shellRendered = true;
                    const body = new PassThrough();
                    const stream = createReadableStreamFromReadable(body);

                    responseHeaders.set('Content-Type', 'text/html');

                    resolve(
                        new Response(stream, {
                            headers: responseHeaders,
                            status: responseStatusCode,
                        })
                    );

                    pipe(body);
                },
                onShellError(error: unknown) {
                    reject(error);
                },
                onError(error: unknown) {
                    responseStatusCode = 500;
                    // Log streaming rendering errors from inside the shell.  Don't log
                    // errors encountered during initial shell rendering since they'll
                    // reject and get logged in handleDocumentRequest.
                    if (shellRendered) {
                        console.error(error);
                    }
                },
            }
        );

        setTimeout(abort, ABORT_DELAY);
    });
}

function handleBrowserRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    return new Promise((resolve, reject) => {
        let shellRendered = false;
        const { pipe, abort } = renderToPipeableStream(
            <RemixServer
                context={remixContext}
                url={request.url}
                abortDelay={ABORT_DELAY}
            />,
            {
                onShellReady() {
                    shellRendered = true;
                    const body = new PassThrough();
                    const stream = createReadableStreamFromReadable(body);

                    responseHeaders.set('Content-Type', 'text/html');

                    resolve(
                        new Response(stream, {
                            headers: responseHeaders,
                            status: responseStatusCode,
                        })
                    );

                    pipe(body);
                },
                onShellError(error: unknown) {
                    reject(error);
                },
                onError(error: unknown) {
                    responseStatusCode = 500;
                    // Log streaming rendering errors from inside the shell.  Don't log
                    // errors encountered during initial shell rendering since they'll
                    // reject and get logged in handleDocumentRequest.
                    if (shellRendered) {
                        console.error(error);
                    }
                },
            }
        );

        setTimeout(abort, ABORT_DELAY);
    });
}

// start of custom code
// https://github.com/remix-run/remix/discussions/9790#discussioncomment-10625633
export const createApp = async (
    build: ServerBuild,
    viteDevServer: ViteDevServer
) => {
    const remixHandler = createRequestHandler({
        build,
    });

    const app = express();

    // You need to create the HTTP server from the Express app
    const httpServer = createServer(app);

    // http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
    app.disable('x-powered-by');

    // handle asset requests
    if (viteDevServer) {
        app.use(viteDevServer.middlewares);
    } else {
        // Vite fingerprints its assets so we can cache forever.
        app.use(
            '/assets',
            express.static('build/client/assets', {
                immutable: true,
                maxAge: '1y',
            })
        );
    }

    // Everything else (like favicon.ico) is cached for an hour. You may want to be
    // more aggressive with this caching.
    app.use(express.static('build/client', { maxAge: '1h' }));

    // misc middleware
    app.use(compression());
    app.use(morgan('tiny'));

    // handle SSR requests
    app.all('*', remixHandler);

    // handle shutdown
    process.on('SIGINT', handleShutdown); // Handle Ctrl+C
    process.on('SIGTERM', handleShutdown); // Handle termination signals

    return httpServer;
};

const handleShutdown = async (signal: NodeJS.Signals) => {
    console.log(`Received ${signal}, shutting down gracefully...`);
    try {
        const vstore = await vectorstore;
        await vstore.end(); // Close DB connection
        console.log('Database connection closed.');
    } catch (error) {
        console.error('Error closing database connection:', error);
    } finally {
        process.exit(0); // Exit with success code
    }
};
