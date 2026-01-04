import { mkdir, writeFile } from 'fs/promises';
import { join, resolve } from 'path';
import { existsSync } from 'fs';
import { spinner, note } from '@clack/prompts';
import type { UserSelections, CreateSpecmentOptions } from '../types/index.js';
import { generatePackageJson } from '../generators/package-json.js';
import { generateDocusaurusConfig } from '../generators/docusaurus-config.js';
import { copyTemplateFiles } from '../generators/template-files.js';
import { installDependencies } from '../utils/install.js';

export class ProjectGenerator {
  private projectPath: string;

  constructor(
    private selections: UserSelections,
    private options: CreateSpecmentOptions,
  ) {
    this.projectPath = resolve(process.cwd(), selections.projectName);
  }

  async generate(): Promise<void> {
    const s = spinner();

    try {
      // Check if directory exists
      if (existsSync(this.projectPath)) {
        throw new Error(`Directory "${this.selections.projectName}" already exists`);
      }

      // Create project structure
      s.start('プロジェクト構造を作成中...');
      await this.createProjectStructure();
      s.stop('プロジェクト構造を作成しました');

      // Generate config files
      s.start('設定ファイルを生成中...');
      await this.generateConfigFiles();
      s.stop('設定ファイルを生成しました');

      // Copy template content
      s.start('テンプレートファイルをコピー中...');
      await this.copyTemplateContent();
      s.stop('テンプレートファイルをコピーしました');

      // Install dependencies
      if (!this.options.skipInstall) {
        s.start('依存関係をインストール中...');
        try {
          await installDependencies(this.projectPath, { verbose: false });
          s.stop('依存関係をインストールしました');
        } catch (_error) {
          s.stop('依存関係のインストールに失敗しました');
          note(
            'プロジェクトは作成されましたが、依存関係のインストールに失敗しました。\n手動でインストールしてください:\n\n' +
              `cd ${this.selections.projectName}\nni`,
            '警告',
          );
        }
      }
    } catch (error) {
      s.stop('エラーが発生しました');
      throw error;
    }
  }

  private async createProjectStructure(): Promise<void> {
    // Create project root directory
    await mkdir(this.projectPath, { recursive: true });

    // Create basic directory structure
    const directories = ['docs', 'src/css', 'src/components', 'static/img'];

    for (const dir of directories) {
      const dirPath = join(this.projectPath, dir);
      await mkdir(dirPath, { recursive: true });
    }
  }

  private async generateConfigFiles(): Promise<void> {
    // Generate package.json
    const packageJson = generatePackageJson(this.selections);
    await writeFile(join(this.projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));

    // Generate docusaurus.config.ts
    const docusaurusConfig = generateDocusaurusConfig(this.selections);
    await writeFile(join(this.projectPath, 'docusaurus.config.ts'), docusaurusConfig);
  }

  private async copyTemplateContent(): Promise<void> {
    await copyTemplateFiles(this.selections, this.projectPath);
  }
}
