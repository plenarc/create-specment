# トラブルシューティングガイド

create-specmentを使用する際の一般的な問題を解決するためのガイドです。

## 🚨 よくある問題

### インストール問題

#### 問題: グローバルインストールが失敗する

**エラーメッセージ:**
- `EACCES: permission denied`
- `npm ERR! code EACCES`
- `Error: EPERM: operation not permitted`

**解決方法:**

1. **sudoを使用（macOS/Linux）:**
   ```bash
   sudo ni -g create-specment
   ```

2. **niを使用（推奨）:**
   ```bash
   ni -g create-specment
   ```

3. **npmプレフィックスを設定:**
   ```bash
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
   source ~/.bashrc
   ni -g create-specment
   ```

4. **ni dlxを使用（インストール不要）:**
   ```bash
   ni dlx create-specment my-project
   ```

#### 問題: Node.jsバージョン非互換

**エラーメッセージ:**
- `engine node: wanted: >=20.0.0`
- `Unsupported engine`

**解決方法:**

1. **Node.jsバージョンを確認:**
   ```bash
   node --version
   ```

2. **miseを使用してNode.jsを更新:**
   ```bash
   mise install node@20
   mise use node@20
   ```

3. **nvmを使用してNode.jsを更新:**
   ```bash
   nvm install 20
   nvm use 20
   ```

### プロジェクト生成問題

#### 問題: プロジェクト生成が失敗する

**エラーメッセージ:**
- `Template not found`
- `Failed to create project`
- `ENOENT: no such file or directory`

**解決方法:**

1. **インターネット接続を確認:**
   ```bash
   ping google.com
   ```

2. **プロジェクト名フォーマットを確認:**
   ```bash
   # 有効な名前
   create-specment my-project
   create-specment my_project
   create-specment myproject123
   
   # 無効な名前（失敗する）
   create-specment \"my project\"  # スペース
   create-specment my@project    # 特殊文字
   create-specment \"\"            # 空の名前
   ```

3. **ディスク容量を確認:**
   ```bash
   df -h
   ```

4. **デバッグ用に詳細モードを使用:**
   ```bash
   create-specment my-project --verbose
   ```

5. **npmキャッシュをクリア:**
   ```bash
   npm cache clean --force
   ```

#### 問題: 不完全なプロジェクト生成

**症状:**
- ファイルやディレクトリが不足
- 空のpackage.json
- docusaurus.config.jsがない

**解決方法:**

1. **削除して再試行:**
   ```bash
   rm -rf my-project
   create-specment my-project
   ```

2. **ファイル権限を確認:**
   ```bash
   ls -la my-project/
   ```

3. **テンプレート選択を確認:**
   ```bash
   create-specment my-project --template classic-spec
   ```

### Docusaurus問題

#### 問題: Docusaurusの開始に失敗

**エラーメッセージ:**
- `Module not found`
- `Cannot resolve dependency`
- `Port 3000 is already in use`

**解決方法:**

1. **依存関係をインストール:**
   ```bash
   cd my-project
   ni  # または npm install
   ```

2. **Docusaurusキャッシュをクリア:**
   ```bash
   nr clear  # または npm run clear
   ```

3. **異なるポートを使用:**
   ```bash
   nr start -- --port 3001
   ```

4. **競合するプロセスを確認:**
   ```bash
   lsof -i :3000
   kill -9 <PID>
   ```

#### 問題: ビルド失敗

**エラーメッセージ:**
- `Build failed`
- `Webpack compilation error`
- `Module parse failed`

**解決方法:**

1. **クリーンビルド:**
   ```bash
   nr clear
   nr build
   ```

2. **Node.jsバージョンを確認:**
   ```bash
   node --version  # 20+である必要がある
   ```

3. **依存関係を更新:**
   ```bash
   ni  # または npm install
   ```

4. **構文エラーを確認:**
   ```bash
   # docusaurus.config.jsの構文をチェック
   node -c docusaurus.config.js
   ```

### WSL固有の問題

#### 問題: ファイル権限問題

**エラーメッセージ:**
- `EACCES: permission denied`
- `Operation not permitted`

**解決方法:**

1. **WSLファイルシステムでプロジェクトを作成:**
   ```bash
   cd ~
   create-specment my-project
   ```

2. **ファイル権限を修正:**
   ```bash
   chmod +x node_modules/.bin/*
   ```

3. **WSL2を使用（推奨）:**
   ```bash
   wsl --set-version Ubuntu 2
   ```

#### 問題: Windowsファイルシステムでの低速パフォーマンス

**解決方法:**

1. **WSLファイルシステムで作業:**
   ```bash
   # /mnt/c/projects/の代わりに
   cd ~/projects/
   create-specment my-project
   ```

2. **WSL2を有効化:**
   ```bash
   wsl --set-default-version 2
   ```

#### 問題: パス解決問題

**エラーメッセージ:**
- `Cannot find module`
- `Path not found`

**解決方法:**

1. **Unix形式のパスを使用:**
   ```bash
   # 良い例
   cd ~/projects/my-project
   
   # 避ける例
   cd /mnt/c/Users/username/projects/my-project
   ```

2. **適切な改行コードを設定:**
   ```bash
   git config --global core.autocrlf input
   ```

### パッケージマネージャー問題

#### 問題: npm vs yarn vs pnpmの競合

**解決方法:**

1. **niを使用（推奨）:**
   ```bash
   ni -g create-specment
   ni  # 検出されたパッケージマネージャーでインストール
   ```

