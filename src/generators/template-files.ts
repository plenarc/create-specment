import { mkdir, writeFile, access, cp } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { existsSync, constants } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { UserSelections } from '../types/index.js';
import { createTemplateProcessor, type TemplateProcessor } from '../utils/template-processor.js';
import { getTemplateDefinition } from '../templates/template-definitions.js';

// プロジェクト内のテンプレートディレクトリのパス
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATE_DOCS_PATH = resolve(__dirname, '../../templates/docs');

export async function copyTemplateFiles(
  selections: UserSelections,
  projectPath: string,
): Promise<void> {
  const { templates, projectName } = selections;

  // プロジェクトパスの検証
  await validateProjectPath(projectPath);

  // テンプレートプロセッサーを作成（最初のテンプレートをベースにする）
  const primaryTemplate = templates[0];
  const processor = await createTemplateProcessor(projectName, {
    templateName: primaryTemplate.name,
    templateDisplayName: primaryTemplate.displayName,
  });

  // 全テンプレートのディレクトリ構造を統合
  const combinedStructure = combineTemplateStructures(templates);

  // ディレクトリ構造を作成
  await createDirectoryStructure(projectPath, combinedStructure);

  // 各テンプレートのファイルを生成
  for (const template of templates) {
    const templateDef = getTemplateDefinition(template.name);
    if (!templateDef) {
      console.warn(`Template definition not found for: ${template.name}`);
      continue;
    }

    // サンプルコンテンツを生成
    await generateSampleContent(projectPath, templateDef.sampleContent, processor);
  }

  // 基本ファイルを生成（最初のテンプレートベース）
  await generateSidebarsConfig(projectPath, primaryTemplate.name, processor);

  // 参考リポジトリから基本ファイルをコピー
  await copyFromReferenceRepo(projectPath, ['introduction']);

  // intro.mdもコピー
  const introSourcePath = join(TEMPLATE_DOCS_PATH, 'intro.md');
  const introTargetPath = join(projectPath, 'docs', 'intro.md');

  if (existsSync(introSourcePath)) {
    try {
      await cp(introSourcePath, introTargetPath);
      console.log('Copied intro.md from template');
    } catch (error) {
      console.warn(`Failed to copy intro.md: ${error}`);
    }
  }

  // 各テンプレートに対応するディレクトリをコピー
  for (const template of templates) {
    await copyTemplateDirectory(projectPath, template.name);
  }

  await generateCustomCSS(projectPath);
  await generateStaticFiles(projectPath, processor);
}

function combineTemplateStructures(templates: any[]): any {
  const combined = {
    docs: new Set<string>(),
    static: new Set<string>(),
    src: new Set<string>(),
  };

  for (const template of templates) {
    const templateDef = getTemplateDefinition(template.name);
    if (templateDef?.directoryStructure) {
      if (templateDef.directoryStructure.docs) {
        for (const dir of templateDef.directoryStructure.docs) {
          combined.docs.add(dir);
        }
      }
      if (templateDef.directoryStructure.static) {
        for (const dir of templateDef.directoryStructure.static) {
          combined.static.add(dir);
        }
      }
      if (templateDef.directoryStructure.src) {
        for (const dir of templateDef.directoryStructure.src) {
          combined.src.add(dir);
        }
      }
    }
  }

  return {
    docs: Array.from(combined.docs),
    static: Array.from(combined.static),
    src: Array.from(combined.src),
  };
}

async function validateProjectPath(projectPath: string): Promise<void> {
  const resolvedPath = resolve(projectPath);

  // ディレクトリが存在することを確認
  if (!existsSync(resolvedPath)) {
    throw new Error(`Project directory does not exist: ${resolvedPath}`);
  }

  // 書き込み権限を確認
  try {
    await access(resolvedPath, constants.W_OK);
  } catch (_error) {
    throw new Error(`No write permission for directory: ${resolvedPath}`);
  }
}

