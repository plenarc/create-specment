import { describe, it, expect, beforeEach } from 'vitest';
import { TemplateProcessor, createTemplateProcessor } from './template-processor.js';

describe('テンプレートプロセッサー', () => {
  let processor: TemplateProcessor;

  beforeEach(() => {
    processor = new TemplateProcessor({
      projectName: 'test-project',
      author: 'Test Author',
      email: 'test@example.com',
    });
  });

  describe('テンプレート処理', () => {
    it('単純な変数を置換できること', () => {
      const template = 'Hello {{projectName}}!';
      const result = processor.processTemplate(template);
      expect(result).toBe('Hello test-project!');
    });

    it('複数の変数を置換できること', () => {
      const template = 'Project: {{projectName}}, Author: {{author}}';
      const result = processor.processTemplate(template);
      expect(result).toBe('Project: test-project, Author: Test Author');
    });

    it('未定義変数を適切に処理できること', () => {
      const template = 'Hello {{unknownVariable}}!';
      const result = processor.processTemplate(template);
      expect(result).toBe('Hello {{unknownVariable}}!');
    });

    it('変数のないテンプレートを処理できること', () => {
      const template = 'This is a plain text template';
      const result = processor.processTemplate(template);
      expect(result).toBe('This is a plain text template');
    });

    it('空のテンプレートを処理できること', () => {
      const template = '';
      const result = processor.processTemplate(template);
      expect(result).toBe('');
    });

    it('不正な変数構文を処理できること', () => {
      const template = 'Hello {projectName} and {{author}';
      const result = processor.processTemplate(template);
      expect(result).toBe('Hello {projectName} and {{author}');
    });
  });

  describe('変数設定', () => {
    it('単一変数を設定できること', () => {
      processor.setVariable('customVar', 'custom value');
      const result = processor.processTemplate('{{customVar}}');
      expect(result).toBe('custom value');
    });

    it('複数変数を設定できること', () => {
      processor.setVariables({
        var1: 'value1',
        var2: 'value2',
      });
      const result = processor.processTemplate('{{var1}} and {{var2}}');
      expect(result).toBe('value1 and value2');
    });

    it('既存変数を上書きできること', () => {
      processor.setVariable('projectName', 'new-project-name');
      const result = processor.processTemplate('{{projectName}}');
      expect(result).toBe('new-project-name');
    });
  });

  describe('派生変数生成', () => {
    it('プロジェクト名から派生変数を生成できること', () => {
      const processor = new TemplateProcessor({ projectName: 'my-awesome-project' });
      processor.generateDerivedVariables();

      const variables = processor.getVariables();
      expect(variables.projectNameCamel).toBe('myAwesomeProject');
      expect(variables.projectNamePascal).toBe('MyAwesomeProject');
      expect(variables.projectNameConstant).toBe('MY_AWESOME_PROJECT');
      expect(variables.projectNameKebab).toBe('my-awesome-project');
    });

    it('単語のプロジェクト名を処理できること', () => {
      const processor = new TemplateProcessor({ projectName: 'project' });
      processor.generateDerivedVariables();

      const variables = processor.getVariables();
      expect(variables.projectNameCamel).toBe('project');
      expect(variables.projectNamePascal).toBe('Project');
      expect(variables.projectNameConstant).toBe('PROJECT');
      expect(variables.projectNameKebab).toBe('project');
    });
  });

  describe('デフォルト変数', () => {
    it('デフォルトの日付と年を設定できること', () => {
      const processor = new TemplateProcessor({});
      const variables = processor.getVariables();

      expect(variables.date).toMatch(/^\d{4}-\d{2}-\d{2}$/); // YYYY-MM-DD format
      expect(variables.year).toMatch(/^\d{4}$/); // YYYY format
    });

    it('デフォルトのプロジェクト名を設定できること', () => {
      const processor = new TemplateProcessor({});
      const variables = processor.getVariables();

      expect(variables.projectName).toBe('my-project');
    });
  });
});

describe('テンプレートプロセッサー作成', () => {
  it('プロジェクト名でプロセッサーを作成できること', async () => {
    const processor = await createTemplateProcessor('test-project');
    const variables = processor.getVariables();

    expect(variables.projectName).toBe('test-project');
    expect(variables.description).toBe('Documentation for test-project');
  });

  it('派生変数を含むこと', async () => {
    const processor = await createTemplateProcessor('my-test-project');
    const variables = processor.getVariables();

    expect(variables.projectNameCamel).toBe('myTestProject');
    expect(variables.projectNamePascal).toBe('MyTestProject');
    expect(variables.projectNameConstant).toBe('MY_TEST_PROJECT');
  });

  it('追加変数を受け入れること', async () => {
    const processor = await createTemplateProcessor('test-project', {
      customVar: 'custom value',
    });
    const variables = processor.getVariables();

    expect(variables.customVar).toBe('custom value');
  });
});
