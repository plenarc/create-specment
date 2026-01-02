/**
 * Language constants for consistent usage across the application
 */
export const LANG = {
  EN: {
    code: 'en' as const,
    label: 'English',
  },
  JP: {
    code: 'jp' as const,
    label: '日本語',
  },
} as const;

export type Language = (typeof LANG)[keyof typeof LANG]['code'];
