import fp from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export default fp(async (fastify) => {
  fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: "TEKBUILD API",
        description: "API documentation for TEKBUILD",
        version: "1.0.0",
      },
    },
  });
  fastify.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  });
});
