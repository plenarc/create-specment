import { spawn } from 'child_process';

export interface InstallOptions {
  verbose?: boolean;
}

export async function installDependencies(
  projectPath: string, 
  options: InstallOptions = {}
): Promise<void> {
  const { verbose = false } = options;
  
  return new Promise((resolve, reject) => {
    // niコマンドを使用（パッケージマネージャー統一）
    const child = spawn('ni', [], {
      cwd: projectPath,
      stdio: verbose ? 'inherit' : 'pipe',
      shell: true
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
        reject(new Error(`Installation failed with exit code ${code}${errorOutput ? `\n${errorOutput}` : ''}`));
      }
    });

    child.on('error', (error) => {
      reject(new Error(`Failed to execute install command: ${error.message}`));
    });

    // タイムアウト処理（5分）
    const timeout = setTimeout(() => {
      child.kill('SIGTERM');
      reject(new Error('Installation timed out after 5 minutes'));
    }, 5 * 60 * 1000);

    child.on('close', () => {
      clearTimeout(timeout);
    });
  });
}