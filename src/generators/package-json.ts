import type { UserSelections } from '../types/index.js';
import { readFileSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATE_PATH = resolve(__dirname, '../../templates');

export function generatePackageJson(selections: UserSelections): any {
  const { projectName, features } = selections;

  // テンプレートファイルを読み込み
  const templatePath = join(TEMPLATE_PATH, 'package.json.template');
  let packageJsonContent = readFileSync(templatePath, 'utf8');

  // 機能フラグを設定
  const enabledFeatures = features.filter((f) => f.enabled);
  const hasPlantUML = enabledFeatures.some((f) => f.name === 'plantuml');
  const hasMermaid = enabledFeatures.some((f) => f.name === 'mermaid');
  const hasRedoc = enabledFeatures.some((f) => f.name === 'redoc');

  // プロジェクト名を置換
  packageJsonContent = packageJsonContent.replace(/\{\{projectName\}\}/g, projectName);

  // 条件付きセクションを処理
  packageJsonContent = processConditionalSections(packageJsonContent, {
    hasPlantUML,
    hasMermaid,
    hasRedoc,
  });

  // JSONとしてパース
  const packageJson = JSON.parse(packageJsonContent);

  return packageJson;
}

/**
 * 条件付きセクションを処理する
 * {{#condition}}...{{/condition}} の形式で条件分岐を処理
 */
function processConditionalSections(
  content: string,
  conditions: Record<string, boolean>
): string {
  let result = content;

  // 各条件について処理
  for (const [conditionName, isEnabled] of Object.entries(conditions)) {
    const startTag = `{{#${conditionName}}}`;
    const endTag = `{{/${conditionName}}}`;

    // 条件付きセクションを検索
    const regex = new RegExp(`\\{\\{#${conditionName}\\}\\}([\\s\\S]*?)\\{\\{\\/${conditionName}\\}\\}`, 'g');

    if (isEnabled) {
      // 条件が真の場合、タグを削除してコンテンツを残す
      result = result.replace(regex, '$1');
    } else {
      // 条件が偽の場合、セクション全体を削除
      result = result.replace(regex, '');
    }
  }

  return result;
}
