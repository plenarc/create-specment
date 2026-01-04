import type { TemplateType } from '../types/index.js';
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
    name: 'project-analysis',
    displayName: {
      [LANG.EN.code]: 'Project Analysis',
      [LANG.JP.code]: 'プロジェクト概要・分析',
    },
    description: {
      [LANG.EN.code]: 'Template for project overview and analysis',
      [LANG.JP.code]: 'プロジェクトの全体像を把握するための構造を提供します',
    },
    features: ['search', 'plantuml', 'mermaid'],
  },
  {
    name: 'requirements',
    displayName: {
      [LANG.EN.code]: 'Requirements Specification',
      [LANG.JP.code]: '要件定義',
    },
    description: {
      [LANG.EN.code]: 'Template for requirements specification',
      [LANG.JP.code]: '機能要件・非機能要件を体系的に整理できます',
    },
    features: ['search', 'mermaid'],
  },
  {
    name: 'external-design',
    displayName: {
      [LANG.EN.code]: 'External Design',
      [LANG.JP.code]: '外部設計',
    },
    description: {
      [LANG.EN.code]: 'Template for external design specification',
      [LANG.JP.code]: 'システム外部とのインターフェース設計に特化しています',
    },
    features: ['search', 'plantuml', 'mermaid', 'redoc'],
  },
  {
    name: 'internal-design',
    displayName: {
      [LANG.EN.code]: 'Internal Design',
      [LANG.JP.code]: '内部設計',
    },
    description: {
      [LANG.EN.code]: 'Template for internal design specification',
      [LANG.JP.code]: 'システム内部の詳細設計とアルゴリズムに特化しています',
    },
    features: ['search', 'plantuml', 'mermaid'],
  },
  {
    name: 'api-spec',
    displayName: {
      [LANG.EN.code]: 'API (Redocusaurus)',
      [LANG.JP.code]: 'API (Redocusaurus使用)',
    },
    description: {
      [LANG.EN.code]: 'Template for API specification with Redocusaurus',
      [LANG.JP.code]: 'RESTful APIの詳細な仕様を記述できます',
    },
    features: ['search', 'redoc', 'mermaid'],
  },
];

export function getAvailableTemplates(language: Language = LANG.EN.code): TemplateType[] {
  return TEMPLATE_DATA.map((template) => ({
    name: template.name as TemplateType['name'],
    displayName: template.displayName[language],
    description: template.description[language],
    features: template.features,
  }));
}
