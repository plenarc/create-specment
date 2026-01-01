import { FeatureSelection } from '../types/index.js';

export interface RedocConfig {
  specs: RedocSpec[];
  theme?: {
    primaryColor?: string;
    primaryColorDark?: string;
  };
}

export interface RedocSpec {
  spec: string;
  route: string;
  id?: string;
}

export class RedocIntegration {
  static getDefaultConfig(): RedocConfig {
    return {
      specs: [
        {
          spec: 'static/openapi.yaml',
          route: '/api/',
          id: 'main-api'
        }
      ],
      theme: {
        primaryColor: '#1976d2',
        primaryColorDark: '#1565c0'
      }
    };
  }

  static generateDocusaurusConfig(feature: FeatureSelection): any {
    const config = feature.config?.redocusaurus || this.getDefaultConfig();
    
    return {
      plugins: [
        [
          'redocusaurus',
          {
            specs: config.specs || this.getDefaultConfig().specs,
            theme: config.theme || this.getDefaultConfig().theme
          }
        ]
      ]
    };
  }

  static getDependencies(): Record<string, string> {
    return {
      'redocusaurus': '^2.0.0'
    };
  }

  static generateSampleOpenAPISpec(): string {
    return `openapi: 3.0.3
info:
  title: Sample API
  description: |
    これはサンプルAPIの仕様書です。
    
    This is a sample API specification.
  version: 1.0.0
  contact:
    name: API Support
    email: support@example.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://api.example.com/v1
    description: Production server
  - url: https://staging-api.example.com/v1
    description: Staging server

paths:
  /users:
    get:
      summary: ユーザー一覧を取得 (Get list of users)
      description: システムに登録されているユーザーの一覧を取得します
      tags:
        - Users
      parameters:
        - name: limit
          in: query
          description: 取得する件数の上限
          required: false
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
        - name: offset
          in: query
          description: 取得開始位置
          required: false
          schema:
            type: integer
            minimum: 0
            default: 0
      responses:
        '200':
          description: ユーザー一覧の取得に成功
          content:
            application/json:
              schema:
                type: object
                properties:
                  users:
                    type: array
                    items:
                      $ref: '#/components/schemas/User'
                  total:
                    type: integer
                    description: 総件数
                  limit:
                    type: integer
                    description: 取得件数の上限
                  offset:
                    type: integer
                    description: 取得開始位置
        '400':
          description: リクエストパラメータが不正
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '500':
          description: サーバーエラー
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
    post:
      summary: 新しいユーザーを作成 (Create a new user)
      description: 新しいユーザーをシステムに登録します
      tags:
        - Users
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserRequest'
      responses:
        '201':
          description: ユーザーの作成に成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          description: リクエストボディが不正
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '409':
          description: ユーザーが既に存在
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '500':
          description: サーバーエラー
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /users/{userId}:
    get:
      summary: ユーザー詳細を取得 (Get user details)
      description: 指定されたIDのユーザー詳細情報を取得します
      tags:
        - Users
      parameters:
        - name: userId
          in: path
          required: true
          description: ユーザーID
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: ユーザー詳細の取得に成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: ユーザーが見つからない
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '500':
          description: サーバーエラー
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

components:
  schemas:
    User:
      type: object
      required:
        - id
        - name
        - email
        - createdAt
      properties:
        id:
          type: string
          format: uuid
          description: ユーザーID
          example: "123e4567-e89b-12d3-a456-426614174000"
        name:
          type: string
          description: ユーザー名
          minLength: 1
          maxLength: 100
          example: "田中太郎"
        email:
          type: string
          format: email
          description: メールアドレス
          example: "tanaka@example.com"
        age:
          type: integer
          description: 年齢
          minimum: 0
          maximum: 150
          example: 30
        createdAt:
          type: string
          format: date-time
          description: 作成日時
          example: "2023-01-01T00:00:00Z"
        updatedAt:
          type: string
          format: date-time
          description: 更新日時
          example: "2023-01-01T00:00:00Z"

    CreateUserRequest:
      type: object
      required:
        - name
        - email
      properties:
        name:
          type: string
          description: ユーザー名
          minLength: 1
          maxLength: 100
          example: "田中太郎"
        email:
          type: string
          format: email
          description: メールアドレス
          example: "tanaka@example.com"
        age:
          type: integer
          description: 年齢
          minimum: 0
          maximum: 150
          example: 30

    Error:
      type: object
      required:
        - code
        - message
      properties:
        code:
          type: string
          description: エラーコード
          example: "INVALID_REQUEST"
        message:
          type: string
          description: エラーメッセージ
          example: "リクエストパラメータが不正です"
        details:
          type: object
          description: エラーの詳細情報
          additionalProperties: true

  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

security:
  - BearerAuth: []

tags:
  - name: Users
    description: ユーザー管理API (User management API)
`;
  }

  static generateSampleDocumentation(): string {
    return `# API Documentation

このページではRedocを使用してOpenAPI仕様書を表示しています。

## API概要

Sample APIは、ユーザー管理機能を提供するRESTful APIです。

### 主な機能

1. **ユーザー管理**
   - ユーザー一覧の取得
   - ユーザー詳細の取得
   - 新しいユーザーの作成

### 認証

このAPIはJWT（JSON Web Token）を使用したBearer認証を採用しています。

### レスポンス形式

すべてのAPIレスポンスはJSON形式で返されます。

### エラーハンドリング

エラーが発生した場合、適切なHTTPステータスコードとエラー情報を含むJSONレスポンスが返されます。

## API仕様書

以下のRedocビューアーでAPI仕様書の詳細を確認できます：

import Redoc from '@theme/Redoc';

<Redoc specUrl="/openapi.yaml" />

## 使用例

### ユーザー一覧の取得

\`\`\`bash
curl -X GET "https://api.example.com/v1/users?limit=10&offset=0" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
\`\`\`

### 新しいユーザーの作成

\`\`\`bash
curl -X POST "https://api.example.com/v1/users" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -d '{
    "name": "田中太郎",
    "email": "tanaka@example.com",
    "age": 30
  }'
\`\`\`

詳細な使用方法については、上記のAPI仕様書を参照してください。
`;
  }

  static validateConfig(config: RedocConfig): { valid: boolean; message?: string } {
    if (!config.specs || config.specs.length === 0) {
      return {
        valid: false,
        message: 'At least one OpenAPI spec must be configured'
      };
    }

    for (const spec of config.specs) {
      if (!spec.spec || !spec.route) {
        return {
          valid: false,
          message: 'Each spec must have both "spec" and "route" properties'
        };
      }

      if (!spec.route.startsWith('/')) {
        return {
          valid: false,
          message: 'Route must start with "/"'
        };
      }
    }

    return { valid: true };
  }
}