async function createDirectoryStructure(projectPath: string, structure: any): Promise<void> {
  // 基本ディレクトリを作成
  const baseDirectories = ['docs', 'src/css', 'src/components', 'static/img'];

  for (const dir of baseDirectories) {
    const dirPath = join(projectPath, dir);
    await mkdir(dirPath, { recursive: true });
  }

  // テンプレート固有のディレクトリを作成
  if (structure.docs) {
    for (const docDir of structure.docs) {
      const dirPath = join(projectPath, 'docs', docDir);
      await mkdir(dirPath, { recursive: true });
    }
  }

  if (structure.static) {
    for (const staticDir of structure.static) {
      const dirPath = join(projectPath, 'static', staticDir);
      await mkdir(dirPath, { recursive: true });
    }
  }

  if (structure.src) {
    for (const srcDir of structure.src) {
      const dirPath = join(projectPath, 'src', srcDir);
      await mkdir(dirPath, { recursive: true });
    }
  }
}

async function _generateTemplateFiles(
  projectPath: string,
  templateName: string,
  processor: TemplateProcessor,
): Promise<void> {
  const templateDir = join(process.cwd(), 'templates', templateName);

  try {
    // package.json.templateを処理
    const packageJsonTemplate = join(templateDir, 'package.json.template');
    const processedPackageJson = await processor.processTemplateFile(packageJsonTemplate);
    await writeFile(join(projectPath, 'package.json'), processedPackageJson);

    // docusaurus.config.js.templateを処理
    const configTemplate = join(templateDir, 'docusaurus.config.js.template');
    const processedConfig = await processor.processTemplateFile(configTemplate);
    await writeFile(join(projectPath, 'docusaurus.config.js'), processedConfig);
  } catch (error) {
    console.error(`Error generating template files for ${templateName}:`, error);
    throw error;
  }
}

async function generateSampleContent(
  projectPath: string,
  sampleContent: any[],
  processor: TemplateProcessor,
): Promise<void> {
  for (const content of sampleContent) {
    const filePath = join(projectPath, content.path);

    // ディレクトリが存在しない場合は作成
    const dirPath = resolve(filePath, '..');
    await mkdir(dirPath, { recursive: true });

    // 既存のディレクトリと同名のファイルを作成しようとしている場合はエラー
    if (existsSync(filePath)) {
      const { stat } = await import('node:fs/promises');
      const stats = await stat(filePath);
      if (stats.isDirectory()) {
        throw new Error(
          `Cannot create file '${filePath}': A directory with the same name already exists`,
        );
      }
    }

    if (content.template) {
      // テンプレート変数を置換
      const processedContent = processor.processTemplate(content.content);
      await writeFile(filePath, processedContent, 'utf8');
    } else {
      // そのまま書き込み
      await writeFile(filePath, content.content, 'utf8');
    }
  }
}

async function generateSidebarsConfig(
  projectPath: string,
  templateName: string,
  processor: TemplateProcessor,
): Promise<void> {
  const sidebarConfigs = {
    'classic-spec': `import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// https://docusaurus.io/docs/sidebar

const sidebars: SidebarsConfig = {
  introduction: [{ type: 'autogenerated', dirName: 'introduction' }],
};

export default sidebars;`,

    'project-analysis': `import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// https://docusaurus.io/docs/sidebar

const sidebars: SidebarsConfig = {
  introduction: [{ type: 'autogenerated', dirName: 'introduction' }],
  businessAnalysis: [{ type: 'autogenerated', dirName: '01-overview' }],
};

export default sidebars;`,

    requirements: `import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// https://docusaurus.io/docs/sidebar

const sidebars: SidebarsConfig = {
  introduction: [{ type: 'autogenerated', dirName: 'introduction' }],
  requirements: [{ type: 'autogenerated', dirName: '02-requirements' }],
};

export default sidebars;`,

    'external-design': `import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// https://docusaurus.io/docs/sidebar

const sidebars: SidebarsConfig = {
  introduction: [{ type: 'autogenerated', dirName: 'introduction' }],
  external: [{ type: 'autogenerated', dirName: '03-external' }],
};

export default sidebars;`,

    'internal-design': `import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// https://docusaurus.io/docs/sidebar

const sidebars: SidebarsConfig = {
  introduction: [{ type: 'autogenerated', dirName: 'introduction' }],
  internal: [{ type: 'autogenerated', dirName: '04-internal' }],
};

export default sidebars;`,
  };

  const sidebarContent =
    sidebarConfigs[templateName as keyof typeof sidebarConfigs] || sidebarConfigs['classic-spec'];
  const processedContent = processor.processTemplate(sidebarContent);
  await writeFile(join(projectPath, 'sidebars.ts'), processedContent);
}

