import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

export interface InstallOptions {
  verbose?: boolean;
}

export async function installDependencies(
  projectPath: string,
  options: InstallOptions = {},
): Promise<void> {
  const { verbose = false } = options;

  // パッケージマネージャーを検出
  const packageManager = detectPackageManager(projectPath);

  return new Promise((resolve, reject) => {
    const installCommand = getInstallCommand(packageManager);
    const child = spawn(installCommand.command, installCommand.args, {
      cwd: projectPath,
      stdio: verbose ? 'inherit' : 'pipe',
      shell: true,
    });

    let errorOutput = '';

    if (!verbose) {
      child.stderr?.on('data', (data) => {
        errorOutput += data.toString();
      });
    }

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(
            `Installation failed with exit code ${code}${errorOutput ? `\n${errorOutput}` : ''}`,
          ),
        );
      }
    });

    child.on('error', (error) => {
      reject(new Error(`Failed to execute install command: ${error.message}`));
    });

    // タイムアウト処理（5分）
    const timeout = setTimeout(
      () => {
        child.kill('SIGTERM');
        reject(new Error('Installation timed out after 5 minutes'));
      },
      5 * 60 * 1000,
    );

    child.on('close', () => {
      clearTimeout(timeout);
    });
  });
}

function detectPackageManager(projectPath: string): 'pnpm' | 'yarn' | 'npm' {
  // lockfileの存在を確認してパッケージマネージャーを検出
  if (existsSync(join(projectPath, '..', 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }
  if (existsSync(join(projectPath, '..', 'yarn.lock'))) {
    return 'yarn';
  }
  return 'npm';
}

function getInstallCommand(packageManager: string): { command: string; args: string[] } {
  switch (packageManager) {
    case 'pnpm':
      return { command: 'pnpm', args: ['install'] };
    case 'yarn':
      return { command: 'yarn', args: ['install'] };
    default:
      return { command: 'npm', args: ['install'] };
  }
}
