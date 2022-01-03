import arg from "arg";
import inquirer from "inquirer";

function parseArgsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--create": Boolean,
      "--config": Boolean,
      "-c": "--create",
      "--git": Boolean
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    create: args["--create"] || false,
    config: args["--config"] || false,
    git: args["--git"] ||  false
  };
}

async function promptForMissingOptions(options) {
  const defaultTemplate = "Javascript";

  if(!options.create){
      return {
          ...options
      }
  }

//   if (!options.template) {
//     return { ...options, template: options.template || defaultTemplate };
//   }


  const questions = []
  if(!options.template){
      questions.push({
          type: "list",
          name: "template",
          message: "Please choose a template for you application",
          choices: ["Javascript", "Typescript"],
          default: defaultTemplate
      })
  }

  if(!options.git){
    questions.push({
        type: "confirm",
        name: "git",
        message: "Initialize a repository",
        default: false
    })
}

const answers = await inquirer.prompt(questions)
return  {
    ...options,
    template: options.template  || answers.template,
    git: options.git  || answers.git
}
}

export async  function cli(args) {
  let options = parseArgsIntoOptions(args);
  const answers = await  promptForMissingOptions(options)
  console.log(answers);
}
