export interface CreateSpecmentOptions {
  template?: string;
  skipInstall?: boolean;
  verbose?: boolean;
}

export interface TemplateType {
  name: 'project-analysis' | 'requirements' | 'external-design' | 'internal-design' | 'api-spec';
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
