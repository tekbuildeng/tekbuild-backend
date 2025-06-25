import fastifyCors from "@fastify/cors";
import fp from "fastify-plugin";

export default fp(async (fastify) => {
  fastify.register(fastifyCors, {
    origin: "http://tekbuild-engenharia.com.br",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });
});
