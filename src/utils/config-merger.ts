export interface MergeOptions {
  preserveExisting: boolean;
  allowOverwrite: boolean;
  verbose: boolean;
}

export interface MergeResult {
  success: boolean;
  merged: any;
  conflicts: ConfigConflict[];
  warnings: string[];
}

export interface ConfigConflict {
  path: string;
  existing: any;
  incoming: any;
  resolution: 'keep_existing' | 'use_incoming' | 'merge' | 'manual';
  reason: string;
}

export class ConfigMerger {
  private options: MergeOptions;

  constructor(options: MergeOptions) {
    this.options = options;
  }

  mergePackageJson(existing: any, incoming: any): MergeResult {
    const result: MergeResult = {
      success: true,
      merged: { ...existing },
      conflicts: [],
      warnings: [],
    };

    try {
      // Merge dependencies
      result.merged.dependencies = this.mergeDependencies(
        existing.dependencies || {},
        incoming.dependencies || {},
        'dependencies',
        result,
      );

      result.merged.devDependencies = this.mergeDependencies(
        existing.devDependencies || {},
        incoming.devDependencies || {},
        'devDependencies',
        result,
      );

      // Merge scripts
      result.merged.scripts = this.mergeScripts(
        existing.scripts || {},
        incoming.scripts || {},
        result,
      );

      // Merge other fields
      this.mergeSimpleFields(existing, incoming, result.merged, result, [
        'description',
        'keywords',
        'author',
        'license',
        'homepage',
        'repository',
        'bugs',
      ]);

      return result;
    } catch (error) {
      result.success = false;
      result.warnings.push(error instanceof Error ? error.message : 'Unknown error during merge');
      return result;
    }
  }

  mergeDocusaurusConfig(existing: string, _incoming: string): MergeResult {
    const result: MergeResult = {
      success: true,
      merged: existing,
      conflicts: [],
      warnings: [],
    };

    try {
      // For now, we'll use a simple approach of adding comments
      // In production, use a proper AST parser like @babel/parser

      const timestamp = new Date().toISOString();
      const integrationComment = `
// ============================================================================
// Specment Integration - ${timestamp}
// ============================================================================
// The following configurations were added by Specment integration.
// Please review and adjust as needed for your project.
//
// Note: This is a basic integration. For advanced customization,
// please refer to the Specment documentation.
// ============================================================================

`;

      // Find a good insertion point (after imports, before config)
      const configMatch = existing.match(/(const\s+config\s*=)/);
      if (configMatch && configMatch.index !== undefined) {
        const insertPosition = configMatch.index;
        result.merged =
          existing.slice(0, insertPosition) + integrationComment + existing.slice(insertPosition);
      } else {
        // Fallback: add at the beginning
        result.merged = integrationComment + existing;
      }

      result.warnings.push(
        'Docusaurus config integration is basic. Please review the generated configuration.',
      );

      return result;
    } catch (error) {
      result.success = false;
      result.warnings.push(
        error instanceof Error ? error.message : 'Unknown error during config merge',
      );
      return result;
    }
  }

  private mergeDependencies(
    existing: Record<string, string>,
    incoming: Record<string, string>,
    section: string,
    result: MergeResult,
  ): Record<string, string> {
    const merged = { ...existing };

    for (const [pkg, version] of Object.entries(incoming)) {
      if (existing[pkg]) {
        // Check for version conflicts
        if (existing[pkg] !== version) {
          const conflict: ConfigConflict = {
            path: `${section}.${pkg}`,
            existing: existing[pkg],
            incoming: version,
            resolution: this.options.preserveExisting ? 'keep_existing' : 'use_incoming',
            reason: 'Version conflict detected',
          };

          result.conflicts.push(conflict);

          if (this.options.preserveExisting) {
            // Keep existing version
            result.warnings.push(
              `Keeping existing version of ${pkg}: ${existing[pkg]} (incoming: ${version})`,
            );
          } else {
            // Use incoming version
            merged[pkg] = version;
            result.warnings.push(`Updated ${pkg} from ${existing[pkg]} to ${version}`);
          }
        }
      } else {
        // New dependency
        merged[pkg] = version;
        if (this.options.verbose) {
          result.warnings.push(`Added new dependency: ${pkg}@${version}`);
        }
      }
    }

    return merged;
  }

