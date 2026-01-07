import { readFile } from 'fs/promises';

export interface TemplateVariables {
  projectName: string;
  author?: string;
  email?: string;
  date: string;
  year: string;
  description?: string;
  [key: string]: string | undefined;
}

export class TemplateProcessor {
  private variables: TemplateVariables;

  constructor(variables: Partial<TemplateVariables>) {
    const now = new Date();
    this.variables = {
      projectName: 'my-project',
      author: 'Unknown',
      email: '',
      date: now.toISOString().split('T')[0], // YYYY-MM-DD format
      year: now.getFullYear().toString(),
      description: '',
      ...variables,
    };
  }

  /**
   * テンプレート文字列内の変数を置換する
   * 変数は {{variableName}} の形式で記述される
   */
  processTemplate(template: string): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, variableName) => {
      const value = this.variables[variableName];
      if (value === undefined) {
        console.warn(`Template variable '${variableName}' is not defined`);
        return match; // 置換できない場合は元の文字列を返す
      }
      return value;
    });
  }

  /**
   * テンプレートファイルを読み込んで変数を置換する
   */
  async processTemplateFile(templatePath: string): Promise<string> {
    try {
      const templateContent = await readFile(templatePath, 'utf-8');
      return this.processTemplate(templateContent);
    } catch (error) {
      throw new Error(`Failed to process template file ${templatePath}: ${error}`);
    }
  }

  /**
   * 複数のテンプレートファイルを一括処理する
   */
  async processTemplateFiles(templatePaths: string[]): Promise<Record<string, string>> {
    const results: Record<string, string> = {};

    for (const templatePath of templatePaths) {
      try {
        const processedContent = await this.processTemplateFile(templatePath);
        results[templatePath] = processedContent;
      } catch (error) {
        console.error(`Error processing template ${templatePath}:`, error);
        throw error;
      }
    }

    return results;
  }

  /**
   * 変数を追加または更新する
   */
  setVariable(name: string, value: string): void {
    this.variables[name] = value;
  }

  /**
   * 複数の変数を一括設定する
   */
  setVariables(variables: Record<string, string>): void {
    Object.assign(this.variables, variables);
  }

  /**
   * 現在の変数一覧を取得する
   */
  getVariables(): TemplateVariables {
    return { ...this.variables };
  }

  /**
   * プロジェクト名から派生する変数を自動生成する
   */
  generateDerivedVariables(): void {
    const projectName = this.variables.projectName;

    // kebab-case から camelCase への変換
    const camelCaseName = projectName.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

    // kebab-case から PascalCase への変換
    const pascalCaseName = camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1);

    // CONSTANT_CASE への変換
    const constantCaseName = projectName.replace(/-/g, '_').toUpperCase();

    // 派生変数を設定
    this.setVariables({
      projectNameCamel: camelCaseName,
      projectNamePascal: pascalCaseName,
      projectNameConstant: constantCaseName,
      projectNameKebab: projectName, // 明示的に設定
    });
  }
}

/**
 * ユーザー情報を取得する（Git設定から）
 */
export async function getUserInfo(): Promise<{ name?: string; email?: string }> {
  try {
    const { execSync } = await import('child_process');

    let name: string | undefined;
    let email: string | undefined;

    try {
      name = execSync('git config user.name', { encoding: 'utf-8' }).trim();
    } catch {
      // Git設定が見つからない場合は無視
    }

    try {
      email = execSync('git config user.email', { encoding: 'utf-8' }).trim();
    } catch {
      // Git設定が見つからない場合は無視
    }

    return { name, email };
  } catch {
    return {};
  }
}

/**
 * テンプレートプロセッサーを作成するヘルパー関数
 */
export async function createTemplateProcessor(
  projectName: string,
  additionalVariables: Record<string, string> = {},
): Promise<TemplateProcessor> {
  const userInfo = await getUserInfo();

  const processor = new TemplateProcessor({
    projectName,
    author: userInfo.name,
    email: userInfo.email,
    description: `Documentation for ${projectName}`,
    ...additionalVariables,
  });

  // 派生変数を生成
  processor.generateDerivedVariables();

  return processor;
}
