import { cancel } from '@clack/prompts';

export class UserCancelledError extends Error {
  constructor(message = 'Operation cancelled by user') {
    super(message);
    this.name = 'UserCancelledError';
  }
}

export class CLIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CLIError';
  }
}

export function handleError(error: unknown, context?: string): void {
  const message = error instanceof Error ? error.message : String(error);
  const fullMessage = context ? `${context}: ${message}` : message;

  cancel(fullMessage);
}

export function exitWithError(message: string): never {
  throw new CLIError(message);
}
