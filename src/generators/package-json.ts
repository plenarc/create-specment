import type { UserSelections } from '../types/index.js';
import { PlantUMLIntegration } from '../plugins/plantuml-integration.js';
import { RedocIntegration } from '../plugins/redoc-integration.js';
import { SearchIntegration } from '../plugins/search-integration.js';
import { I18nIntegration } from '../plugins/i18n-integration.js';

export function generatePackageJson(selections: UserSelections): any {
  const { projectName, features } = selections;

  const basePackageJson: any = {
    name: projectName,
    version: '0.0.0',
    private: true,
    scripts: {
      // 標準的なDocusaurusコマンド
      docusaurus: 'docusaurus',
      start: 'docusaurus start',
      build: 'docusaurus build',
      swizzle: 'docusaurus swizzle',
      deploy: 'docusaurus deploy',
      clear: 'docusaurus clear',
      serve: 'docusaurus serve',
      'write-translations': 'docusaurus write-translations',
      'write-heading-ids': 'docusaurus write-heading-ids',

      // ni/nr対応のエイリアス（niコマンドで統一的に実行可能）
      dev: 'docusaurus start',
      preview: 'docusaurus serve',

      // 開発・運用支援コマンド
      typecheck: 'tsc --noEmit',
      lint: 'eslint src --ext .ts,.tsx,.js,.jsx',
      'lint:fix': 'eslint src --ext .ts,.tsx,.js,.jsx --fix',
      format: 'prettier --write "src/**/*.{ts,tsx,js,jsx,md,mdx}"',
      'format:check': 'prettier --check "src/**/*.{ts,tsx,js,jsx,md,mdx}"',
    },
    dependencies: {
      '@docusaurus/core': '^3.0.0',
      '@docusaurus/preset-classic': '^3.0.0',
      '@mdx-js/react': '^3.0.0',
      clsx: '^2.0.0',
      'prism-react-renderer': '^2.3.0',
      react: '^18.0.0',
      'react-dom': '^18.0.0',
    },
    devDependencies: {
      '@docusaurus/module-type-aliases': '^3.0.0',
      '@docusaurus/types': '^3.0.0',
      '@types/react': '^18.0.0',
      '@types/react-dom': '^18.0.0',
      typescript: '^5.0.0',
      eslint: '^8.0.0',
      '@typescript-eslint/eslint-plugin': '^6.0.0',
      '@typescript-eslint/parser': '^6.0.0',
      prettier: '^3.0.0',
    },
    browserslist: {
      production: ['>0.5%', 'not dead', 'not op_mini all'],
      development: ['last 3 chrome version', 'last 3 firefox version', 'last 5 safari version'],
    },
    engines: {
      node: '>=20.0',
    },
    // packageManagerフィールドは削除 - niが自動検出するため
  };

  // Add feature-specific dependencies using dedicated integration classes
  const enabledFeatures = features.filter((f) => f.enabled);

  for (const feature of enabledFeatures) {
    let dependencies: Record<string, string> = {};
    const devDependencies: Record<string, string> = {};
    const scripts: Record<string, string> = {};

    switch (feature.name) {
      case 'plantuml':
        dependencies = PlantUMLIntegration.getDependencies();
        break;
      case 'redoc':
        dependencies = RedocIntegration.getDependencies();
        break;
      case 'search':
        dependencies = SearchIntegration.getDependencies();
        break;
      case 'i18n':
        dependencies = I18nIntegration.getDependencies();
        // 多言語対応の場合、翻訳関連のスクリプトを追加
        scripts.translate = 'docusaurus write-translations';
        scripts['translate:update'] = 'docusaurus write-translations --update-translations';
        break;
    }

    // Merge dependencies into base package.json
    Object.assign(basePackageJson.dependencies, dependencies);
    Object.assign(basePackageJson.devDependencies, devDependencies);
    Object.assign(basePackageJson.scripts, scripts);
  }

  // 機能に応じてスクリプトを調整
  if (enabledFeatures.some((f) => f.name === 'plantuml')) {
    basePackageJson.scripts['plantuml:check'] = 'echo "PlantUML integration enabled"';
  }

  if (enabledFeatures.some((f) => f.name === 'redoc')) {
    basePackageJson.scripts['api:validate'] = 'echo "API specification validation"';
  }

  return basePackageJson;
}
