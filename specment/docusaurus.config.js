// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  "title": "specment",
  "tagline": "Classic Specification Documentation",
  "favicon": "img/favicon.ico",
  "url": "https://your-docusaurus-site.example.com",
  "baseUrl": "/",
  "organizationName": "your-org",
  "projectName": "specment",
  "onBrokenLinks": "throw",
  "onBrokenMarkdownLinks": "warn",
  "i18n": {
    "defaultLocale": "en",
    "locales": [
      "en",
      "ja"
    ],
    "localeConfigs": {
      "en": {
        "label": "English",
        "direction": "ltr",
        "htmlLang": "en-US"
      },
      "ja": {
        "label": "日本語",
        "direction": "ltr",
        "htmlLang": "ja-JP"
      }
    }
  },
  "presets": [
    [
      "classic",
      {
        "docs": {
          "sidebarPath": "./sidebars.js",
          "editUrl": "https://github.com/your-org/your-repo/tree/main/"
        },
        "theme": {
          "customCss": "./src/css/custom.css"
        },
        "blog": {
          "showReadingTime": true,
          "editUrl": "https://github.com/your-org/your-repo/tree/main/"
        }
      }
    ]
  ],
  "themeConfig": {
    "image": "img/docusaurus-social-card.jpg",
    "navbar": {
      "title": "specment",
      "logo": {
        "alt": "specment Logo",
        "src": "img/logo.svg"
      },
      "items": [
        {
          "type": "localeDropdown",
          "position": "right"
        }
      ]
    },
    "footer": {
      "style": "dark",
      "links": [
        {
          "title": "Documentation",
          "items": [
            {
              "label": "Getting Started",
              "to": "/docs/intro"
            }
          ]
        },
        {
          "title": "Community",
          "items": [
            {
              "label": "GitHub",
              "href": "https://github.com/your-org/your-repo"
            }
          ]
        }
      ],
      "copyright": "Copyright © 2026 specment. Built with Docusaurus."
    },
    "prism": {
      "theme": "github",
      "darkTheme": "dracula"
    },
    "plantuml": {
      "server": "https://www.plantuml.com/plantuml"
    }
  },
  "plugins": [
    [
      "docusaurus-theme-plantuml",
      {
        "theme": "default",
        "format": "svg"
      }
    ],
    [
      "redocusaurus",
      {
        "specs": [
          {
            "spec": "static/openapi.yaml",
            "route": "/api/"
          }
        ],
        "theme": {
          "primaryColor": "#1976d2",
          "primaryColorDark": "#1565c0"
        }
      }
    ]
  ]
};

module.exports = config;