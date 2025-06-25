import awsLambdaFastify from "@fastify/aws-lambda";
import init from "./app";

const proxy = awsLambdaFastify(init());

export const handler = proxy;
// or
// export const handler = (event, context, callback) => proxy(event, context, callback);
// or
// export const handler = (event, context) => proxy(event, context);
// or
// export const handler = async (event, context) => proxy(event, context);
