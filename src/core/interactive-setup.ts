import { select, isCancel, intro, text, multiselect, note } from '@clack/prompts';
import type {
  CreateSpecmentOptions,
  UserSelections,
  TemplateType,
  FeatureSelection,
} from '../types/index.js';
import { getAvailableTemplates } from '../templates/index.js';
import { getAvailableFeatures } from '../features/index.js';
import { LANG, type Language } from '../constants/languages.js';
import { UserCancelledError } from '../utils/errors.js';

export class InteractiveSetup {
  private selectedLanguage: Language = LANG.EN.code;

  constructor(private options: CreateSpecmentOptions) {}

  get language(): Language {
    return this.selectedLanguage;
  }

  async run(initialProjectName?: string): Promise<UserSelections> {
    // Language selection
    await this.selectLanguage();

    // Welcome
    this.showWelcome();

    // Start the interactive flow
    const projectName = await this.getProjectName(initialProjectName);
    const templates = await this.getTemplateSelection();
    const features = await this.getFeatureSelections(templates);

    return {
      projectName,
      templates,
      features,
    };
  }

  private async selectLanguage(): Promise<void> {
    const language = await select({
      message: 'Please select display language / 表示言語を選択してください:',
      options: [
        { value: LANG.EN.code, label: LANG.EN.label },
        { value: LANG.JP.code, label: LANG.JP.label },
      ],
    });

    if (isCancel(language)) {
      throw new UserCancelledError();
    }

    this.selectedLanguage = language as Language;
  }

  private showWelcome(): void {
    console.log();
    const isEn = this.selectedLanguage === LANG.EN.code;
    if (isEn) {
      intro('🚀 Welcome to create-specment!');
      console.log('Creating a new Docusaurus-based specification documentation project...\n');
    } else {
      intro('🚀 create-specmentへようこそ！');
      console.log('Docusaurusベースの仕様書ドキュメントプロジェクトを作成します...\n');
    }
  }

  private async getProjectName(initialName?: string): Promise<string> {
    // If initialName is provided, validate and use it directly (skip prompt)
    if (initialName) {
      // Validate the provided name
      if (!/^[a-zA-Z0-9-_]+$/.test(initialName)) {
        throw new Error(
          `Invalid project name: ${initialName}. Only alphanumeric characters, hyphens, and underscores are allowed`,
        );
      }
      return initialName;
    }

    const isEn = this.selectedLanguage === LANG.EN.code;
    const folderName = await text({
      message: isEn ? 'Enter folder name (project name):' : '作成先のフォルダー名(プロジェクト名)を入力してください:',
      defaultValue: 'docs',
      validate: (value: string) => {
        if (!value.trim()) {
          return isEn ? 'Folder name is required' : 'フォルダー名が必要です';
        }
        if (!/^[a-zA-Z0-9-_]+$/.test(value)) {
          return isEn
            ? 'Only alphanumeric characters, hyphens, and underscores are allowed'
            : '英数字、ハイフン、アンダースコアのみ使用可能です';
        }
      },
    });

    if (isCancel(folderName)) {
      throw new UserCancelledError();
    }

    return folderName;
  }

  private async getTemplateSelection(): Promise<TemplateType[]> {
    if (this.options.template) {
      const templates = getAvailableTemplates(this.selectedLanguage);
      const template = templates.find((t) => t.name === this.options.template);
      if (!template) {
        throw new Error(`Template "${this.options.template}" not found`);
      }
      return [template];
    }

    const templates = getAvailableTemplates(this.selectedLanguage);

    if (templates.length === 0) {
      throw new Error('No templates available');
    }

    const isEn = this.selectedLanguage === LANG.EN.code;
    const selectedTemplateNames = await multiselect({
      message: isEn
        ? 'Which templates would you like to use? (Multiple selection)'
        : 'どのテンプレートを使用しますか？（複数選択可）',
      options: templates.map((template) => ({
        value: template.name,
        label: template.displayName,
        hint: template.description,
      })),
      required: true,
    });

    if (isCancel(selectedTemplateNames)) {
      throw new UserCancelledError();
    }

    const selectedTemplates = templates.filter((t) => selectedTemplateNames.includes(t.name));
    if (selectedTemplates.length === 0) {
      throw new Error('No templates selected');
    }

    // Show supported features for all selected templates
    const allFeatures = new Set<string>();
    for (const template of selectedTemplates) {
      for (const feature of template.features) {
        allFeatures.add(feature);
      }
    }

    note(
      Array.from(allFeatures)
        .map((feature) => `• ${feature}`)
        .join('\n'),
      isEn
        ? 'Features supported by selected templates:'
        : '選択したテンプレートがサポートする機能:',
    );

    return selectedTemplates;
  }

  private async getFeatureSelections(templates: TemplateType[]): Promise<FeatureSelection[]> {
    const availableFeatures = getAvailableFeatures();

    // Get all supported features from all selected templates
    const allSupportedFeatures = new Set<string>();
    for (const template of templates) {
      for (const feature of template.features) {
        allSupportedFeatures.add(feature);
      }
    }

    // APIテンプレートが選択されている場合の特別処理
    const hasApiTemplate = templates.some(template => template.name === 'api-spec');
    const autoEnabledFeatures = new Set<string>();

    if (hasApiTemplate) {
      // APIテンプレートが選択されている場合、Redocを自動的に有効にする
      autoEnabledFeatures.add('redoc');
    }

    // 自動有効化される機能は選択肢から除外
    const supportedFeatures = availableFeatures.filter((feature) =>
      allSupportedFeatures.has(feature.name) && !autoEnabledFeatures.has(feature.name)
    );

    if (supportedFeatures.length === 0) {
      return availableFeatures.map((feature) => ({
        ...feature,
        enabled: autoEnabledFeatures.has(feature.name),
      }));
    }

    const isEn = this.selectedLanguage === LANG.EN.code;
    const selectedFeatures = await multiselect({
      message: isEn
        ? 'Which additional features would you like to include?'
        : 'どの追加機能を含めますか？',
      options: supportedFeatures.map((feature) => ({
        value: feature.name,
        label: feature.displayName,
        hint: feature.description,
      })),
      required: false,
    });

    if (isCancel(selectedFeatures)) {
      throw new UserCancelledError();
    }

    return availableFeatures.map((feature) => ({
      ...feature,
      enabled: selectedFeatures.includes(feature.name) || autoEnabledFeatures.has(feature.name),
    }));
  }
}
