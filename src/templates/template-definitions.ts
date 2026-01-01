import type { TemplateConfig } from '../types/index.js';

export const templateDefinitions: Record<string, TemplateConfig> = {
  'classic-spec': {
    name: 'classic-spec',
    displayName: 'Classic Specification',
    description: '汎用的な仕様書テンプレート。基本的なドキュメント構造を提供します。',
    docusaurusConfig: {
      title: 'Classic Specification Documentation',
      tagline: 'Classic Specification Documentation',
      presets: [['classic', { blog: { showReadingTime: true } }]],
    },
    defaultFeatures: ['search'],
    directoryStructure: {
      docs: ['intro.md', 'tutorial-basics', 'tutorial-extras'],
      static: ['img'],
      src: ['css', 'components'],
    },
    sampleContent: [
      {
        path: 'docs/intro.md',
        content: `---
sidebar_position: 1
---

# Tutorial Intro

Let's discover **Docusaurus in less than 5 minutes**.

## Getting Started

Get started by **creating a new site**.

Or **try Docusaurus immediately** with **[docusaurus.new](https://docusaurus.new)**.

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 20.0 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.
`,
        template: true,
      },
    ],
  },

  'project-analysis': {
    name: 'project-analysis',
    displayName: 'Project Analysis',
    description: 'プロジェクト概要・分析用テンプレート。プロジェクトの全体像を把握するための構造を提供します。',
    docusaurusConfig: {
      title: 'Project Analysis & Overview Documentation',
      tagline: 'Project Analysis & Overview Documentation',
      presets: [['classic', { blog: false }]],
    },
    defaultFeatures: ['plantuml'],
    directoryStructure: {
      docs: ['analysis', 'overview', 'stakeholders'],
      static: ['img', 'diagrams'],
    },
    sampleContent: [
      {
        path: 'docs/analysis/intro.md',
        content: `---
sidebar_position: 1
---

# プロジェクト分析

このセクションでは、プロジェクトの詳細な分析を行います。

## 分析の目的

- プロジェクトの現状把握
- 課題の特定
- 改善点の洗い出し

## 分析手法

### SWOT分析

#### Strengths (強み)
- 

#### Weaknesses (弱み)
- 

#### Opportunities (機会)
- 

#### Threats (脅威)
- 
`,
        template: true,
      },
    ],
  },

  'requirements': {
    name: 'requirements',
    displayName: 'Requirements Specification',
    description: '要件定義書テンプレート。機能要件・非機能要件を体系的に整理できます。',
    docusaurusConfig: {
      title: 'Requirements Specification Documentation',
      tagline: 'Requirements Specification Documentation',
      presets: [['classic', { blog: false }]],
    },
    defaultFeatures: ['search'],
    directoryStructure: {
      docs: ['functional', 'non-functional', 'use-cases'],
      static: ['img', 'diagrams'],
    },
    sampleContent: [
      {
        path: 'docs/functional/intro.md',
        content: `---
sidebar_position: 1
---

# 機能要件

このセクションでは、システムが提供すべき機能について定義します。

## 要件の記述方法

要件はEARS（Easy Approach to Requirements Syntax）フォーマットに従って記述します。

### 基本パターン

- **THE [システム] SHALL [動作]** - 常時要件
- **WHEN [トリガー], THE [システム] SHALL [応答]** - イベント駆動
- **WHILE [条件], THE [システム] SHALL [応答]** - 状態駆動
- **IF [条件], THEN THE [システム] SHALL [応答]** - 望ましくない事象

## 機能要件一覧

### FR-001: ユーザー認証

**User Story:** ユーザーとして、システムに安全にログインしたい

#### Acceptance Criteria

1. WHEN ユーザーが有効な認証情報を入力する時、THE システム SHALL ユーザーをログインさせる
2. WHEN ユーザーが無効な認証情報を入力する時、THE システム SHALL エラーメッセージを表示する
3. WHILE ユーザーがログイン中、THE システム SHALL セッションを維持する
`,
        template: true,
      },
    ],
  },

  'external-design': {
    name: 'external-design',
    displayName: 'External Design',
    description: '外部設計書テンプレート。システム外部とのインターフェース設計に特化しています。',
    docusaurusConfig: {
      title: 'External Design Specification Documentation',
      tagline: 'External Design Specification Documentation',
      presets: [['classic', { blog: false }]],
    },
    defaultFeatures: ['plantuml', 'redoc'],
    directoryStructure: {
      docs: ['architecture', 'api', 'ui'],
      static: ['img', 'diagrams', 'api-specs'],
    },
    sampleContent: [
      {
        path: 'docs/architecture/intro.md',
        content: `---
sidebar_position: 1
---

# システムアーキテクチャ

このセクションでは、システムの全体的なアーキテクチャについて説明します。

## アーキテクチャ概要

システムは以下の主要コンポーネントで構成されます：

\`\`\`plantuml
@startuml
!theme plain

package "Frontend" {
  [Web Application]
  [Mobile App]
}

package "Backend" {
  [API Gateway]
  [Application Server]
  [Database]
}

[Web Application] --> [API Gateway]
[Mobile App] --> [API Gateway]
[API Gateway] --> [Application Server]
[Application Server] --> [Database]

@enduml
\`\`\`

## 設計原則

1. **スケーラビリティ**: システムは負荷に応じて拡張可能
2. **可用性**: 99.9%以上の稼働率を維持
3. **セキュリティ**: 多層防御によるセキュリティ確保
`,
        template: true,
      },
    ],
  },

  'internal-design': {
    name: 'internal-design',
    displayName: 'Internal Design',
    description: '内部設計書テンプレート。システム内部の詳細設計とアルゴリズムに特化しています。',
    docusaurusConfig: {
      title: 'Internal Design Specification Documentation',
      tagline: 'Internal Design Specification Documentation',
      presets: [['classic', { blog: false }]],
    },
    defaultFeatures: ['plantuml'],
    directoryStructure: {
      docs: ['implementation', 'database', 'algorithms'],
      static: ['img', 'diagrams'],
    },
    sampleContent: [
      {
        path: 'docs/implementation/intro.md',
        content: `---
sidebar_position: 1
---

# 実装詳細

このセクションでは、システムの内部実装について詳細に説明します。

## モジュール構成

システムは以下のモジュールで構成されます：

\`\`\`plantuml
@startuml
!theme plain

package "Core Module" {
  class CoreService {
    +initialize()
    +process()
    +cleanup()
  }
}

package "Data Module" {
  class DataRepository {
    +save()
    +find()
    +update()
    +delete()
  }
}

package "Business Module" {
  class BusinessLogic {
    +validateInput()
    +processRequest()
    +generateResponse()
  }
}

CoreService --> DataRepository
CoreService --> BusinessLogic

@enduml
\`\`\`

## 実装ガイドライン

1. **コーディング規約**: TypeScript/ESLintルールに従う
2. **テスト**: 単体テスト・統合テストを必須とする
3. **ドキュメント**: JSDocによるAPI仕様書を作成
`,
        template: true,
      },
    ],
  },
};

export function getTemplateDefinition(templateName: string): TemplateConfig | undefined {
  return templateDefinitions[templateName];
}

export function getAllTemplateNames(): string[] {
  return Object.keys(templateDefinitions);
}

export function getTemplateDisplayNames(): Array<{ name: string; displayName: string; description: string }> {
  return Object.values(templateDefinitions).map(template => ({
    name: template.name,
    displayName: template.displayName,
    description: template.description,
  }));
}