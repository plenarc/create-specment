# create-specment

[![npm version][npm-image]][npm-url]
[![npm downlads][npm-downloads-image]][npm-url]
[![License][license-image]][license-url]

[English](README.md) | [日本語](README-jp.md)

Demo: https://plenarc.github.io/specment/

1. 'specification' + 'document' => Specment
1. Docusaurusベースの仕様書作成に特化したサイト生成ツール

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src=".github/images/screenshots/overview.png" alt="Project Overview" width="250" />
        <br>
        <em>Example: Project Overview</em>
      </td>
      <td align="center">
        <img src=".github/images/screenshots/as-is.png" alt="As-Is Current State Analysis" width="250" />
        <br>
        <em>Example: As-Is Current State Analysis</em>
      </td>
      <td align="center">
        <img src=".github/images/screenshots/redoc.png" alt="As-Is Current State Analysis" width="250" />
        <br>
        <em>Example: Redoc (OpenAPI)</em>
      </td>
    </tr>
  </table>
</div>

## 概要

`create-specment`は、仕様書作成に特化したDocusaurusプロジェクトを簡単に生成できるCLIツールです。Storybookのような使いやすさと、create-better-t-stackのようなインタラクティブセットアップを提供し、仕様書作成に必要な機能を統合したツールです。

## 特徴

1. 🚀 **インタラクティブセットアップ**: 質問に答えるだけでプロジェクトを生成
1. 📋 **5つの専用テンプレート**: 用途に応じた最適なテンプレートを選択
1. 🔧 **機能選択**: PlantUML、Mermaid、多言語対応(TBD)などを選択可能
1. 📝 **変数置換**: プロジェクト名や作成者情報を自動で置換
1. 🎨 **Docusaurus互換**: 既存のDocusaurusエコシステムと完全互換

## 導入手順

### 前提条件

以下のソフトウェアがインストールされている前提で説明します:

1. **WSL(Windows環境の場合)**
    1. Windows環境では Windows Subsystem for Linux (WSL) の使用を推奨
    1. Ubuntu 22.04 LTS 以上を推奨

    ```bash
    # WSL のインストール(Windows PowerShell で管理者権限で実行)
    wsl --install
    ```

1. **mise(開発環境管理ツール)**
    1. Linux/macOS/WSL
        ```bash
        curl https://mise.run | sh

        # シェルの設定を更新
        echo 'eval "$(mise activate bash)"' >> ~/.bashrc
        source ~/.bashrc
        ```
    1. brew
        ```bash
        brew install mise
        ```
    1. バージョンの確認
        ```bash
        mise --version
        ```

1. **Node.js (LTS以上推奨、mise経由でインストール推奨)**

    ```bash
    # mise を使用してNode.jsをインストール
    mise install node@lts
    mise use node@lts

    # バージョン確認
    node --version
    ```

1. **ni(パッケージマネージャー統一ツール)**

    ```bash
    # mise を使用してniのインストール
    mise use npm:@antfu/ni@latest

    # バージョン確認
    ni --version
    ```

### インストール方法

