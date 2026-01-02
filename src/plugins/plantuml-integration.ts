import type { FeatureSelection } from '../types/index.js';

export interface PlantUMLConfig {
  server?: string;
  theme?: 'default' | 'dark';
  format?: 'svg' | 'png';
}

export class PlantUMLIntegration {
  static getDefaultConfig(): PlantUMLConfig {
    return {
      server: 'https://www.plantuml.com/plantuml',
      theme: 'default',
      format: 'svg'
    };
  }

  static generateDocusaurusConfig(feature: FeatureSelection): any {
    const config = feature.config?.plantuml || PlantUMLIntegration.getDefaultConfig();

    return {
      themeConfig: {
        plantuml: {
          server: config.server || 'https://www.plantuml.com/plantuml'
        }
      },
      plugins: [
        [
          'docusaurus-theme-plantuml',
          {
            // PlantUMLテーマの設定
            theme: config.theme || 'default',
            format: config.format || 'svg'
          }
        ]
      ]
    };
  }

  static getDependencies(): Record<string, string> {
    return {
      'docusaurus-theme-plantuml': '^1.0.0'
    };
  }

  static generateSampleContent(): string {
    return `# PlantUML Examples

このページではPlantUMLを使用した図表の例を紹介します。

## シーケンス図

\`\`\`plantuml
@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response
@enduml
\`\`\`

## クラス図

\`\`\`plantuml
@startuml
class User {
  +String name
  +String email
  +login()
  +logout()
}

class Admin {
  +manageUsers()
}

User <|-- Admin
@enduml
\`\`\`

## フローチャート

\`\`\`plantuml
@startuml
start
:ユーザー入力;
if (入力が有効?) then (yes)
  :処理実行;
  :結果表示;
else (no)
  :エラーメッセージ表示;
endif
stop
@enduml
\`\`\`

詳細な使用方法については[PlantUML公式ドキュメント](https://plantuml.com/)を参照してください。
`;
  }

  static validateConfig(config: PlantUMLConfig): { valid: boolean; message?: string } {
    if (config.server && !config.server.startsWith('http')) {
      return {
        valid: false,
        message: 'PlantUML server URL must start with http or https'
      };
    }

    if (config.theme && !['default', 'dark'].includes(config.theme)) {
      return {
        valid: false,
        message: 'PlantUML theme must be "default" or "dark"'
      };
    }

    if (config.format && !['svg', 'png'].includes(config.format)) {
      return {
        valid: false,
        message: 'PlantUML format must be "svg" or "png"'
      };
    }

    return { valid: true };
  }
}
