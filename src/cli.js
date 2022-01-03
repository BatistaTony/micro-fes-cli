import arg from "arg";

function parseArgsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--create": Boolean,
      "--config": Boolean,
      "-c": "--create",
      "--template": "Typescript" || "Javascript",
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    create: args["--create"] || false,
    config: args["--config"] || false,
    template: args["--template"] || "Javascript",
  };
}



export function cli(args) {
  let options = parseArgsIntoOptions(args);
  console.log(options);
}