async function generateCustomCSS(projectPath: string): Promise<void> {
  const cssContent = `/**
 * Any CSS included here will be global. The classic template
 * bundles Infima by default. Infima is a CSS framework designed to
 * work well for content-centric websites.
 */

/* You can override the default Infima variables here. */
:root {
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  --ifm-color-primary-darker: #277148;
  --ifm-color-primary-darkest: #205d3b;
  --ifm-color-primary-light: #33925d;
  --ifm-color-primary-lighter: #359962;
  --ifm-color-primary-lightest: #3cad6e;
  --ifm-code-font-size: 95%;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.1);
}

/* For readability concerns, you should choose a lighter palette in dark mode. */
[data-theme='dark'] {
  --ifm-color-primary: #25c2a0;
  --ifm-color-primary-dark: #21af90;
  --ifm-color-primary-darker: #1fa588;
  --ifm-color-primary-darkest: #1a8870;
  --ifm-color-primary-light: #29d5b0;
  --ifm-color-primary-lighter: #32d8b4;
  --ifm-color-primary-lightest: #4fddbf;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.3);
}`;

  await writeFile(join(projectPath, 'src', 'css', 'custom.css'), cssContent);
}

async function generateStaticFiles(
  projectPath: string,
  processor: TemplateProcessor,
): Promise<void> {
  // Create basic README with template variables
  const readmeTemplate = `# {{projectName}}

This documentation site was created with [create-specment](https://github.com/plenarc/create-specment).

## Project Information

- **Project Name**: {{projectName}}
- **Created**: {{date}}
- **Author**: {{author}}

## Getting Started

\`\`\`bash
ni          # 依存関係をインストール
nr dev      # 開発サーバーを起動
\`\`\`

## Build

\`\`\`bash
nr build    # プロダクションビルド
\`\`\`

## Deployment

\`\`\`bash
nr preview  # ビルド結果をプレビュー
\`\`\`

## Documentation

This project uses Docusaurus for documentation. Learn more at [docusaurus.io](https://docusaurus.io/).
`;

  const processedReadme = processor.processTemplate(readmeTemplate);
  await writeFile(join(projectPath, 'README.md'), processedReadme, 'utf8');

  // Create .gitignore file
  const gitignoreContent = `# Dependencies
node_modules/
.pnp
.pnp.js

# Production
/build

# Generated files
.docusaurus
.cache

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
`;

  await writeFile(join(projectPath, '.gitignore'), gitignoreContent, 'utf8');
}

// プロジェクト内のテンプレートから基本ディレクトリをコピー
async function copyFromReferenceRepo(projectPath: string, directories: string[]): Promise<void> {
  const docsPath = join(projectPath, 'docs');

  for (const dir of directories) {
    const sourcePath = join(TEMPLATE_DOCS_PATH, dir);
    const targetPath = join(docsPath, dir);

    if (existsSync(sourcePath)) {
      try {
        await cp(sourcePath, targetPath, { recursive: true });
        console.log(`Copied ${dir} from template`);
      } catch (error) {
        console.warn(`Failed to copy ${dir}: ${error}`);
      }
    } else {
      console.warn(`Template directory not found: ${sourcePath}`);
    }
  }
}

// テンプレートに対応するディレクトリをコピー
async function copyTemplateDirectory(projectPath: string, templateName: string): Promise<void> {
  const templateDirMap: Record<string, string> = {
    'classic-spec': 'introduction',
    'project-analysis': '01-overview',
    'requirements': '02-requirements',
    'external-design': '03-external',
    'internal-design': '04-internal',
  };

  const dirName = templateDirMap[templateName];
  if (!dirName) {
    console.warn(`No directory mapping found for template: ${templateName}`);
    return;
  }

  const sourcePath = join(TEMPLATE_DOCS_PATH, dirName);
  const targetPath = join(projectPath, 'docs', dirName);

  if (existsSync(sourcePath)) {
    try {
      await cp(sourcePath, targetPath, { recursive: true });
      console.log(`Copied ${dirName} directory for template: ${templateName}`);
    } catch (error) {
      console.warn(`Failed to copy ${dirName}: ${error}`);
    }
  } else {
    console.warn(`Template directory not found: ${sourcePath}`);
  }
}
