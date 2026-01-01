import { TemplateType } from '../types/index.js';
import { LANG, type Language } from '../constants/languages.js';

interface TemplateInfo {
  name: string;
  displayName: {
    [LANG.EN.code]: string;
    [LANG.JP.code]: string;
  };
  description: {
    [LANG.EN.code]: string;
    [LANG.JP.code]: string;
  };
  features: string[];
}

const TEMPLATE_DATA: TemplateInfo[] = [
  {
    name: 'classic-spec',
    displayName: {
      [LANG.EN.code]: 'Classic Specification',
      [LANG.JP.code]: '基本仕様書'
    },
    description: {
      [LANG.EN.code]: 'General-purpose specification documentation template',
      [LANG.JP.code]: '汎用的な仕様書ドキュメントテンプレート'
    },
    features: ['search', 'plantuml']
  },
  {
    name: 'api-spec',
    displayName: {
      [LANG.EN.code]: 'API Specification',
      [LANG.JP.code]: 'API仕様書'
    },
    description: {
      [LANG.EN.code]: 'Template for API specification and documentation',
      [LANG.JP.code]: 'API仕様書・ドキュメント用テンプレート'
    },
    features: ['search', 'plantuml', 'redoc']
  },
  {
    name: 'technical-spec',
    displayName: {
      [LANG.EN.code]: 'Technical Specification',
      [LANG.JP.code]: '技術仕様書'
    },
    description: {
      [LANG.EN.code]: 'Template for technical specification and architecture',
      [LANG.JP.code]: '技術仕様書・アーキテクチャ用テンプレート'
    },
    features: ['search', 'plantuml']
  },
  {
    name: 'enterprise-spec',
    displayName: {
      [LANG.EN.code]: 'Enterprise Specification',
      [LANG.JP.code]: '企業向け仕様書'
    },
    description: {
      [LANG.EN.code]: 'Template for enterprise specification and documentation',
      [LANG.JP.code]: '企業向け仕様書・ドキュメント用テンプレート'
    },
    features: ['search', 'plantuml', 'redoc', 'i18n']
  }
];

export function getAvailableTemplates(language: Language = LANG.EN.code): TemplateType[] {
  return TEMPLATE_DATA.map(template => ({
    name: template.name as TemplateType['name'],
    displayName: template.displayName[language],
    description: template.description[language],
    features: template.features
  }));
}