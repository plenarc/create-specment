import { FeatureSelection } from '../types/index.js';
import { LANG } from '../constants/languages.js';

export interface SearchConfig {
  hashed?: boolean;
  language?: string[];
  removeDefaultStopWordFilter?: boolean;
  highlightSearchTermsOnTargetPage?: boolean;
  searchResultLimits?: number;
  searchResultContextMaxLength?: number;
}

export class SearchIntegration {
  static getDefaultConfig(): SearchConfig {
    return {
      hashed: false,
      language: [LANG.EN.code, 'ja'],
      removeDefaultStopWordFilter: false,
      highlightSearchTermsOnTargetPage: true,
      searchResultLimits: 8,
      searchResultContextMaxLength: 50
    };
  }

  static generateDocusaurusConfig(feature: FeatureSelection): any {
    const config = feature.config?.search || this.getDefaultConfig();
    
    return {
      themes: [
        [
          '@easyops-cn/docusaurus-search-local',
          {
            hashed: config.hashed,
            language: config.language,
            removeDefaultStopWordFilter: config.removeDefaultStopWordFilter,
            highlightSearchTermsOnTargetPage: config.highlightSearchTermsOnTargetPage,
            searchResultLimits: config.searchResultLimits,
            searchResultContextMaxLength: config.searchResultContextMaxLength,
            // 日本語検索の最適化
            indexDocs: true,
            indexBlog: true,
            indexPages: false,
            docsRouteBasePath: '/docs',
            blogRouteBasePath: '/blog'
          }
        ]
      ]
    };
  }

  static getDependencies(): Record<string, string> {
    return {
      '@easyops-cn/docusaurus-search-local': '^0.52.2'
    };
  }

  static generateSearchDocumentation(): string {
    return `# 検索機能 (Search Functionality)

このドキュメントサイトには@easyops-cn/docusaurus-search-localを使用したローカル検索機能が統合されています。

## 使用方法

1. **キーボードショートカット**
   - \`Ctrl + K\` (Windows/Linux) または \`Cmd + K\` (Mac) で検索ボックスを開く
   - \`/\` キーでも検索ボックスを開くことができます

2. **検索ボックス**
   - ナビゲーションバーの検索アイコンをクリック
   - 検索したいキーワードを入力

## 検索のコツ

### 基本的な検索

- **単語検索**: 単語を入力するだけで関連するページを検索
- **フレーズ検索**: 引用符で囲むと完全一致検索
- **部分一致**: 単語の一部でも検索可能

### 高度な検索

- **AND検索**: 複数のキーワードをスペースで区切る
- **除外検索**: \`-keyword\` で特定の単語を除外

### 日本語検索

- ひらがな、カタカナ、漢字での検索に対応
- 部分一致検索が可能
- 英語と日本語の混在検索も可能

## 検索対象

以下のコンテンツが検索対象となります：

- ドキュメントページのタイトル
- ドキュメントの本文
- ヘッダー（見出し）
- ブログ記事（有効な場合）

## 検索結果

検索結果には以下の情報が表示されます：

- **ページタイトル**: 該当するページの名前
- **セクション**: 該当する見出しレベル
- **プレビュー**: 検索キーワード周辺のテキスト
- **パンくずリスト**: ページの階層構造

## 設定オプション

### 基本設定

- **hashed**: 検索インデックスのハッシュ化（デフォルト: false）
- **language**: 検索対象言語（デフォルト: ['en', 'ja']）
- **removeDefaultStopWordFilter**: デフォルトストップワードフィルターの無効化
- **highlightSearchTermsOnTargetPage**: 検索語のハイライト表示
- **searchResultLimits**: 検索結果の表示件数制限
- **searchResultContextMaxLength**: 検索結果コンテキストの最大長

### 詳細設定

- **indexDocs**: ドキュメントのインデックス化（デフォルト: true）
- **indexBlog**: ブログのインデックス化（デフォルト: true）
- **indexPages**: 静的ページのインデックス化（デフォルト: false）

## トラブルシューティング

### 検索結果が表示されない場合

1. **キーワードの確認**
   - スペルミスがないか確認
   - 別の表現や類義語を試す

2. **検索範囲の確認**
   - 該当するコンテンツが存在するか確認
   - 最近追加されたコンテンツは検索インデックスの更新が必要な場合があります

3. **ブラウザの確認**
   - ブラウザのキャッシュをクリア
   - JavaScriptが有効になっているか確認

### 検索が遅い場合

- より具体的なキーワードを使用
- 検索結果を絞り込むために追加のキーワードを使用

### 日本語検索で問題がある場合

- 異なる表記（ひらがな/カタカナ/漢字）を試す
- 英語での検索も併用する

## 参考資料

- [@easyops-cn/docusaurus-search-local ドキュメント](https://github.com/easyops-cn/docusaurus-search-local)
- [Docusaurus 検索ガイド](https://docusaurus.io/docs/search)
`;
  }

  static validateConfig(config: SearchConfig): { valid: boolean; message?: string } {
    if (config.language && !Array.isArray(config.language)) {
      return {
        valid: false,
        message: 'Search language must be an array'
      };
    }

    if (config.searchResultLimits && (typeof config.searchResultLimits !== 'number' || config.searchResultLimits <= 0)) {
      return {
        valid: false,
        message: 'Search result limits must be a positive number'
      };
    }

    if (config.searchResultContextMaxLength && (typeof config.searchResultContextMaxLength !== 'number' || config.searchResultContextMaxLength <= 0)) {
      return {
        valid: false,
        message: 'Search result context max length must be a positive number'
      };
    }

    return { valid: true };
  }
}