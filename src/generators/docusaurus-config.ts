import type { UserSelections } from '../types/index.js';

export function generateDocusaurusConfig(selections: UserSelections): string {
  const { projectName, templates, features } = selections;
  const enabledFeatures = features.filter((f) => f.enabled);

  // 機能フラグ
  const hasPlantUML = enabledFeatures.some(f => f.name === 'plantuml');
  const hasMermaid = enabledFeatures.some(f => f.name === 'mermaid');
  const hasRedoc = enabledFeatures.some(f => f.name === 'redoc');

  return generateConfigString(templates, enabledFeatures, hasPlantUML, hasMermaid, hasRedoc, projectName);
}

const makeI18n = (): string => {
  return `
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },
  `;
};

const makeMarkdown = (hasMermaid: boolean): string => {
  return hasMermaid ? `
  markdown: {
    mermaid: true,
  },` : '';
};

const makePresets = (hasRedoc: boolean): string => {
  const baseText = {
    classic: `[
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ]`,
    redoc: `[
      'redocusaurus',
      {
        specs: [
          {
            id: 'api-spec',
            spec: 'openapi/openapi-single.yaml',
            route: '/api/',
          },
        ],
        theme: {
          primaryColor: '#1976d2',
        },
      },
    ]`,
  };

  return [
    baseText.classic,
    hasRedoc && baseText.redoc,
  ].filter(Boolean).join(',\n    ');
};

const makeThemes = (hasPlantUML: boolean, hasMermaid: boolean): string => {
  const baseText = {
    search: `[
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        language: ['jp'],
        hashed: true,
        highlightSearchTermsOnTargetPage: true,
      },
    ]`,
    plantUML: `require.resolve('docusaurus-theme-plantuml')`,
    mermaid: `'@docusaurus/theme-mermaid'`,
  };

  return [
    baseText.search,
    hasPlantUML && baseText.plantUML,
    hasMermaid && baseText.mermaid,
  ].filter(Boolean).join(',\n    ');
};


const makeNavbarItems = (templates: any[], enabledFeatures: any[]): string => {
  const templateNavItems: Record<string, { label: string; docId: string }> = {
    'project-analysis': { label: 'プロジェクト概要・分析', docId: 'overview/index' },
    'requirements': { label: '要件定義', docId: 'requirements/index' },
    'external-design': { label: '外部設計', docId: 'external/index' },
    'internal-design': { label: '内部設計', docId: 'internal/index' },
  };

  let navbarItems = '[';

  // 選択されたテンプレートに応じてナビゲーション項目を追加
  for (const template of templates) {
    const navItem = templateNavItems[template.name];
    if (navItem) {
      navbarItems += `
        {
          label: '${navItem.label}',
          type: 'doc',
          position: 'left',
          docId: '${navItem.docId}',
        },`;
    }
  }

  // redoc機能が有効な場合はAPIリンクを追加
  const hasRedocFeature = enabledFeatures.some(f => f.name === 'redoc');
  if (hasRedocFeature) {
    navbarItems += `
        {
          label: 'API',
          position: 'left',
          to: '/api/',
        },`;
  }

  // GitHubリンクを追加
  navbarItems += `
        {
          href: isGithubActions ? \`https://github.com/\${organizationValue}/\${projectValue}\` : 'http://localhost:3000',
          label: 'GitHub',
          position: 'right',
        },
      ]`;

  return navbarItems;
}

function generateConfigString(templates: any[], enabledFeatures: any[], hasPlantUML: boolean, hasMermaid: boolean, hasRedoc: boolean, projectName: string): string {
  const i18n = makeI18n();
  const markdown = makeMarkdown(hasMermaid);
  const presets = makePresets(hasRedoc);
  const themes = makeThemes(hasPlantUML, hasMermaid);

  // 選択されたテンプレートに応じてナビゲーション項目を動的に生成
  const navbarItems = makeNavbarItems(templates, enabledFeatures);

  // TypeScript形式で設定を生成
  return `import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

// GitHub pages deployment config.
// ToDo: 最初に編集する必要がある箇所
const titleValue = 'プロジェクト名';
const descriptionValue = 'プロジェクト概要。xxxのためのシステムです';
const organizationValue = 'your-org';
const projectValue = '${projectName}';
const urlValue = \`https://\${organizationValue}.github.io\`;
const baseUrlValue = \`/\${projectValue}/\`;

// ToDo: Since I don't think GitHub Pages will be used in actual operation, this area needs to be edited according to the environment.
// ToDo: 実運用時にGitHub Pagesは使わないと思うので、この辺りは環境に合わせて要編集する
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const config: Config = {
  title: titleValue,
  tagline: descriptionValue,
  favicon: 'img/favicon.ico',

  url: isGithubActions ? urlValue : 'http://localhost:3000',
  baseUrl: isGithubActions ? baseUrlValue : '/',

  organizationName: organizationValue,
  projectName: projectValue,
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  ${i18n}

  ${markdown}

  presets: [
    ${presets}
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: titleValue,
      logo: {
        alt: titleValue,
        src: 'img/logo.svg',
      },
      items: ${navbarItems}
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Slack (Sample)',
              href: 'https://slack.com/intl/ja-jp',
            },
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/plenarc/create-specment/discussions',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Changelog',
              href: 'https://github.com/plenarc/create-specment/blob/main/CHANGELOG.md',
            },
            {
              label: 'GitHub: Create Specment',
              href: 'https://github.com/plenarc/create-specment',
            },
            {
              label: 'Docusaurus',
              href: 'https://docusaurus.io/',
            },
          ],
        },
      ],
      copyright: \`Copyright © \${new Date().getFullYear()} \${titleValue}, Inc. Built with Specment.\`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  themes: [
    ${themes}
  ],
};

export default config;`;
}
