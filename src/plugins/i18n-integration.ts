import type { FeatureSelection } from '../types/index.js';
import { LANG } from '../constants/languages.js';

export interface I18nConfig {
  defaultLocale: string;
  locales: string[];
  localeConfigs?: Record<string, LocaleConfig>;
}

export interface LocaleConfig {
  label: string;
  direction: 'ltr' | 'rtl';
  htmlLang: string;
  calendar?: string;
  path?: string;
}

export class I18nIntegration {
  static getDefaultConfig(): I18nConfig {
    return {
      defaultLocale: LANG.EN.code,
      locales: [LANG.EN.code, 'ja'],
      localeConfigs: {
        [LANG.EN.code]: {
          label: 'English',
          direction: 'ltr',
          htmlLang: 'en-US'
        },
        ja: {
          label: '日本語',
          direction: 'ltr',
          htmlLang: 'ja-JP'
        }
      }
    };
  }

  static generateDocusaurusConfig(feature: FeatureSelection): any {
    const config = feature.config?.i18n || I18nIntegration.getDefaultConfig();

    return {
      i18n: {
        defaultLocale: config.defaultLocale,
        locales: config.locales,
        localeConfigs: config.localeConfigs || I18nIntegration.getDefaultConfig().localeConfigs
      },
      themeConfig: {
        navbar: {
          items: [
            {
              type: 'localeDropdown',
              position: 'right'
            }
          ]
        }
      }
    };
  }

  static getDependencies(): Record<string, string> {
    // i18n is built into Docusaurus, no additional dependencies needed
    return {};
  }

  static generateI18nDocumentation(): string {
    return `# 多言語対応 (Internationalization)

このドキュメントサイトは多言語対応（i18n）機能を提供しています。

## サポート言語

現在、以下の言語をサポートしています：

- **English** (en) - デフォルト言語
- **日本語** (ja) - Japanese

## 言語の切り替え

### ナビゲーションバーから切り替え

1. ナビゲーションバー右上の言語ドロップダウンをクリック
2. 希望する言語を選択

### URLから直接アクセス

- 英語: \`/\` または \`/en/\`
- 日本語: \`/ja/\`

## 翻訳の仕組み

### ファイル構造

\`\`\`
docs/
├── intro.md                    # 英語版（デフォルト）
└── ...

i18n/
└── ja/                         # 日本語翻訳
    ├── docusaurus-plugin-content-docs/
    │   └── current/
    │       ├── intro.md        # 日本語版
    │       └── ...
    └── docusaurus-theme-classic/
        └── navbar.json         # ナビゲーション翻訳
\`\`\`

### 翻訳ファイルの生成

新しい翻訳を追加する場合：

\`\`\`bash
# 翻訳ファイルのテンプレートを生成
nr write-translations -- --locale ja

# 翻訳IDを生成
nr write-heading-ids
\`\`\`

## 翻訳ガイドライン

### 文書翻訳

1. **一貫性の維持**
   - 専門用語は統一した翻訳を使用
   - 文体を統一（です・ます調）

2. **文化的配慮**
   - 日本の文化や慣習に合わせた表現
   - 適切な敬語の使用

3. **技術用語**
   - 一般的な英語の技術用語はそのまま使用
   - 必要に応じて日本語訳を併記

### UI要素の翻訳

\`\`\`json
{
  "theme.common.editThisPage": "このページを編集",
  "theme.common.headingLinkTitle": "見出しへの直接リンク",
  "theme.docs.breadcrumbs.home": "ホーム",
  "theme.docs.breadcrumbs.navAriaLabel": "パンくずリスト",
  "theme.docs.paginator.navAriaLabel": "ドキュメントページネーション",
  "theme.docs.paginator.previous": "前へ",
  "theme.docs.paginator.next": "次へ"
}
\`\`\`

## SEO対応

### 言語別メタデータ

各言語版で適切なメタデータを設定：

- \`htmlLang\` 属性の設定
- 言語固有のタイトルと説明
- hreflang タグの自動生成

### URL構造

- 英語（デフォルト）: \`/docs/intro\`
- 日本語: \`/ja/docs/intro\`

## 翻訳の貢献

### 新しい翻訳の追加

1. **言語の追加**
   \`\`\`javascript
   // docusaurus.config.js
   i18n: {
     defaultLocale: 'en',
     locales: ['en', 'ja', 'ko'], // 韓国語を追加
   }
   \`\`\`

2. **翻訳ファイルの作成**
   \`\`\`bash
   nr write-translations -- --locale ko
   \`\`\`

3. **翻訳作業**
   - \`i18n/ko/\` ディレクトリ内のファイルを翻訳
   - マークダウンファイルとJSONファイルの両方を翻訳

### 翻訳の改善

既存の翻訳を改善する場合：

1. 該当する翻訳ファイルを編集
2. プルリクエストを作成
3. レビューを受けてマージ

## トラブルシューティング

### 翻訳が表示されない

1. **ファイルパスの確認**
   - 翻訳ファイルが正しい場所にあるか確認
   - ファイル名が元のファイルと一致するか確認

2. **設定の確認**
   - \`docusaurus.config.js\` の i18n 設定を確認
   - 言語コードが正しいか確認

3. **ビルドの確認**
   - 開発サーバーを再起動
   - \`nr clear\` でキャッシュをクリア

### 文字化けが発生する

1. **エンコーディングの確認**
   - ファイルがUTF-8で保存されているか確認
   - BOMなしのUTF-8を使用

2. **フォントの確認**
   - 日本語フォントが正しく読み込まれているか確認
   - CSSでフォントファミリーを指定

## 参考資料

- [Docusaurus i18n ガイド](https://docusaurus.io/docs/i18n/introduction)
- [React Intl ドキュメント](https://formatjs.io/docs/react-intl/)
- [Unicode CLDR](https://cldr.unicode.org/)
`;
  }

