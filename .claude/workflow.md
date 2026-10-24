# workflow: create-specment

## 設定

| 項目 | 値 |
| --- | --- |
| flow | pr |
| language | en-ja |
| bump | start-issue |
| bump-file | package.json |
| bump-rule | kind (`.claude/` の変更を含む機能変更もマイナー) |
| checks | `nr format` → `nr lint` |
| implementer | subagents |
| after-merge | tag-publish |

## メモ

- tag `v*` の push で `.github/workflows/publish.yaml` が npm publish する。パッケージ名は `create-specment`
- PR では `test.yaml` (typecheck → format → lint → test → build) が走る
- ブランチ命名規約の原典: <https://plenarc.github.io/specment/docs/internal/policies/branch-naming-rules>