2. **1つのパッケージマネージャーに統一:**
   ```bash
   # 他のマネージャーのロックファイルを削除
   rm yarn.lock pnpm-lock.yaml  # npmを使用する場合
   rm package-lock.json pnpm-lock.yaml  # yarnを使用する場合
   rm package-lock.json yarn.lock  # pnpmを使用する場合
   ```

3. **全キャッシュをクリア:**
   ```bash
   npm cache clean --force
   yarn cache clean
   pnpm store prune
   ```

#### 問題: パッケージインストールタイムアウト

**解決方法:**

1. **タイムアウトを増加:**
   ```bash
   npm config set timeout 60000
   ```

2. **異なるレジストリを使用:**
   ```bash
   npm config set registry https://registry.npmjs.org/
   ```

3. **インストールをスキップして手動でインストール:**
   ```bash
   create-specment my-project --skip-install
   cd my-project
   ni
   ```

## 🔧 環境固有のソリューション

### Windows（WSL）

#### セットアップチェックリスト

1. **WSL2をインストール:**
   ```powershell
   wsl --install
   wsl --set-default-version 2
   ```

2. **WSLにNode.jsをインストール:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **miseをインストール（推奨）:**
   ```bash
   curl https://mise.jdx.dev/install.sh | sh
   echo 'eval \"$(~/.local/bin/mise activate bash)\"' >> ~/.bashrc
   source ~/.bashrc
   mise install node@20
   ```

4. **niをインストール:**
   ```bash
   ni -g @antfu/ni
   ```

#### よくあるWSL問題

- **ファイル操作が遅い**: Windowsファイルシステム（`/mnt/c/`）ではなく、WSLファイルシステム（`~/`）で作業
- **権限問題**: 実行可能ファイルに`chmod +x`を使用
- **パス問題**: Unix形式のパスとフォワードスラッシュを使用

### macOS

#### セットアップチェックリスト

1. **Homebrewをインストール:**
   ```bash
   /bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"
   ```

2. **Node.jsをインストール:**
   ```bash
   brew install node@20
   ```

3. **miseをインストール（推奨）:**
   ```bash
   brew install mise
   echo 'eval \"$(mise activate bash)\"' >> ~/.bashrc
   source ~/.bashrc
   ```

#### よくあるmacOS問題

- **権限エラー**: グローバルインストールに`sudo`を使用またはnpmプレフィックスを設定
- **Xcodeツール**: `xcode-select --install`でインストール
- **M1/M2互換性**: ネイティブARM64 Node.jsビルドを使用

### Linux

#### セットアップチェックリスト

1. **システムを更新:**
   ```bash
   sudo apt update && sudo apt upgrade
   ```

2. **ビルドエッセンシャルをインストール:**
   ```bash
   sudo apt install build-essential curl git
   ```

3. **Node.jsをインストール:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **miseをインストール:**
   ```bash
   curl https://mise.jdx.dev/install.sh | sh
   ```

#### よくあるLinux問題

- **権限エラー**: npmプレフィックスを設定またはsudoを使用
- **依存関係不足**: build-essentialパッケージをインストール
- **ファイアウォール問題**: ポート3000-3001が開いているか確認

## 🐛 デバッグのヒント

### 詳細ログを有効化

```bash
create-specment my-project --verbose
```

### システム情報を確認

```bash
# Node.jsとnpmのバージョン
node --version
npm --version

# オペレーティングシステム
uname -a

# 利用可能なディスク容量
df -h

# メモリ使用量
free -h
```

### 生成されたプロジェクトを検証

```bash
# プロジェクト構造を確認
ls -la my-project/

# package.jsonを検証
cat my-project/package.json | jq .

# docusaurus設定を確認
node -c my-project/docusaurus.config.js

# Docusaurusビルドをテスト
cd my-project
nr build
```

### ネットワーク診断

```bash
# npmレジストリ接続をテスト
npm ping

# DNS解決を確認
nslookup registry.npmjs.org

# HTTPS接続をテスト
curl -I https://registry.npmjs.org/
```

## 📞 追加ヘルプの取得

### ヘルプを求める前に

1. **既存のissueを検索**: [GitHub Issues](https://github.com/your-org/create-specment/issues)を確認
2. **詳細モードを試す**: `--verbose`フラグで実行
3. **環境を確認**: Node.jsバージョンとシステム要件を確認
4. **最小セットアップでテスト**: まずデフォルトオプションで試す

### 問題を報告する際に

以下の情報を含めてください：

```bash
# システム情報
echo \"OS: $(uname -a)\"
echo \"Node.js: $(node --version)\"
echo \"npm: $(npm --version)\"
echo \"create-specment: $(create-specment --version)\"

# 失敗したコマンド
echo \"Command: create-specment my-project --verbose\"

# エラー出力（完全なエラーメッセージをコピー）
```

### サポートチャンネル

- **GitHub Issues**: バグレポートと技術的問題
- **GitHub Discussions**: 質問とコミュニティヘルプ
- **ドキュメント**: README.mdとインラインヘルプ（`--help`）

### 緊急回避策

1. **グローバルインストールの代わりにni dlxを使用:**
   ```bash
   ni dlx create-specment@latest my-project
   ```

2. **手動プロジェクトセットアップ:**
   ```bash
   mkdir my-project
   cd my-project
   npm init -y
   ni @docusaurus/core @docusaurus/preset-classic
   # テンプレートファイルを手動でコピー
   ```

3. **Dockerを使用:**
   ```bash
   docker run -it --rm -v $(pwd):/workspace node:20
   cd /workspace
   ni dlx create-specment my-project
   ```

---

**まだ問題がありますか？** 詳細な情報と共に[issue を作成](https://github.com/your-org/create-specment/issues/new)してください。