  static generateLocaleFiles(): Record<string, string> {
    return {
      'i18n/ja/docusaurus-theme-classic/navbar.json': JSON.stringify({
        "title": {
          "message": "ホーム",
          "description": "The title in the navbar"
        },
        "item.label.Documentation": {
          "message": "ドキュメント",
          "description": "Navbar item with label Documentation"
        },
        "item.label.GitHub": {
          "message": "GitHub",
          "description": "Navbar item with label GitHub"
        }
      }, null, 2),

      'i18n/ja/docusaurus-theme-classic/footer.json': JSON.stringify({
        "link.title.Documentation": {
          "message": "ドキュメント",
          "description": "The title of the footer links column with title=Documentation"
        },
        "link.title.Community": {
          "message": "コミュニティ",
          "description": "The title of the footer links column with title=Community"
        },
        "link.item.label.Getting Started": {
          "message": "はじめに",
          "description": "The label of footer link with label=Getting Started"
        },
        "copyright": {
          "message": "Copyright © {year} {projectName}. Docusaurus でビルドされています。",
          "description": "The footer copyright"
        }
      }, null, 2),

      'i18n/ja/code.json': JSON.stringify({
        "theme.common.editThisPage": {
          "message": "このページを編集",
          "description": "The link label to edit the current page"
        },
        "theme.common.headingLinkTitle": {
          "message": "見出しへの直接リンク",
          "description": "Title for link to heading"
        },
        "theme.docs.breadcrumbs.home": {
          "message": "ホーム",
          "description": "The ARIA label for the home page in the breadcrumbs"
        },
        "theme.docs.breadcrumbs.navAriaLabel": {
          "message": "パンくずリスト",
          "description": "The ARIA label for the breadcrumbs"
        },
        "theme.docs.paginator.navAriaLabel": {
          "message": "ドキュメントページネーション",
          "description": "The ARIA label for the docs pagination"
        },
        "theme.docs.paginator.previous": {
          "message": "前へ",
          "description": "The label used to navigate to the previous doc"
        },
        "theme.docs.paginator.next": {
          "message": "次へ",
          "description": "The label used to navigate to the next doc"
        }
      }, null, 2)
    };
  }

  static validateConfig(config: I18nConfig): { valid: boolean; message?: string } {
    if (!config.defaultLocale) {
      return {
        valid: false,
        message: 'Default locale is required'
      };
    }

    if (!Array.isArray(config.locales) || config.locales.length === 0) {
      return {
        valid: false,
        message: 'At least one locale must be specified'
      };
    }

    if (!config.locales.includes(config.defaultLocale)) {
      return {
        valid: false,
        message: 'Default locale must be included in locales array'
      };
    }

    if (config.localeConfigs) {
      for (const locale of config.locales) {
        if (config.localeConfigs[locale]) {
          const localeConfig = config.localeConfigs[locale];
          if (!localeConfig.label || !localeConfig.direction || !localeConfig.htmlLang) {
            return {
              valid: false,
              message: `Locale config for "${locale}" must include label, direction, and htmlLang`
            };
          }
        }
      }
    }

    return { valid: true };
  }
}
