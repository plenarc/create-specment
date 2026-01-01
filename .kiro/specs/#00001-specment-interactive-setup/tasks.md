# Implementation Plan: Specment Interactive Setup

## Overview

create-docusaurusをベースとしたインタラクティブな仕様書生成ツール「create-specment」を実装する。ユーザーは`npx create-specment my-docs`でプロジェクトを作成し、テンプレートと機能を選択してDocusaurusベースの仕様書サイトを生成できる。

## Tasks

- [x] 1. プロジェクト構造とCLI基盤の構築
  - create-specmentパッケージの初期化
  - TypeScript設定とビルド環境の構築
  - CLIエントリーポイントの作成
  - _Requirements: 1.1, 4.3_

- [ ] 2. インタラクティブセットアップシステムの実装
- [x] 2.1 基本的な質問フローの実装
  - プロジェクト名入力
  - テンプレート選択（classic-spec, project-analysis, requirements, external-design, internal-design）
  - 機能選択（PlantUML, Redoc, 検索, 多言語）
  - _Requirements: 1.2, 1.3, 1.4_

- [ ] 2.2 セットアップフローのプロパティテスト

  - **Property 1: インタラクティブセットアップの完了**
  - **Validates: Requirements 1.1, 1.5**

- [x] 2.3 ユーザー入力バリデーションの実装
  - プロジェクト名の妥当性チェック
  - 既存ディレクトリの重複チェック
  - 機能の互換性チェック
  - _Requirements: 1.5_

- [ ]* 2.4 入力バリデーションのユニットテスト
  - 無効なプロジェクト名のテスト
  - ディレクトリ重複のテスト
  - エラーメッセージの確認
  - _Requirements: 1.5_

- [x] 3. テンプレートシステムの実装
- [x] 3.1 テンプレートファイル構造の作成
  - classic-specテンプレート
  - project-analysisテンプレート
  - requirementsテンプレート
  - external-designテンプレート
  - internal-designテンプレート
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ]* 3.2 テンプレート生成のプロパティテスト
  - **Property 2: プロジェクト生成の完全性**
  - **Validates: Requirements 1.5, 2.5**

- [x] 3.3 テンプレート変数置換システムの実装
  - プロジェクト名の置換
  - 日付・作成者情報の置換
  - 動的コンテンツ生成
  - _Requirements: 2.5_

- [ ]* 3.4 テンプレート置換のユニットテスト
  - 変数置換の正確性テスト
  - 特殊文字の処理テスト
  - _Requirements: 2.5_

- [x] 4. Checkpoint - 基本機能の動作確認
  - 全てのテストが通ることを確認し、ユーザーに質問があれば聞く

- [ ] 5. 機能選択とプラグイン統合システムの実装
- [x] 5.1 PlantUML統合の実装
  - docusaurus-theme-plantumlの設定生成
  - package.jsonへの依存関係追加
  - docusaurus.config.jsへの設定追加
  - _Requirements: 3.1, 5.1_

- [x] 5.2 Redoc統合の実装
  - redocusaurusの設定生成
  - OpenAPI仕様ファイルのサンプル作成
  - 設定ファイルへの統合
  - _Requirements: 3.2, 5.2_

- [ ]* 5.3 機能統合のプロパティテスト
  - **Property 3: 機能選択の一貫性**
  - **Validates: Requirements 3.5, 5.5**

- [x] 5.4 検索機能とi18n機能の実装
  - 検索プラグインの設定
  - 多言語対応の基本設定
  - _Requirements: 3.3, 3.4_

- [ ]* 5.5 機能設定のユニットテスト
  - 各機能の設定生成テスト
  - 依存関係の正確性テスト
  - _Requirements: 3.5, 5.5_

- [x] 6. プロジェクト生成エンジンの実装
- [x] 6.1 ファイル・ディレクトリ生成システム
  - テンプレートからのファイル生成
  - ディレクトリ構造の作成
  - 権限設定の適用
  - _Requirements: 1.5, 2.5_

- [x] 6.2 package.json生成の実装
  - 基本的なpackage.json構造
  - 選択した機能に応じた依存関係
  - ni/nr対応のscripts設定
  - _Requirements: 4.3_

- [x] 6.3 docusaurus.config.js生成の実装
  - 基本設定の生成
  - 選択した機能に応じたプラグイン設定
  - テーマ設定の適用
  - _Requirements: 4.1, 4.4_

- [ ]* 6.4 設定ファイル生成のプロパティテスト
  - **Property 4: Docusaurus互換性**
  - **Validates: Requirements 4.2, 4.3**

- [x] 7. パッケージインストールとni統合
- [x] 7.1 niを使用したパッケージインストール
  - niコマンドの実行
  - インストール進捗の表示
  - エラーハンドリング
  - _Requirements: 4.3_

- [x] 7.2 インストール後の検証
  - 生成されたプロジェクトの動作確認
  - Docusaurusコマンドの実行テスト
  - _Requirements: 4.2_

- [ ]* 7.3 パッケージインストールのユニットテスト
  - niコマンド実行のテスト
  - エラー処理のテスト
  - _Requirements: 4.3_

- [x] 8. エラーハンドリングとユーザー体験の改善
- [x] 8.1 包括的なエラーハンドリング
  - ネットワークエラーの処理
  - ファイルシステムエラーの処理
  - 権限エラーの処理
  - _Requirements: 6.3_

- [x] 8.2 ユーザーフレンドリーなメッセージ
  - 進捗表示の実装
  - 成功メッセージの表示
  - エラーメッセージの改善（英語）
  - _Requirements: 6.3_

- [ ]* 8.3 エラーハンドリングのユニットテスト
  - 各種エラーケースのテスト
  - エラーメッセージの確認
  - _Requirements: 6.3_

- [x] 9. 既存プロジェクト統合機能の実装
- [x] 9.1 既存Docusaurusプロジェクトの検出
  - docusaurus.config.jsの存在確認
  - 既存設定の解析
  - 競合の検出
  - _Requirements: 7.1, 7.4_

- [x] 9.2 既存プロジェクトへの機能追加
  - 既存設定の保持
  - 新機能の安全な追加
  - 設定マージの実装
  - _Requirements: 7.2, 7.3_

- [ ]* 9.3 既存プロジェクト統合のプロパティテスト
  - **Property 5: 既存プロジェクト統合の安全性**
  - **Validates: Requirements 7.1, 7.4**

- [x] 10. 統合テストとドキュメント作成
- [x] 10.1 エンドツーエンド統合テスト
  - 全テンプレートでのプロジェクト生成テスト
  - 全機能組み合わせでのテスト
  - 生成されたプロジェクトでのDocusaurus動作確認
  - _Requirements: 全体_

- [x] 10.2 READMEとドキュメントの作成
  - 使用方法の説明
  - 推奨環境（mise + ni + WSL）の記載
  - トラブルシューティングガイド
  - _Requirements: 8.1, 8.2_

- [ ]* 10.3 ドキュメントの品質確認テスト
  - READMEの内容確認
  - サンプルコードの動作確認
  - _Requirements: 8.1_

- [x] 11. Final Checkpoint - 全体動作確認
  - 全てのテストが通ることを確認し、ユーザーに質問があれば聞く

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- ni (package manager unifier) is used throughout for package management
- WSL is recommended for Windows development environment