1. 各選択肢の内容は[選択肢詳細](#選択肢詳細)を参照してください

#### 方法1: niを使用(推奨)

```bash
# niを使用してセットアップを開始
nlx create-specment@latest
```

実行後、以下の選択肢が表示されるので必要なドキュメント、機能を選択してください

```bash
◆  Please select display language / 表示言語を選択してください:
│  ○ English
│  ● 日本語
└

┌  🚀 create-specmentへようこそ！
Docusaurusベースの仕様書ドキュメントプロジェクトを作成します...
│
◆  作成先のフォルダー名(プロジェクト名)を入力してください:
│  _
└

◆  どのテンプレートを使用しますか？（複数選択可）
│  ◻ プロジェクト概要・分析
│  ◻ 要件定義
│  ◻ 外部設計
│  ◻ 内部設計
│  ◻ API (Redocusaurus使用)
└

◆  どの追加機能を含めますか？
│  ◻ PlantUML
│  ◻ Mermaid
└
```

作成が完了したら、フォルダーを変更してインストール後に開発モードで起動

```bash
cd <フォルダー名> && ni && nr start
```

#### 方法2: npxを使用

```bash
# セットアップを開始
npx create-specment@latest
```

1. 選択肢の内容は方法1を参照

## 選択肢詳細

1. create-specment を実行すると、以下のオプションが順番に表示されます

### 1. 表示言語選択

```
◆ Please select display language / 表示言語を選択してください:
│ ● English
│ ○ 日本語
```

1. インターフェースの表示言語を選択します
1. 選択した言語でその後の質問が表示されます

### 2. フォルダー名入力

```
◆ 作成先のフォルダー名(プロジェクト名)を入力してください:
│ _
```

1. 作成するプロジェクトのフォルダー名を入力します
1. ここに入力された名前でフォルダーを作成します

### 3. テンプレート選択 (複数選択可)

```
◆ どのテンプレートを使用しますか？(複数選択可)
│ ◻ プロジェクト概要・分析
│ ◻ 要件定義
│ ◻ 外部設計
│ ◻ 内部設計
│ ◻ API (Redocusaurus使用)
```

1. 複数のテンプレートを同時に選択可能です
1. 各テンプレートは独立したセクションとして生成されます
1. 最低1つのテンプレートを選択する必要があります

#### プロジェクト概要・分析

プロジェクト概要・分析用テンプレート。プロジェクトの全体像を把握するための構造を提供します。

**適用場面**:
1. プロジェクト企画書
1. 現状分析レポート
1. SWOT分析ドキュメント

#### 要件定義
要件定義書テンプレート。機能要件・非機能要件を体系的に整理できます。

**適用場面**:
1. システム要件定義書
1. 機能仕様書
1. EARS形式での要件記述

#### 外部設計

外部設計書テンプレート。システム外部とのインターフェース設計に特化しています。

**適用場面**:
1. システムアーキテクチャ設計書
1. API設計書
1. UI/UX設計書

#### 内部設計

内部設計書テンプレート。システム内部の詳細設計とアルゴリズムに特化しています。

**適用場面**:
1. 詳細設計書
1. データベース設計書
1. アルゴリズム仕様書

#### API

1. [Redocusaurus](https://github.com/rohit-gohri/redocusaurus)を使って、OpenAPI仕様書で書かれたyaml形式のファイルが表示できるようになります

### 4. 追加機能選択

```
◆ どの追加機能を含めますか？
│ ◻ PlantUML
│ ◻ Mermaid
```

1. **PlantUML**: UML図やフローチャートを作成できる機能を追加
1. **Mermaid**: Markdown内で図表を作成できる機能を追加
1. 両方選択することも可能です

#### PlantUML

1. UML図やシーケンス図など、[PlantUML](https://plantuml.com/)が使えるようになります
1. Docusaurusのテーマ[create-specment](https://www.npmjs.com/package/create-specment)を使用しています
    1. ※ 用法や注意点はリンク先のREADMEを参照してください

#### Mermaid

1. Docusaurusのテーマ[theme-mermaid](https://docusaurus.io/docs/api/themes/@docusaurus/theme-mermaid)を使用しています

#### 多言語対応

TBD: 複数言語でのドキュメント作成をサポートする予定(要望があれば)

## コマンドラインオプション

```bash
create-specment [project-name] [options]

Arguments:
  project-name          作成するプロジェクトのフォルダー名 (省略可)
                        指定時: フォルダー名入力をスキップ

Options:
  -t, --template <template>  使用するテンプレート (project-analysis|requirements|external-design|internal-design|api-spec)
  --skip-install        依存関係のインストールをスキップ
  --verbose             詳細なログを表示
  -h, --help           ヘルプを表示
  -V, --version        バージョンを表示
```

### 使用例

```bash
# 完全インタラクティブセットアップ (全ての選択肢が表示される)
create-specment

# フォルダー名を指定してインタラクティブセットアップ (フォルダー名入力をスキップ)
create-specment my-docs

# 完全に非インタラクティブ (フォルダー名とテンプレート選択をスキップ)
create-specment my-docs --template requirements

# テンプレートのみ指定 (フォルダー名入力は表示される)
create-specment --template api-spec
```

## トラブルシューティング

### よくある問題

#### 1. Node.jsのバージョンエラー

```bash
Error: Node.js version 20.0 or higher is required
```

**解決方法**:

```bash
# Node.jsのバージョンを確認
node --version

# mise を使用してNode.jsをアップデート
mise install node@latest
mise use node@latest
```

#### 2. パッケージインストールエラー

```bash
Error: Failed to install dependencies
```

**解決方法**:

```bash
# キャッシュをクリア
ni clean
# または手動でクリア
npm cache clean --force

# 再度インストール
ni
```

#### 3. ポート競合エラー

```bash
Error: Port 3000 is already in use
```

**解決方法**:

```bash
# 別のポートを指定
nr start -- --port 3001
```

### Windows環境での注意事項

1. **WSLの使用を推奨**
    1. Windows環境では WSL (Windows Subsystem for Linux) の使用を推奨します
    1. PowerShellやコマンドプロンプトでの動作は保証されません
    1. Ubuntu 22.04 LTS 以上を推奨
1. **開発環境の統一**
    1. mise + ni の組み合わせにより、環境差異を最小限に抑制
    1. WSLを使用することでmacOS/Linux環境に近い環境に統一

## ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 貢献

プロジェクトへの貢献を歓迎します！詳細は [CONTRIBUTING.md](CONTRIBUTING.md) を参照してください。

## サポート

1. 🐛 **バグレポート**: [GitHub Issues](https://github.com/plenarc/create-specment/issues)
1. 💡 **機能要望**: [GitHub Discussions](https://github.com/plenarc/create-specment/discussions)
1. 📖 **ドキュメント**: [公式ドキュメント](https://create-specment.dev)

## 関連プロジェクト

1. [Docusaurus](https://docusaurus.io/) - 静的サイトジェネレーター
1. [mise](https://mise.jdx.dev/) - 開発環境管理ツール
1. [ni](https://github.com/antfu/ni) - パッケージマネージャー統一ツール
1. [PlantUML](https://plantuml.com/) - UML図作成ツール
1. [Redoc](https://redocly.github.io/redoc/) - OpenAPI仕様書表示ツール

[npm-image]: https://img.shields.io/npm/v/create-specment.svg
[npm-url]: https://www.npmjs.com/package/create-specment
[npm-downloads-image]: https://img.shields.io/npm/dw/create-specment.svg
[license-image]: https://img.shields.io/github/license/plenarc/create-specment.svg
[license-url]: https://github.com/plenarc/create-specment/blob/main/LICENSE
