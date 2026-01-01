import { describe, it, expect, beforeEach } from 'vitest';
import { TemplateProcessor, createTemplateProcessor } from './template-processor.js';

describe('TemplateProcessor', () => {
  let processor: TemplateProcessor;

  beforeEach(() => {
    processor = new TemplateProcessor({
      projectName: 'test-project',
      author: 'Test Author',
      email: 'test@example.com',
    });
  });

  describe('processTemplate', () => {
    it('should replace simple variables', () => {
      const template = 'Hello {{projectName}}!';
      const result = processor.processTemplate(template);
      expect(result).toBe('Hello test-project!');
    });

    it('should replace multiple variables', () => {
      const template = 'Project: {{projectName}}, Author: {{author}}';
      const result = processor.processTemplate(template);
      expect(result).toBe('Project: test-project, Author: Test Author');
    });

    it('should handle undefined variables gracefully', () => {
      const template = 'Hello {{unknownVariable}}!';
      const result = processor.processTemplate(template);
      expect(result).toBe('Hello {{unknownVariable}}!');
    });

    it('should handle templates with no variables', () => {
      const template = 'This is a plain text template';
      const result = processor.processTemplate(template);
      expect(result).toBe('This is a plain text template');
    });

    it('should handle empty template', () => {
      const template = '';
      const result = processor.processTemplate(template);
      expect(result).toBe('');
    });

    it('should handle malformed variable syntax', () => {
      const template = 'Hello {projectName} and {{author}';
      const result = processor.processTemplate(template);
      expect(result).toBe('Hello {projectName} and {{author}');
    });
  });

  describe('setVariable and setVariables', () => {
    it('should set single variable', () => {
      processor.setVariable('customVar', 'custom value');
      const result = processor.processTemplate('{{customVar}}');
      expect(result).toBe('custom value');
    });

    it('should set multiple variables', () => {
      processor.setVariables({
        var1: 'value1',
        var2: 'value2',
      });
      const result = processor.processTemplate('{{var1}} and {{var2}}');
      expect(result).toBe('value1 and value2');
    });

    it('should override existing variables', () => {
      processor.setVariable('projectName', 'new-project-name');
      const result = processor.processTemplate('{{projectName}}');
      expect(result).toBe('new-project-name');
    });
  });

  describe('generateDerivedVariables', () => {
    it('should generate derived variables from project name', () => {
      const processor = new TemplateProcessor({ projectName: 'my-awesome-project' });
      processor.generateDerivedVariables();
      
      const variables = processor.getVariables();
      expect(variables.projectNameCamel).toBe('myAwesomeProject');
      expect(variables.projectNamePascal).toBe('MyAwesomeProject');
      expect(variables.projectNameConstant).toBe('MY_AWESOME_PROJECT');
      expect(variables.projectNameKebab).toBe('my-awesome-project');
    });

    it('should handle single word project names', () => {
      const processor = new TemplateProcessor({ projectName: 'project' });
      processor.generateDerivedVariables();
      
      const variables = processor.getVariables();
      expect(variables.projectNameCamel).toBe('project');
      expect(variables.projectNamePascal).toBe('Project');
      expect(variables.projectNameConstant).toBe('PROJECT');
      expect(variables.projectNameKebab).toBe('project');
    });
  });

  describe('default variables', () => {
    it('should set default date and year', () => {
      const processor = new TemplateProcessor({});
      const variables = processor.getVariables();
      
      expect(variables.date).toMatch(/^\d{4}-\d{2}-\d{2}$/); // YYYY-MM-DD format
      expect(variables.year).toMatch(/^\d{4}$/); // YYYY format
    });

    it('should set default project name', () => {
      const processor = new TemplateProcessor({});
      const variables = processor.getVariables();
      
      expect(variables.projectName).toBe('my-project');
    });
  });
});

describe('createTemplateProcessor', () => {
  it('should create processor with project name', async () => {
    const processor = await createTemplateProcessor('test-project');
    const variables = processor.getVariables();
    
    expect(variables.projectName).toBe('test-project');
    expect(variables.description).toBe('Documentation for test-project');
  });

  it('should include derived variables', async () => {
    const processor = await createTemplateProcessor('my-test-project');
    const variables = processor.getVariables();
    
    expect(variables.projectNameCamel).toBe('myTestProject');
    expect(variables.projectNamePascal).toBe('MyTestProject');
    expect(variables.projectNameConstant).toBe('MY_TEST_PROJECT');
  });

  it('should accept additional variables', async () => {
    const processor = await createTemplateProcessor('test-project', {
      customVar: 'custom value',
    });
    const variables = processor.getVariables();
    
    expect(variables.customVar).toBe('custom value');
  });
});