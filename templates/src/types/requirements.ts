/**
 * Requirements related type definitions
 */

/**
 * Priority scale from 1 to 9
 * 1-3: Low priority
 * 4-6: Medium priority
 * 7-9: High priority
 */
export type PriorityScale = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * Requirement priority matrix
 */
export interface RequirementPriority {
  importance: PriorityScale;
  urgency: PriorityScale;
}
