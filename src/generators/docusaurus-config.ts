import type { UserSelections } from '../types/index.js';
import { PlantUMLIntegration } from '../plugins/plantuml-integration.js';
import { RedocIntegration } from '../plugins/redoc-integration.js';
import { SearchIntegration } from '../plugins/search-integration.js';
import { I18nIntegration } from '../plugins/i18n-integration.js';
import { LANG } from '../constants/languages.js';

export function generateDocusaurusConfig(selections: UserSelections): string {
  const { projectName, templates, features } = selections;
  const enabledFeatures = features.filter(f => f.enabled);

  // 複数テンプレートに応じた基本設定（最初のテンプレートをベースにする）
  const primaryTemplate = templates[0];
  const baseConfig = getBaseConfigForTemplate(primaryTemplate.name, projectName);

  // 機能に応じた設定を追加
  const config = applyFeatureConfigurations(baseConfig, enabledFeatures);

  // 設定の妥当性を検証
  validateConfig(config);

  return generateConfigString(config);
}

function getBaseConfigForTemplate(templateName: string, projectName: string): any {
  const baseConfig: any = {
    title: projectName,
    tagline: getTaglineForTemplate(templateName),
    favicon: 'img/favicon.ico',
    url: 'https://your-docusaurus-site.example.com',
    baseUrl: '/',
    organizationName: 'your-org',
    projectName: projectName,
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    i18n: {
      defaultLocale: LANG.EN.code,
      locales: [LANG.EN.code]
    },
    presets: [
      [
        'classic',
        getPresetConfigForTemplate(templateName)
      ]
    ],
    themeConfig: getThemeConfigForTemplate(templateName, projectName),
    plugins: []
  };

  return baseConfig;
}

function getTaglineForTemplate(templateName: string): string {
  const taglines: Record<string, string> = {
    'classic-spec': 'Classic Specification Documentation',
    'api-spec': 'API Specification Documentation',
    'technical-spec': 'Technical Specification Documentation',
    'enterprise-spec': 'Enterprise Specification Documentation'
  };

  return taglines[templateName] || 'Documentation Site';
}

function getPresetConfigForTemplate(templateName: string): any {
  const basePresetConfig = {
    docs: {
      sidebarPath: './sidebars.js',
      editUrl: 'https://github.com/your-org/your-repo/tree/main/'
    },
    theme: {
      customCss: './src/css/custom.css'
    }
  };

  // テンプレートに応じてブログ機能を調整
  if (templateName === 'classic-spec') {
    return {
      ...basePresetConfig,
      blog: {
        showReadingTime: true,
        editUrl: 'https://github.com/your-org/your-repo/tree/main/'
      }
    };
  }

  // 仕様書系テンプレートではブログを無効化
  return {
    ...basePresetConfig,
    blog: false
  };
}

function getThemeConfigForTemplate(templateName: string, projectName: string): any {
  const baseThemeConfig = {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: projectName,
      logo: {
        alt: `${projectName} Logo`,
        src: 'img/logo.svg'
      },
      items: getNavbarItemsForTemplate(templateName)
    },
    footer: {
      style: 'dark',
      links: getFooterLinksForTemplate(templateName),
      copyright: `Copyright © ${new Date().getFullYear()} ${projectName}. Built with Docusaurus.`
    },
    prism: {
      theme: 'github',
      darkTheme: 'dracula'
    }
  };

  return baseThemeConfig;
}

function getNavbarItemsForTemplate(templateName: string): any[] {
  const baseItems = [
    {
      href: 'https://github.com/your-org/your-repo',
      label: 'GitHub',
      position: 'right'
    }
  ];

  switch (templateName) {
    case 'classic-spec':
      return [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation'
        },
        ...baseItems
      ];

    case 'api-spec':
      return [
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API Reference'
        },
        {
          type: 'docSidebar',
          sidebarId: 'guidesSidebar',
          position: 'left',
          label: 'Guides'
        },
        ...baseItems
      ];

    case 'technical-spec':
      return [
        {
          type: 'docSidebar',
          sidebarId: 'architectureSidebar',
          position: 'left',
          label: 'Architecture'
        },
        {
          type: 'docSidebar',
          sidebarId: 'implementationSidebar',
          position: 'left',
          label: 'Implementation'
        },
        ...baseItems
      ];

    case 'enterprise-spec':
      return [
        {
          type: 'docSidebar',
          sidebarId: 'overviewSidebar',
          position: 'left',
          label: 'Overview'
        },
        {
          type: 'docSidebar',
          sidebarId: 'specificationSidebar',
          position: 'left',
          label: 'Specifications'
        },
        {
          type: 'docSidebar',
          sidebarId: 'processSidebar',
          position: 'left',
          label: 'Processes'
        },
        ...baseItems
      ];

    default:
      return [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation'
        },
        ...baseItems
      ];
  }
}

function getFooterLinksForTemplate(templateName: string): any[] {
  const baseLinks = [
    {
      title: 'Community',
      items: [
        {
          label: 'GitHub',
          href: 'https://github.com/your-org/your-repo'
        }
      ]
    }
  ];

  const docLinks = {
    title: 'Documentation',
    items: [
      {
        label: 'Getting Started',
        to: '/docs/intro'
      }
    ]
  };

  return [docLinks, ...baseLinks];
}

function applyFeatureConfigurations(config: any, enabledFeatures: any[]): any {
  // Add feature-specific configurations using dedicated integration classes
  for (const feature of enabledFeatures) {
    let featureConfig: any = {};

    switch (feature.name) {
      case 'plantuml':
        featureConfig = PlantUMLIntegration.generateDocusaurusConfig(feature);
        break;
      case 'redoc':
        featureConfig = RedocIntegration.generateDocusaurusConfig(feature);
        break;
      case 'search':
        featureConfig = SearchIntegration.generateDocusaurusConfig(feature);
        break;
      case 'i18n':
        featureConfig = I18nIntegration.generateDocusaurusConfig(feature);
        break;
    }

    // Merge feature configuration into main config
    if (featureConfig.themeConfig) {
      config.themeConfig = mergeDeep(config.themeConfig, featureConfig.themeConfig);
    }
    if (featureConfig.plugins) {
      config.plugins.push(...featureConfig.plugins);
    }
    if (featureConfig.i18n) {
      config.i18n = { ...config.i18n, ...featureConfig.i18n };
    }
    if (featureConfig.presets) {
      config.presets.push(...featureConfig.presets);
    }
  }

  return config;
}

function validateConfig(config: any): void {
  // 必須フィールドの検証
  const requiredFields = ['title', 'url', 'baseUrl', 'presets', 'themeConfig'];

  for (const field of requiredFields) {
    if (!config[field]) {
      throw new Error(`Required configuration field missing: ${field}`);
    }
  }

  // URL形式の検証
  try {
    new URL(config.url);
  } catch (error) {
    throw new Error(`Invalid URL format: ${config.url}`);
  }

  // プリセット設定の検証
  if (!Array.isArray(config.presets) || config.presets.length === 0) {
    throw new Error('At least one preset must be configured');
  }
}

function generateConfigString(config: any): string {
  return `// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = ${JSON.stringify(config, null, 2)};

module.exports = config;`;
}

function mergeDeep(target: any, source: any): any {
  const result = { ...target };

  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = mergeDeep(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}
