# ni パッケージマネージャー統一ルール

## 基本原則

このプロジェクトでは、パッケージマネージャーに依存しない操作を実現するため、`@antfu/ni`を使用します。

## 必須コマンド

### インストール関連
```bash
# 依存関係のインストール
ni

# パッケージの追加
ni <package-name>
ni <package-name> -D  # 開発依存関係

# パッケージの削除
ni remove <package-name>
```

### スクリプト実行
```bash
# package.jsonのスクリプト実行
nr <script-name>

# 例
nr build
nr test
nr dev
```

### その他
```bash
# パッケージの実行（npx相当）
ni dlx <package-name>
```

## 禁止事項

以下のコマンドは使用禁止です：

❌ **使用禁止**
- `npm install`
- `npm run <script>`
- `yarn install`
- `yarn <script>`
- `pnpm install`
- `pnpm run <script>`
- `bun install`
- `bun run <script>`

✅ **使用推奨**
- `ni`
- `nr <script>`
- `ni dlx <package>`

## 理由

1. **環境統一**: 開発者がどのパッケージマネージャーを使用していても同じコマンドで操作可能
2. **設定不要**: プロジェクトのlockfileを自動検出してパッケージマネージャーを選択
3. **エラー削減**: パッケージマネージャーの違いによるエラーを防止
4. **効率向上**: 短いコマンドで操作可能

## 実装での注意点

### コード内でのパッケージマネージャー実行
```typescript
// ❌ 特定のパッケージマネージャーに依存
await exec('npm install');

// ✅ niを使用
await exec('ni');
```

### ドキュメント記載
```markdown
# ❌ 特定のパッケージマネージャーを指定
npm install
npm run build

# ✅ niを使用
ni
nr build
```

### エラーメッセージ
```typescript
// ✅ niの使用を推奨
console.log('Run: ni  # Install dependencies');
console.log('Run: nr start  # Start development server');
```

## 例外

以下の場合のみ、特定のパッケージマネージャーの直接使用を許可：

1. **CI/CD環境**: 特定のパッケージマネージャーが必要な場合
2. **パフォーマンス要件**: 特定の最適化が必要な場合
3. **互換性問題**: niで解決できない問題がある場合

ただし、これらの場合でも可能な限りniの使用を検討してください。