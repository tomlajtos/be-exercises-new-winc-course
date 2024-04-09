//NOTE:
// the following concepts are not addressed at this section(routers), but at a later stage of the module:
// - request body validation
// - resource protection i.e. rate limiting (discussed in lessons about middleware)
// - adding persistent data storage

import express from "express";
import "dotenv/config"; // needed for accessing environment variables
import * as Sentry from "@sentry/node";
// import { nodeProfilingIntegration } from "@sentry/profiling-node";

import booksRouter from "./routes/books.js";
import recordsRouter from "./routes/records.js";
import loginRouter from "./routes/login.js";

import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
// init sentry at the earliest point of the app's lifecycle
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // nodeProfilingIntegration(),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  // profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// needed for the express app to parse incomming JSON in the request body
// (i.e. in post requests), it's a built in middleware function
app.use(express.json());

app.use(log);

app.use("/login", loginRouter);
app.use("/books", booksRouter); // attach all routes from books.js router module >> this enables relative URL paths inside books router
app.use("/records", recordsRouter); // attach all routes from records.js router module >> this enables relative URL paths inside books router

app.get("/", log, (req, res) => {
  const html = `<html><h1>Welcome to the Express Bookstore</h1> 
     <p>This is a test app to learn back-end programming with Express.js</p></html>`;
  res.send(html);
});

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());
// attach errorHandler after all other middleware and routes
// should be the last element of the chain
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port :3000");
});
