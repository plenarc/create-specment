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
          server: 'https://www.plantuml.com/plantuml'
        }
      }
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
              route: '/api/'
            }
          ]
        }
      }
    },
    {
      name: 'i18n',
      displayName: 'Internationalization (i18n)',
      description: '多言語対応 (Multi-language support)',
      enabled: false,
      config: {
        i18n: {
          defaultLocale: LANG.EN.code,
          locales: [LANG.EN.code, 'ja']
        }
      }
    }
  ];
}