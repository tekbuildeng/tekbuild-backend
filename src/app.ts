import Fastify from "fastify";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { join } from "path";
import { ZodTypeProvider } from "fastify-type-provider-zod";

function init() {
  const fastify = Fastify().withTypeProvider<ZodTypeProvider>();

  const pluginOptions: Partial<AutoloadPluginOptions> = {
    // Place your custom options the autoload plugin below here.
  };

  fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: pluginOptions,
  });

  fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: pluginOptions,
  });
  return fastify;
}

// localhost || ::
/* 
fastify.listen(
  { port: Number(process.env.PORT) || 3000, host: "::" },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`🦊 Fastify is running at ${address}`);
  }
);
*/

if (require.main === module) {
  // called directly i.e. "node app"
  init().listen({ port: 3000 }, (err) => {
    if (err) console.error(err);
    console.log("server listening on 3000");
  });
} else {
  // required as a module => executed on aws lambda
  module.exports = init;
}

export default init;
