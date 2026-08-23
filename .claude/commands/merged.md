---
description: Merge 後の後処理。タグ作成/push で CI が npm publish する。タグ→リリース→publish成否とnpm versionを確認。
---

Merge 済みであることが前提。

## 1. main へ切替え・最新化

- `git checkout main && git fetch --prune && git pull`

## 2. タグ作成・push

- `VERSION=$(jq -r .version package.json)`
- `git tag "v$VERSION" && git push origin "v$VERSION"`
  - `.github/workflows/publish.yaml` が tag `v*` の push で **npm publish を実行**する。

## 3. GitHub リリース作成

- `gh release create "v$VERSION" --generate-notes`

## 4. publish の確認

- `gh run list --workflow=publish.yaml` で publish ワークフローの成否を確認する(failed なら内容を提示)。
- `npm view create-specment version` が `$VERSION` と一致することを確認する。

## 5. issue の close 確認

- 関連 issue が close されたか確認し、漏れがあれば `gh issue close` する。
