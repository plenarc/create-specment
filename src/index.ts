#!/usr/bin/env node

import { Command } from 'commander';
import { createSpecmentProject } from './commands/create.js';
import { version } from './utils/version.js';
import { UserCancelledError, CLIError } from './utils/errors.js';

const program = new Command();

program
  .name('create-specment')
  .description('Interactive CLI tool for creating Docusaurus-based specification documentation projects')
  .version(version);

program
  .argument('[project-name]', 'Name of the project to create')
  .option('-t, --template <template>', 'Template to use (classic-spec, api-spec, technical-spec, enterprise-spec)')
  .option('--skip-install', 'Skip package installation')
  .option('--verbose', 'Enable verbose logging')
  .action(async (projectName: string | undefined, options) => {
    try {
      await createSpecmentProject(projectName, options);
    } catch (error) {
      if (error instanceof UserCancelledError) {
        // Exit cleanly without error message
        return;
      }
      
      if (error instanceof CLIError) {
        console.error(error.message);
        return;
      }
      
      console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  });

if (process.env.NODE_ENV !== 'test' && !process.env.VITEST) {
  program.parse();
}

export { program };