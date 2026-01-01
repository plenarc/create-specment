import { outro, cancel } from '@clack/prompts';
import { CreateSpecmentOptions } from '../types/index.js';
import { InteractiveSetup } from '../core/interactive-setup.js';
import { ProjectGenerator } from '../core/project-generator.js';
import { MessageFormatter } from '../utils/message-formatter.js';
import { UserCancelledError, CLIError, handleError } from '../utils/errors.js';

export async function createSpecmentProject(
  projectName: string | undefined,
  options: CreateSpecmentOptions
): Promise<void> {
  try {
    const setup = new InteractiveSetup(options);
    const selections = await setup.run(projectName);
    
    const generator = new ProjectGenerator(selections, options);
    await generator.generate();

    // Show completion message
    outro('🎉 プロジェクトが正常に作成されました！');
    
    MessageFormatter.completion(selections.projectName, setup.language);

  } catch (error) {
    if (error instanceof UserCancelledError) {
      // Exit cleanly without showing error message
      return;
    }
    
    if (error instanceof CLIError) {
      handleError(error.message);
      throw error;
    }
    
    const message = error instanceof Error ? error.message : 'Unknown error';
    handleError(message, 'エラー');
    throw error;
  }
}