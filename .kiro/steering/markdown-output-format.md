---
inclusion: always
---

# Markdown出力フォーマット

## 全般ルール

1. .markdownlint.yaml に従うこと
1. 通常のインデントは4にする
1. コードブロックは言語セクションの外に配置し、共通で使用する
1. 画像やリンクも共通で使用できる場合は、言語セクションの外に配置する
1. 各言語セクション内では、適切なインデントを維持する
1. 箇条書きの階層構造を保つ
1. 箇条書きは常に `1. ` を使用する。インクリメント不要
1. 全角カッコ(`（`、`）`)の使用禁止。利用時は半角カッコ(`(`、`)`)を使用する

## GitHub issueなどGitHub内でのドキュメントの場合

GitHubのissueやドキュメントなど、多言語対応が必要なMarkdownファイルを作成する際は、以下のフォーマットに従う
コミットメッセージもこのルールに従うこと

### 適用対象

1. GitHubのissue description
1. プロジェクトドキュメント
1. READMEファイル
1. 仕様書やガイドライン

### 基本構造

1. 各セクションで英語を先に記載し、その後に日本語を記載する
1. 番号付きリストを使用して言語を明確に区別する
1. `en`と`jp`のラベルを使用して言語を識別する

### フォーマット例

```markdown
## Section Title

1. en
    1. First point in English
    1. Second point in English
    1. Third point in English
1. jp
    1. 日本語での最初のポイント
    1. 日本語での2番目のポイント
    1. 日本語での3番目のポイント
```


## 実装例

### GitHub Issue

```markdown
# Issue Title (English only)

## Problem Summary

1. en
    1. Description of the problem in English
    1. Additional context
1. jp
    1. 問題の説明(日本語)
    1. 追加のコンテキスト

## Steps to Reproduce

1. en
    1. Step 1 in English
    1. Step 2 in English
1. jp
    1. ステップ1(日本語)
    1. ステップ2(日本語)
```
