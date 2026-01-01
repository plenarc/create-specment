# Contributing to create-specment

create-specmentへの貢献に興味を持っていただき、ありがとうございます！このガイドは、プロジェクトへの貢献を開始するのに役立ちます。

## 🚀 開始方法

### 前提条件

- Node.js 20.0.0以上
- [ni](https://github.com/antfu/ni)パッケージマネージャー（推奨）
- [mise](https://mise.jdx.dev/) Node.jsバージョン管理用（推奨）
- Git
- コードエディター（VS Code推奨）

### 開発環境のセットアップ

1. **フォークとクローン**
   ```bash
   git clone https://github.com/your-username/create-specment.git
   cd create-specment
   ```

2. **依存関係のインストール**
   ```bash
   ni
   ```

3. **開発環境のセットアップ**
   ```bash
   # miseを使用する場合
   mise install
   mise use
   
   # セットアップを確認
   node --version
   npm --version
   ```

4. **テストを実行**
   ```bash
   nr test
   ```

5. **プロジェクトをビルド**
   ```bash
   nr build
   ```

## 🏗 プロジェクト構造

```
create-specment/
├── src/
│   ├── commands/          # CLIコマンド
│   ├── core/             # コア機能
│   ├── features/         # 機能定義
│   ├── generators/       # コードジェネレーター
│   ├── plugins/          # プラグイン統合
│   ├── templates/        # テンプレート定義
│   ├── tests/           # 統合テスト
│   ├── types/           # TypeScript型定義
│   └── utils/           # ユーティリティ関数
├── templates/           # テンプレートファイル
├── docs/               # ドキュメント
├── .kiro/              # プロジェクト仕様
└── bin/                # ビルド出力
```

## 🛠 開発ワークフロー

### 1. 機能ブランチを作成

```bash
git checkout -b feature/your-feature-name
```

### 2. 変更を行う

- 既存のコードスタイルと規約に従う
- 新しいコードにはTypeScript型を追加
- パブリックAPIにはJSDocコメントを含める
- 新機能にはテストを書く

### 3. 変更をテスト

```bash
# 全テストを実行
nr test

# 特定のテストを実行
nr test src/utils/validation.test.ts

# ウォッチモードでテストを実行
nr test:watch

# CLIをローカルでテスト
node bin/index.js test-project
```

### 4. ビルドして確認

```bash
# プロジェクトをビルド
nr build

# ビルド出力を確認
ls -la bin/

# ビルドされたCLIを確認
node bin/index.js --help
```

### 5. 変更をコミット

```bash
git add .
git commit -m \"feat: add amazing new feature\"
```

### 6. プッシュしてPRを作成

```bash
git push origin feature/your-feature-name
```

その後、GitHubでプルリクエストを作成します。

## 📝 コードスタイルガイドライン

### TypeScript

- 新しいコードにはTypeScriptを使用
- 全データ構造にインターフェースを定義
- 厳密な型チェックを使用
- 可能な限り`any`型を避ける

```typescript
// 良い例
interface ProjectOptions {
  name: string;
  template: string;
  features: string[];
}

// 避ける例
const options: any = { ... };
```

### 命名規約

- 変数と関数にはcamelCaseを使用
- クラスとインターフェースにはPascalCaseを使用
- ファイル名にはkebab-caseを使用
- 定数にはUPPER_CASEを使用

```typescript
// 良い例
const projectName = 'my-project';
class ProjectGenerator { }
interface CreateOptions { }
const MAX_RETRIES = 3;
```

### ファイル構成

- 1ファイルに1クラス/インターフェース
- 関連機能をディレクトリにグループ化
- クリーンなインポートのためindex.tsファイルを使用
- ファイルを集中的で結合性の高いものに保つ

### エラーハンドリング

- カスタムエラークラスを使用
- 意味のあるエラーメッセージを提供
- エラーを適切に処理
- エラーを適切にログ出力

```typescript
// 良い例
try {
  await generateProject(options);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`Validation failed: ${error.message}`);
  } else {
    console.error(`Unexpected error: ${error}`);
  }
  process.exit(1);
}
```

## 🧪 テストガイドライン

### テスト構造

- 個別の関数にはユニットテストを書く
- 完全なワークフローには統合テストを書く
- 説明的なテスト名を使用
- `describe`ブロックで関連テストをグループ化

```typescript
describe('ProjectValidator', () => {
  describe('validateProjectName', () => {
    it('should accept valid project names', () => {
      expect(validateProjectName('my-project')).toBe(true);
    });

    it('should reject invalid project names', () => {
      expect(validateProjectName('invalid@name')).toBe(false);
    });
  });
});
```

### テストカバレッジ

- 高いテストカバレッジを目指す
- 成功とエラーケースの両方をテスト
- エッジケースと境界条件をテスト
- 外部依存関係を適切にモック

### テストの実行

```bash
# 全テストを実行
nr test

# カバレッジ付きでテストを実行
nr test:coverage

# 特定のテストファイルを実行
nr test src/utils/validation.test.ts

# 開発中はウォッチモードでテストを実行
nr test:watch
```

## 📚 ドキュメント

### コードドキュメント

- 全パブリックAPIにJSDocコメントを追加
- パラメーターと戻り値の型の説明を含める
- 複雑な関数には使用例を提供

```typescript
/**
 * npmパッケージ命名規則に従ってプロジェクト名を検証
 * @param name - 検証するプロジェクト名
 * @returns 名前が有効な場合はtrue、そうでなければfalse
 * @example
 * ```typescript
 * const isValid = validateProjectName('my-project'); // true
 * const isInvalid = validateProjectName('invalid@name'); // false
 * ```
 */
export function validateProjectName(name: string): boolean {
  return /^[a-zA-Z0-9-_]+$/.test(name) && name.length > 0;
}
```

### READMEの更新

- 新機能のREADME.mdを更新
- 新機能の例を追加
- 必要に応じてトラブルシューティングセクションを更新
- ドキュメントをコード変更と同期させる

## 🐛 バグレポート

### レポート前に

1. 既存のissueを検索
2. 最新バージョンを試す
3. トラブルシューティングガイドを確認
4. 問題を再現

### バグレポートテンプレート

```markdown
## バグの説明
バグの明確な説明。

## 再現手順
1. `create-specment my-project`を実行
2. テンプレート'classic-spec'を選択
3. 生成中にエラーが発生

## 期待される動作
プロジェクトが正常に生成されるべき。

## 実際の動作
エラーメッセージ: \"Template not found\"

## 環境
- OS: Ubuntu 22.04 (WSL2)
- Node.js: 20.17.0
- npm: 9.6.7
- create-specment: 1.0.0

## 追加コンテキスト
追加情報やスクリーンショット。
```

## 💡 機能リクエスト

### リクエスト前に

1. 機能が既に存在するかチェック
2. 既存の機能リクエストを検索
3. プロジェクトスコープに適合するか検討
4. 実装アプローチを考える

### 機能リクエストテンプレート

```markdown
## 機能の説明
提案する機能の明確な説明。

## 使用ケース
なぜこの機能が必要か？どのような問題を解決するか？

## 提案するソリューション
この機能はどのように動作すべきか？

## 検討した代替案
他にどのようなアプローチを検討したか？

## 追加コンテキスト
追加情報やモックアップ。
```

## 🔄 プルリクエストプロセス

### 提出前に

1. 全テストが通ることを確認
2. ドキュメントを更新
3. 新機能にテストを追加
4. コードスタイルガイドラインに従う
5. 最新のmainブランチにリベース

### PRテンプレート

```markdown
## 説明
変更の簡潔な説明。

## 変更の種類
- [ ] バグ修正
- [ ] 新機能
- [ ] 破壊的変更
- [ ] ドキュメント更新

## テスト
- [ ] テストがローカルで通る
- [ ] 新しいテストを追加
- [ ] 手動テストを完了

## チェックリスト
- [ ] コードがスタイルガイドラインに従っている
- [ ] セルフレビューを完了
- [ ] ドキュメントを更新
- [ ] 破壊的変更なし（または文書化済み）
```

### レビュープロセス

1. 自動チェックが通る必要がある
2. メンテナーによるコードレビュー
3. 異なる環境でのテスト
4. ドキュメントレビュー
5. 最終承認とマージ

## 🏷 リリースプロセス

### バージョン番号

[セマンティックバージョニング](https://semver.org/)に従います：

- **MAJOR**: 破壊的変更
- **MINOR**: 新機能（後方互換）
- **PATCH**: バグ修正（後方互換）

### リリースチェックリスト

1. package.jsonのバージョンを更新
2. CHANGELOG.mdを更新
3. リリースタグを作成
4. npmに公開
5. GitHubリリースを作成
6. ドキュメントを更新

## 🤝 コミュニティガイドライン

### 行動規範

- 敬意を持ち包括的である
- 新参者を歓迎する
- 建設的なフィードバックを提供
- 人ではなく問題に焦点を当てる
- 他者の学習と成長を助ける

### コミュニケーション

- バグレポートにはGitHub Issuesを使用
- 質問にはGitHub Discussionsを使用
- コード変更にはプルリクエストを使用
- コミュニケーションは明確で簡潔に
- コンテキストと例を提供

## 📞 ヘルプの取得

### リソース

- [README.md](README.md) - プロジェクト概要と使用方法
- [GitHub Issues](https://github.com/your-org/create-specment/issues) - バグレポートと機能リクエスト
- [GitHub Discussions](https://github.com/your-org/create-specment/discussions) - 質問とコミュニティ
- [Docusaurus Documentation](https://docusaurus.io/) - 基盤プラットフォームドキュメント

### 連絡先

- GitHub Issues: 技術的問題
- GitHub Discussions: 一般的な質問
- Email: [maintainer@example.com] - セキュリティ問題のみ

---

create-specmentへの貢献をありがとうございます！🎉