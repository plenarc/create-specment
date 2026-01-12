# create-specment

[![npm version][npm-image]][npm-url]
[![npm downlads][npm-downloads-image]][npm-url]
[![License][license-image]][license-url]

[English](README.md) | [日本語](README-jp.md)

Demo: https://plenarc.github.io/specment/

1. 'specification' + 'document' => Specment
1. A site generation tool specializing in creating specification documents based on Docusaurus

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src=".github/images/screenshots/overview.png" alt="Project Overview" width="250" />
        <br>
        <em>Example: Project Overview</em>
      </td>
      <td align="center">
        <img src=".github/images/screenshots/as-is.png" alt="As-Is Current State Analysis" width="250" />
        <br>
        <em>Example: As-Is Current State Analysis</em>
      </td>
      <td align="center">
        <img src=".github/images/screenshots/redoc.png" alt="As-Is Current State Analysis" width="250" />
        <br>
        <em>Example: Redoc (OpenAPI)</em>
      </td>
    </tr>
  </table>
</div>

## Overview

`create-specment` is a CLI tool that easily generates Docusaurus projects specialized for specification documentation. It provides Storybook-like ease of use and create-better-t-stack-like interactive setup, integrating all the features needed for specification documentation creation.

## Features

1. 🚀 **Interactive Setup**: Generate projects by simply answering questions
1. 📋 **5 Specialized Templates**: Choose optimal templates based on your use case
1. 🔧 **Feature Selection**: Select PlantUML, Redoc, search, multilingual support, and more
1. 📝 **Variable Substitution**: Automatically replace project names and author information
1. 🎨 **Docusaurus Compatible**: Fully compatible with the existing Docusaurus ecosystem

## Installation Guide

### Prerequisites

The following software must be installed:

1. **WSL (for Windows environments)**
    1. For Windows environments, we strongly recommend using Windows Subsystem for Linux (WSL)
    1. Ubuntu 22.04 LTS or higher is recommended

    ```bash
    # Install WSL (run in Windows PowerShell with administrator privileges)
    wsl --install
    ```

1. **mise (development environment management tool)**
    1. Linux/macOS/WSL
        ```bash
        curl https://mise.run | sh

        # Update shell configuration
        echo 'eval "$(mise activate bash)"' >> ~/.bashrc
        source ~/.bashrc
        ```
    1. brew
        ```bash
        brew install mise
        ```
    1. Version check
        ```bash
        mise --version
        ```

1. **Node.js (LTS or higher recommended, installation via mise recommended)**

    ```bash
    # Install Node.js using mise
    mise install node@lts
    mise use node@lts

    # Check version
    node --version
    ```

1. **ni (package manager unification tool)**

    ```bash
    # Install ni using mise
    mise use npm:@antfu/ni@latest

    # Check version
    ni --version
    ```

### Installation Methods

