import { FastifyPluginAsync } from "fastify";
import { FastifyTypedInstance } from "../../types";
import { getMailClient } from "../../lib/nodemailer";

const email: FastifyPluginAsync = async (fastify: FastifyTypedInstance) => {
  fastify.post(
    "/",
    {
      schema: {
        body: {
          type: "object",
          required: ["from", "subject", "text"],
          properties: {
            from: { type: "string", format: "email" },
            subject: { type: "string", minLength: 1 },
            text: { type: "string", minLength: 1 },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string" },
              info: { type: "object" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { from, subject, text } = request.body as {
          from: string;
          subject: string;
          text: string;
        };

        const transporter = await getMailClient();
        const info = await transporter.sendMail({
          from: `"TekBuild Engenharia" <${process.env.NAO_RESPONDER_EMAIL}>`,
          to: `contato@tekbuild-engenharia.com.br`,
          subject,
          text,
        });

        return { message: "E-mail enviado!", info };
      } catch (error) {
        fastify.log.error(error);
        reply.status(500).send({
          error: "Failed to send email",
          message: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }
  );
};

export default email;
