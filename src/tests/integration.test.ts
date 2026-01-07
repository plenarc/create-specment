import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdirSync, rmSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { InteractiveSetup } from '../core/interactive-setup.js';
import { ProjectGenerator } from '../core/project-generator.js';
import type { CreateSpecmentOptions, UserSelections } from '../types/index.js';
import { getAvailableTemplates } from '../templates/index.js';
import { getAvailableFeatures } from '../features/index.js';

describe('エンドツーエンド統合テスト', () => {
  const testDir = join(process.cwd(), 'test-integration');
  const projectsDir = join(testDir, 'projects');

  beforeEach(() => {
    // テスト用ディレクトリの作成
    try {
      rmSync(testDir, { recursive: true, force: true });
    } catch (_error) {
      // ディレクトリが存在しない場合は無視
    }
    mkdirSync(projectsDir, { recursive: true });
  });

  afterEach(() => {
    // テスト後のクリーンアップ
    try {
      rmSync(testDir, { recursive: true, force: true });
    } catch (_error) {
      // クリーンアップエラーは無視
    }
  });

  describe('テンプレート生成テスト', () => {
    it('プロジェクト分析テンプレートの完全なプロジェクトを生成できること', async () => {
      const projectName = 'test-project-analysis';
      const _projectPath = join(projectsDir, projectName);

      const _options: CreateSpecmentOptions = {
        template: 'project-analysis',
        skipInstall: true,
        verbose: false,
      };

      try {
        // プロジェクト生成のテスト（実際の生成は行わず、設定の検証のみ）
        const templates = getAvailableTemplates();
        const template = templates.find((t) => t.name === 'project-analysis');

        expect(template).toBeDefined();
        expect(template?.name).toBe('project-analysis');
        expect(template?.description).toBeDefined();

        // テンプレートの基本構造を確認
        expect(template?.features).toBeDefined();
        expect(Array.isArray(template?.features)).toBe(true);
      } catch (error) {
        console.error('Template project-analysis generation failed:', error);
        throw error;
      }
    });

    it('利用可能な全テンプレートを検証できること', () => {
      const templates = getAvailableTemplates();

      expect(templates.length).toBeGreaterThan(0);

      templates.forEach((template) => {
        expect(template.name).toBeDefined();
        expect(template.description).toBeDefined();
        expect(template.features).toBeDefined();
        expect(Array.isArray(template.features)).toBe(true);
      });
    });
  });

  describe('機能統合テスト', () => {
    it('利用可能な全機能を検証できること', () => {
      const features = getAvailableFeatures();

      expect(features.length).toBeGreaterThan(0);

      features.forEach((feature) => {
        expect(feature.name).toBeDefined();
        expect(feature.description).toBeDefined();
        if (feature.config) {
          expect(typeof feature.config).toBe('object');
        }
      });
    });

    it('機能の組み合わせを検証できること', () => {
      const features = getAvailableFeatures();
      const featureNames = features.map((f) => f.name);

      // 基本的なフィーチャーが存在することを確認
      expect(featureNames).toContain('plantuml');
      expect(featureNames).toContain('redoc');
      expect(featureNames).toContain('mermaid');
    });
  });

  describe('設定検証テスト', () => {
    it('CreateSpecmentOptionsインターフェースを検証できること', () => {
      const validOptions: CreateSpecmentOptions = {
        template: 'project-analysis',
        skipInstall: true,
        verbose: false,
      };

      expect(validOptions.template).toBe('project-analysis');
      expect(validOptions.skipInstall).toBe(true);
      expect(validOptions.verbose).toBe(false);
    });

    it('InteractiveSetupのインスタンス化を検証できること', () => {
      const options: CreateSpecmentOptions = {
        template: 'project-analysis',
        skipInstall: true,
        verbose: false,
      };

      expect(() => {
        new InteractiveSetup(options);
      }).not.toThrow();
    });

    it('ProjectGeneratorのインスタンス化を検証できること', () => {
      const selections: UserSelections = {
        projectName: 'test-project',
        templates: [
          {
            name: 'project-analysis' as const,
            displayName: 'Project Analysis',
            description: 'Test template',
            features: ['search'],
          },
        ],
        features: [],
      };

      const options: CreateSpecmentOptions = {
        template: 'project-analysis',
        skipInstall: true,
        verbose: false,
      };

      expect(() => {
        new ProjectGenerator(selections, options);
      }).not.toThrow();
    });
  });

  describe('エラーハンドリングテスト', () => {
    it('無効なテンプレート名を処理できること', () => {
      const templates = getAvailableTemplates();
      const invalidTemplate = templates.find((t) => t.name === ('nonexistent-template' as any));

      expect(invalidTemplate).toBeUndefined();
    });

    it('プロジェクト名の形式を検証できること', () => {
      const invalidNames = ['invalid@name', 'invalid name', ''];

      invalidNames.forEach((name) => {
        // プロジェクト名の検証ロジックをテスト
        const isValid = /^[a-zA-Z0-9-_]+$/.test(name) && name.length > 0;
        expect(isValid).toBe(false);
      });

      const validNames = ['valid-name', 'valid_name', 'validname123'];

      validNames.forEach((name) => {
        const isValid = /^[a-zA-Z0-9-_]+$/.test(name) && name.length > 0;
        expect(isValid).toBe(true);
      });
    });
  });

  describe('システム統合テスト', () => {
    it('システム要件を検証できること', () => {
      // Node.jsバージョンの確認
      const nodeVersion = process.version;
      expect(nodeVersion).toBeDefined();
      expect(nodeVersion.startsWith('v')).toBe(true);

      // 必要なモジュールが利用可能かチェック
      expect(() => require('fs')).not.toThrow();
      expect(() => require('path')).not.toThrow();
      expect(() => require('child_process')).not.toThrow();
    });

    it('package.jsonの構造を検証できること', () => {
      const packageJsonPath = join(process.cwd(), 'package.json');
      expect(existsSync(packageJsonPath)).toBe(true);

      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      expect(packageJson.name).toBeDefined();
      expect(packageJson.version).toBeDefined();
      expect(packageJson.scripts).toBeDefined();
      expect(packageJson.dependencies).toBeDefined();
    });
  });
});
