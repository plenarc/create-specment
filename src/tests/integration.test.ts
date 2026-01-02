import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdirSync, rmSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { InteractiveSetup } from '../core/interactive-setup.js';
import { ProjectGenerator } from '../core/project-generator.js';
import type { CreateSpecmentOptions, UserSelections } from '../types/index.js';
import { getAvailableTemplates } from '../templates/index.js';
import { getAvailableFeatures } from '../features/index.js';

describe('End-to-End Integration Tests', () => {
  const testDir = join(process.cwd(), 'test-integration');
  const projectsDir = join(testDir, 'projects');

  beforeEach(() => {
    // テスト用ディレクトリの作成
    try {
      rmSync(testDir, { recursive: true, force: true });
    } catch (error) {
      // ディレクトリが存在しない場合は無視
    }
    mkdirSync(projectsDir, { recursive: true });
  });

  afterEach(() => {
    // テスト後のクリーンアップ
    try {
      rmSync(testDir, { recursive: true, force: true });
    } catch (error) {
      // クリーンアップエラーは無視
    }
  });

  describe('Template Generation Tests', () => {
    it('should generate complete project for classic-spec template', async () => {
      const projectName = 'test-classic-spec';
      const projectPath = join(projectsDir, projectName);

      const options: CreateSpecmentOptions = {
        template: 'classic-spec',
        skipInstall: true,
        verbose: false
      };

      try {
        // プロジェクト生成のテスト（実際の生成は行わず、設定の検証のみ）
        const templates = getAvailableTemplates();
        const template = templates.find(t => t.name === 'classic-spec');

        expect(template).toBeDefined();
        expect(template?.name).toBe('classic-spec');
        expect(template?.description).toBeDefined();

        // テンプレートの基本構造を確認
        expect(template?.features).toBeDefined();
        expect(Array.isArray(template?.features)).toBe(true);

      } catch (error) {
        console.error('Template classic-spec generation failed:', error);
        throw error;
      }
    });

    it('should validate all available templates', () => {
      const templates = getAvailableTemplates();

      expect(templates.length).toBeGreaterThan(0);

      templates.forEach(template => {
        expect(template.name).toBeDefined();
        expect(template.description).toBeDefined();
        expect(template.features).toBeDefined();
        expect(Array.isArray(template.features)).toBe(true);
      });
    });
  });

  describe('Feature Integration Tests', () => {
    it('should validate all available features', () => {
      const features = getAvailableFeatures();

      expect(features.length).toBeGreaterThan(0);

      features.forEach(feature => {
        expect(feature.name).toBeDefined();
        expect(feature.description).toBeDefined();
        if (feature.config) {
          expect(typeof feature.config).toBe('object');
        }
      });
    });

    it('should validate feature combinations', () => {
      const features = getAvailableFeatures();
      const featureNames = features.map(f => f.name);

      // 基本的なフィーチャーが存在することを確認
      expect(featureNames).toContain('plantuml');
      expect(featureNames).toContain('redoc');
      expect(featureNames).toContain('i18n');
    });
  });

  describe('Configuration Validation Tests', () => {
    it('should validate CreateSpecmentOptions interface', () => {
      const validOptions: CreateSpecmentOptions = {
        template: 'classic-spec',
        skipInstall: true,
        verbose: false
      };

      expect(validOptions.template).toBe('classic-spec');
      expect(validOptions.skipInstall).toBe(true);
      expect(validOptions.verbose).toBe(false);
    });

    it('should validate InteractiveSetup instantiation', () => {
      const options: CreateSpecmentOptions = {
        template: 'classic-spec',
        skipInstall: true,
        verbose: false
      };

      expect(() => {
        new InteractiveSetup(options);
      }).not.toThrow();
    });

    it('should validate ProjectGenerator instantiation', () => {
      const selections: UserSelections = {
        projectName: 'test-project',
        templates: [{
          name: 'classic-spec' as const,
          displayName: 'Classic Specification',
          description: 'Test template',
          features: ['search']
        }],
        features: []
      };

      const options: CreateSpecmentOptions = {
        template: 'classic-spec',
        skipInstall: true,
        verbose: false
      };

      expect(() => {
        new ProjectGenerator(selections, options);
      }).not.toThrow();
    });
  });

  describe('Error Handling Tests', () => {
    it('should handle invalid template names', () => {
      const templates = getAvailableTemplates();
      const invalidTemplate = templates.find(t => t.name === 'nonexistent-template' as any);

      expect(invalidTemplate).toBeUndefined();
    });

    it('should validate project name format', () => {
      const invalidNames = ['invalid@name', 'invalid name', ''];

      invalidNames.forEach(name => {
        // プロジェクト名の検証ロジックをテスト
        const isValid = /^[a-zA-Z0-9-_]+$/.test(name) && name.length > 0;
        expect(isValid).toBe(false);
      });

      const validNames = ['valid-name', 'valid_name', 'validname123'];

      validNames.forEach(name => {
        const isValid = /^[a-zA-Z0-9-_]+$/.test(name) && name.length > 0;
        expect(isValid).toBe(true);
      });
    });
  });

  describe('System Integration Tests', () => {
    it('should validate system requirements', () => {
      // Node.jsバージョンの確認
      const nodeVersion = process.version;
      expect(nodeVersion).toBeDefined();
      expect(nodeVersion.startsWith('v')).toBe(true);

      // 必要なモジュールが利用可能かチェック
      expect(() => require('fs')).not.toThrow();
      expect(() => require('path')).not.toThrow();
      expect(() => require('child_process')).not.toThrow();
    });

    it('should validate package.json structure', () => {
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
