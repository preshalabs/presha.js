import { Command } from 'commander'
import { runDev } from './commands/dev'
import { runStart } from './commands/start'
import { runBuild } from './commands/build'

const program = new Command()

program
  .name('presha')
  .description('The CLI for presha.js framework')
  .version('0.1.0')

program.command('dev').description('Run development server').action(runDev)

program
  .command('build')
  .description('Prepare application for production')
  .action(runBuild)

program
  .command('start')
  .description('Generate code (routes, zod schemas, etc.)')
  .action(runStart)

program.parse(process.argv)
