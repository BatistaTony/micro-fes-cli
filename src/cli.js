import arg from 'arg'


function parseArgsIntoOptions(rawArgs){
    const args = arg(
        {
            '--create': Boolean,
        "--config": Boolean,
    "-c": "--create"
}, {
            argv: rawArgs.slice(2)
        }
    )

    return {
        create: args['--create'] || false,
        config: args['--config'] || false
    }
}

export function cli(args){
    let options  = parseArgsIntoOptions(args)
    console.log(options)
}