  private mergeScripts(
    existing: Record<string, string>,
    incoming: Record<string, string>,
    result: MergeResult,
  ): Record<string, string> {
    const merged = { ...existing };

    for (const [script, command] of Object.entries(incoming)) {
      if (existing[script]) {
        if (existing[script] !== command) {
          const conflict: ConfigConflict = {
            path: `scripts.${script}`,
            existing: existing[script],
            incoming: command,
            resolution: this.options.preserveExisting ? 'keep_existing' : 'use_incoming',
            reason: 'Script command conflict',
          };

          result.conflicts.push(conflict);

          if (!this.options.preserveExisting && this.options.allowOverwrite) {
            merged[script] = command;
            result.warnings.push(
              `Updated script '${script}' from '${existing[script]}' to '${command}'`,
            );
          } else {
            result.warnings.push(
              `Keeping existing script '${script}': ${existing[script]} (incoming: ${command})`,
            );
          }
        }
      } else {
        // New script
        merged[script] = command;
        if (this.options.verbose) {
          result.warnings.push(`Added new script: ${script}`);
        }
      }
    }

    return merged;
  }

  private mergeSimpleFields(
    existing: any,
    incoming: any,
    merged: any,
    result: MergeResult,
    fields: string[],
  ): void {
    for (const field of fields) {
      if (incoming[field] && !existing[field]) {
        merged[field] = incoming[field];
        if (this.options.verbose) {
          result.warnings.push(`Added ${field}: ${incoming[field]}`);
        }
      } else if (incoming[field] && existing[field] && incoming[field] !== existing[field]) {
        const conflict: ConfigConflict = {
          path: field,
          existing: existing[field],
          incoming: incoming[field],
          resolution: 'keep_existing',
          reason: 'Field value conflict',
        };

        result.conflicts.push(conflict);
        result.warnings.push(
          `Keeping existing ${field}: ${existing[field]} (incoming: ${incoming[field]})`,
        );
      }
    }
  }

  // Static helper methods
  static createSafePackageJsonMerge(
    existing: any,
    incoming: any,
    options: Partial<MergeOptions> = {},
  ): MergeResult {
    const merger = new ConfigMerger({
      preserveExisting: true,
      allowOverwrite: false,
      verbose: false,
      ...options,
    });

    return merger.mergePackageJson(existing, incoming);
  }

  static createSafeDocusaurusConfigMerge(
    existing: string,
    incoming: string,
    options: Partial<MergeOptions> = {},
  ): MergeResult {
    const merger = new ConfigMerger({
      preserveExisting: true,
      allowOverwrite: false,
      verbose: false,
      ...options,
    });

    return merger.mergeDocusaurusConfig(existing, incoming);
  }

  // Utility method to check if two package versions are compatible
  static areVersionsCompatible(version1: string, version2: string): boolean {
    // Remove version prefixes
    const clean1 = version1.replace(/[\^~]/, '');
    const clean2 = version2.replace(/[\^~]/, '');

    // Simple major version check
    const major1 = parseInt(clean1.split('.')[0], 10);
    const major2 = parseInt(clean2.split('.')[0], 10);

    return major1 === major2;
  }

  // Utility method to get the higher version
  static getHigherVersion(version1: string, version2: string): string {
    const clean1 = version1.replace(/[\^~]/, '');
    const clean2 = version2.replace(/[\^~]/, '');

    const parts1 = clean1.split('.').map(Number);
    const parts2 = clean2.split('.').map(Number);

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const v1 = parts1[i] || 0;
      const v2 = parts2[i] || 0;

      if (v1 > v2) return version1;
      if (v2 > v1) return version2;
    }

    return version1; // Equal versions, return first
  }
}
