export interface CreateSpecmentOptions {
  template?: string;
  skipInstall?: boolean;
  verbose?: boolean;
}

export interface TemplateType {
  name: 'classic-spec' | 'api-spec' | 'technical-spec' | 'enterprise-spec';
  displayName: string;
  description: string;
  features: string[];
}

export interface FeatureSelection {
  name: string;
  displayName: string;
  description: string;
  enabled: boolean;
  plugin?: string;
  config?: Record<string, any>;
}

export interface UserSelections {
  projectName: string;
  templates: TemplateType[];
  features: FeatureSelection[];
}

export interface TemplateConfig {
  name: string;
  displayName: string;
  description: string;
  docusaurusConfig: any;
  defaultFeatures: string[];
  directoryStructure: DirectoryStructure;
  sampleContent: ContentFile[];
}

export interface DirectoryStructure {
  docs: string[];
  static: string[];
  src?: string[];
}

export interface ContentFile {
  path: string;
  content: string;
  template: boolean;
}