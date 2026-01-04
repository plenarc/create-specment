import type { FeatureSelection } from '../types/index.js';
import { LANG } from '../constants/languages.js';

export function getAvailableFeatures(): FeatureSelection[] {
  return [
    {
      name: 'plantuml',
      displayName: 'PlantUML',
      description: 'PlantUML図表統合 (UML diagrams and flowcharts)',
      enabled: false,
      plugin: 'docusaurus-theme-plantuml',
      config: {
        plantuml: {
          server: 'https://www.plantuml.com/plantuml',
        },
      },
    },
    {
      name: 'mermaid',
      displayName: 'Mermaid',
      description: 'Mermaid図表統合 (Flowcharts, sequence diagrams, and more)',
      enabled: false,
      plugin: '@docusaurus/theme-mermaid',
      config: {
        mermaid: {
          theme: 'default',
          options: {
            fontFamily: 'inherit',
          },
        },
      },
    },
    {
      name: 'redoc',
      displayName: 'Redoc(Redocusaurus)',
      description: 'OpenAPI仕様書のRedoc表示 (OpenAPI documentation with Redoc)',
      enabled: false,
      plugin: 'redocusaurus',
      config: {
        redocusaurus: {
          specs: [
            {
              spec: 'static/openapi.yaml',
              route: '/api/',
            },
          ],
        },
      },
    },
  ];
}