1. For details on each option, see [Option Details](#option-details)

#### Method 1: Using ni (Recommended)

```bash
# Create project using ni (interactive setup will start)
nlx create-specment@latest
```

After execution, the following options will be displayed, so select the necessary documents and features:

```bash
◆  Please select display language / 表示言語を選択してください:
│  ● English
│  ○ 日本語
└

┌  🚀 Welcome to create-specment!
Creating a new Docusaurus-based specification documentation project...
│
◆  Enter folder name (project name):
│  _
└

◆  Which templates would you like to use? (Multiple selection)
│  ◻ Project Analysis
│  ◻ Requirements Specification
│  ◻ External Design
│  ◻ Internal Design
│  ◻ API (Using Redocusaurus)
└

◆  Which additional features would you like to include?
│  ◻ PlantUML
│  ◻ Mermaid
└
```

Once creation is complete, change to the folder and start in development mode after installation:

```bash
cd <folder-name> && ni && nr start
```

#### Method 2: Using npx

```bash
# Start setup
npx create-specment@latest
```

1. For option details, see Method 1

## Interactive Setup

When you run `create-specment`, the following options will be displayed sequentially:

### 1. Display Language Selection

```
◆ Please select display language / 表示言語を選択してください:
│ ● English
│ ○ 日本語
```

1. Select the display language for the interface
1. Subsequent questions will be displayed in the selected language

### 2. Project Name Input

```
◆ Enter folder name (project name):
│ _
```

1. Enter the folder name for the project to be created
1. This name will become the project directory name

### 3. Template Selection (Multiple selection possible)

```
◆ Which templates would you like to use? (Multiple selection)
│ ◻ Project Analysis (Provides structure for understanding project overview)
│ ◻ Requirements Specification
│ ◻ External Design
│ ◻ Internal Design
│ ◻ API (Using Redocusaurus)
```

1. Multiple templates can be selected simultaneously
1. Each template is generated as an independent section
1. At least one template must be selected

#### Project Analysis

Project overview and analysis template. Provides structure for understanding the overall picture of the project.

**Use Cases**:
1. Project proposals
1. Current state analysis reports
1. SWOT analysis documents

#### Requirements Specification
Requirements specification template. Allows systematic organization of functional and non-functional requirements.

**Use Cases**:
1. System requirements specifications
1. Functional specifications
1. EARS format requirement descriptions

#### External Design

External design specification template. Specialized for interface design with external systems.

**Use Cases**:
1. System architecture design documents
1. API design documents
1. UI/UX design documents

#### Internal Design

Internal design specification template. Specialized for detailed internal system design and algorithms.

**Use Cases**:
1. Detailed design documents
1. Database design documents
1. Algorithm specifications

#### API

1. Using [Redocusaurus](https://github.com/rohit-gohri/redocusaurus), you can display YAML format files written in OpenAPI specifications

### 4. Additional Feature Selection

```
◆ Which additional features would you like to include?
│ ◻ PlantUML (PlantUML diagram integration (UML diagrams and flowcharts))
│ ◻ Mermaid
```

1. **PlantUML**: Adds functionality to create UML diagrams and flowcharts
1. **Mermaid**: Adds functionality to create diagrams within Markdown
1. Both can be selected

#### PlantUML

1. You can use [PlantUML](https://plantuml.com/) for UML diagrams and sequence diagrams
1. Uses the Docusaurus theme [create-specment](https://www.npmjs.com/package/create-specment)
    1. ※ Please refer to the README at the link for usage and precautions

#### Mermaid

1. Uses the Docusaurus theme [theme-mermaid](https://docusaurus.io/docs/api/themes/@docusaurus/theme-mermaid)

#### Multilingual Support

TBD: Plans to support document creation in multiple languages (if requested)

## Command Line Options

```bash
create-specment [project-name] [options]

Arguments:
  project-name          Folder name for the project to be created (optional)
                        When specified: Skip folder name input

Options:
  -t, --template <template>  Template to use (project-analysis|requirements|external-design|internal-design|api-spec)
  --skip-install        Skip dependency installation
  --verbose             Show detailed logs
  -h, --help           Show help
  -V, --version        Show version
```

### Usage Examples

```bash
# Complete interactive setup (all options will be displayed)
create-specment

# Specify folder name and interactive setup (skip folder name input)
create-specment my-docs

# Completely non-interactive (skip folder name and template selection)
create-specment my-docs --template requirements

# Specify template only (folder name input will be displayed)
create-specment --template api-spec
```

## Troubleshooting

### Common Issues

#### 1. Node.js Version Error

```bash
Error: Node.js version 20.0 or higher is required
```

**Solution**:

```bash
# Check Node.js version
node --version

# Update Node.js using mise
mise install node@latest
mise use node@latest
```

#### 2. Package Installation Error

```bash
Error: Failed to install dependencies
```

**Solution**:

```bash
# Clear cache
ni clean
# Or manually clear
npm cache clean --force

# Reinstall
ni
```

#### 3. Port Conflict Error

```bash
Error: Port 3000 is already in use
```

**Solution**:

```bash
# Specify a different port
nr start -- --port 3001
```

### Notes for Windows Environment

1. **Strongly recommend using WSL**
    1. For Windows environments, we strongly recommend using WSL (Windows Subsystem for Linux)
    1. Operation in PowerShell or Command Prompt is not guaranteed
    1. Ubuntu 22.04 LTS or higher is recommended
1. **Unified Development Environment**
    1. The combination of mise + ni minimizes environment differences
    1. Running as a Linux environment within WSL provides an experience equivalent to macOS/Linux

## License

MIT License - See the [LICENSE](LICENSE) file for details.

## Contributing

We welcome contributions to the project! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Support

1. 🐛 **Bug Reports**: [GitHub Issues](https://github.com/plenarc/create-specment/issues)
1. 💡 **Feature Requests**: [GitHub Discussions](https://github.com/plenarc/create-specment/discussions)
1. 📖 **Documentation**: [Official Documentation](https://create-specment.dev)

## 関連プロジェクト

1. [Docusaurus](https://docusaurus.io/) - Static site generator
1. [mise](https://mise.jdx.dev/) - Development environment management tool
1. [ni](https://github.com/antfu/ni) - Package manager unification tool
1. [PlantUML](https://plantuml.com/) - UML diagram creation tool
1. [Redoc](https://redocly.github.io/redoc/) - OpenAPI specification display tool

[npm-image]: https://img.shields.io/npm/v/create-specment.svg
[npm-url]: https://www.npmjs.com/package/create-specment
[npm-downloads-image]: https://img.shields.io/npm/dw/create-specment.svg
[license-image]: https://img.shields.io/github/license/plenarc/create-specment.svg
[license-url]: https://github.com/plenarc/create-specment/blob/main/LICENSE
