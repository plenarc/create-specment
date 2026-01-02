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
      docs: ['tutorial-basics', 'tutorial-extras'],
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
    description:
      'プロジェクト概要・分析用テンプレート。プロジェクトの全体像を把握するための構造を提供します。',
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

  requirements: {
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

  'api-spec': {
    name: 'api-spec',
    displayName: 'API Specification',
    description: 'API仕様書テンプレート。RESTful APIの詳細な仕様を記述できます。',
    docusaurusConfig: {
      title: 'API Specification Documentation',
      tagline: 'API Specification Documentation',
      presets: [['classic', { blog: false }]],
    },
    defaultFeatures: ['redoc', 'search'],
    directoryStructure: {
      docs: ['api', 'authentication', 'endpoints'],
      static: ['img', 'api-specs'],
    },
    sampleContent: [
      {
        path: 'docs/api/intro.md',
        content: `---
sidebar_position: 1
---

# API概要

このセクションでは、APIの全体的な仕様について説明します。

## API設計原則

1. **RESTful設計**: REST原則に従ったAPI設計
2. **一貫性**: 統一されたレスポンス形式
3. **セキュリティ**: 適切な認証・認可機能

## ベースURL

\`\`\`
https://api.example.com/v1
\`\`\`

## 認証

APIへのアクセスには認証が必要です。

### Bearer Token認証

\`\`\`http
Authorization: Bearer <your-token>
\`\`\`

## レスポンス形式

すべてのAPIレスポンスは以下の形式に従います：

\`\`\`json
{
  "success": true,
  "data": {},
  "message": "Success",
  "timestamp": "2026-01-02T15:00:00Z"
}
\`\`\`
`,
        template: true,
      },
    ],
  },

  'technical-spec': {
    name: 'technical-spec',
    displayName: 'Technical Specification',
    description: '技術仕様書テンプレート。システムの技術的な詳細を包括的に記述できます。',
    docusaurusConfig: {
      title: 'Technical Specification Documentation',
      tagline: 'Technical Specification Documentation',
      presets: [['classic', { blog: false }]],
    },
    defaultFeatures: ['plantuml', 'search'],
    directoryStructure: {
      docs: ['architecture', 'technology-stack', 'deployment'],
      static: ['img', 'diagrams'],
    },
    sampleContent: [
      {
        path: 'docs/architecture/intro.md',
        content: `---
sidebar_position: 1
---

# 技術アーキテクチャ

このセクションでは、システムの技術的なアーキテクチャについて詳細に説明します。

## システム構成

\`\`\`plantuml
@startuml
!theme plain

package "Frontend Layer" {
  [React Application]
  [Mobile App]
}

package "API Layer" {
  [API Gateway]
  [Load Balancer]
}

package "Application Layer" {
  [Microservice A]
  [Microservice B]
  [Microservice C]
}

package "Data Layer" {
  [PostgreSQL]
  [Redis Cache]
  [File Storage]
}

[React Application] --> [API Gateway]
[Mobile App] --> [API Gateway]
[API Gateway] --> [Load Balancer]
[Load Balancer] --> [Microservice A]
[Load Balancer] --> [Microservice B]
[Load Balancer] --> [Microservice C]
[Microservice A] --> [PostgreSQL]
[Microservice B] --> [Redis Cache]
[Microservice C] --> [File Storage]

@enduml
\`\`\`

## 技術スタック

### フロントエンド
- **Framework**: React 18.x
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI
- **Build Tool**: Vite

### バックエンド
- **Runtime**: Node.js 20.x
- **Framework**: Express.js
- **Database**: PostgreSQL 15.x
- **Cache**: Redis 7.x

### インフラストラクチャ
- **Container**: Docker
- **Orchestration**: Kubernetes
- **Cloud Provider**: AWS
- **CI/CD**: GitHub Actions
`,
        template: true,
      },
    ],
  },

  'enterprise-spec': {
    name: 'enterprise-spec',
    displayName: 'Enterprise Specification',
    description: '企業向け仕様書テンプレート。エンタープライズレベルの要件と仕様を記述できます。',
    docusaurusConfig: {
      title: 'Enterprise Specification Documentation',
      tagline: 'Enterprise Specification Documentation',
      presets: [['classic', { blog: false }]],
    },
    defaultFeatures: ['search', 'i18n'],
    directoryStructure: {
      docs: ['business-requirements', 'compliance', 'governance'],
      static: ['img', 'documents'],
    },
    sampleContent: [
      {
        path: 'docs/business-requirements/intro.md',
        content: `---
sidebar_position: 1
---

# ビジネス要件

このセクションでは、エンタープライズシステムのビジネス要件について説明します。

## ビジネス目標

### 主要目標
1. **業務効率化**: 既存業務プロセスの自動化により、30%の効率向上を実現
2. **コスト削減**: システム統合により、年間運用コストを20%削減
3. **顧客満足度向上**: レスポンス時間の短縮により、顧客満足度を向上

### 成功指標（KPI）
- **処理時間**: 平均処理時間を50%短縮
- **エラー率**: システムエラー率を1%以下に維持
- **可用性**: 99.9%以上のシステム稼働率

## ステークホルダー

### 内部ステークホルダー
- **経営陣**: 戦略的意思決定と予算承認
- **IT部門**: システム開発・運用・保守
- **業務部門**: 日常業務でのシステム利用

### 外部ステークホルダー
- **顧客**: サービス利用者
- **パートナー企業**: システム連携先
- **監査機関**: コンプライアンス監査

## コンプライアンス要件

### セキュリティ基準
- **ISO 27001**: 情報セキュリティマネジメントシステム
- **SOC 2**: セキュリティ・可用性・処理の完全性

### データ保護
- **GDPR**: EU一般データ保護規則への準拠
- **個人情報保護法**: 日本の個人情報保護法への準拠

### 業界標準
- **PCI DSS**: クレジットカード業界データセキュリティ基準
- **HIPAA**: 医療情報の取り扱い基準（該当する場合）
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

export function getTemplateDisplayNames(): Array<{
  name: string;
  displayName: string;
  description: string;
}> {
  return Object.values(templateDefinitions).map((template) => ({
    name: template.name,
    displayName: template.displayName,
    description: template.description,
  }));
}
