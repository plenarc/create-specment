import chalk from 'chalk';
import { LANG, type Language } from '../constants/languages.js';

export class MessageFormatter {
  static success(message: string): void {
    console.log(chalk.green(`✅ ${message}`));
  }

  static error(message: string): void {
    console.log(chalk.red(`❌ ${message}`));
  }

  static warning(message: string): void {
    console.log(chalk.yellow(`⚠️  ${message}`));
  }

  static info(message: string): void {
    console.log(chalk.blue(`ℹ️  ${message}`));
  }

  static step(message: string): void {
    console.log(chalk.blue(`\n📋 ${message}`));
  }

  static subStep(message: string): void {
    console.log(chalk.gray(`  • ${message}`));
  }

  static debug(message: string): void {
    console.log(chalk.gray(`[DEBUG] ${message}`));
  }

  static completion(projectName: string, language: Language = LANG.EN.code): void {
    console.log();
    const isEn = language === LANG.EN.code;
    if (isEn) {
      console.log(chalk.green('🎉 Project created successfully!\n'));
      console.log(chalk.blue('Next steps:'));
      console.log(chalk.gray(`  cd ${projectName}`));
      console.log(chalk.gray('  ni                    # Install dependencies'));
      console.log(chalk.gray('  nr start              # Start development server'));
      console.log(chalk.gray('  nr build              # Build for production'));
      console.log(chalk.magenta('\n📚 Happy documenting!'));
    } else {
      console.log(chalk.green('🎉 プロジェクトが正常に作成されました！\n'));
      console.log(chalk.blue('次のステップ:'));
      console.log(chalk.gray(`  cd ${projectName}`));
      console.log(chalk.gray('  ni                    # 依存関係をインストール'));
      console.log(chalk.gray('  nr start              # 開発サーバーを起動'));
      console.log(chalk.gray('  nr build              # 本番用ビルド'));
      console.log(chalk.magenta('\n📚 楽しいドキュメント作成を！'));
    }
  }

  static installationStart(language: Language = LANG.EN.code): void {
    const isEn = language === LANG.EN.code;
    if (isEn) {
      this.step('Installing dependencies...');
      console.log(chalk.gray('This may take a few minutes depending on your internet connection.'));
    } else {
      this.step('依存関係をインストール中...');
      console.log(chalk.gray('インターネット接続によっては数分かかる場合があります。'));
    }
  }

  static installationSkipped(projectName: string, language: Language = LANG.EN.code): void {
    const isEn = language === LANG.EN.code;
    if (isEn) {
      this.warning('Dependency installation was skipped.');
      console.log(chalk.gray('You can install dependencies manually by running:'));
    } else {
      this.warning('依存関係のインストールがスキップされました。');
      console.log(chalk.gray('以下のコマンドで手動でインストールできます:'));
    }
    console.log(chalk.gray(`  cd ${projectName}`));
    console.log(chalk.gray('  ni'));
  }

  static installationFailed(projectName: string, language: Language = LANG.EN.code): void {
    const isEn = language === LANG.EN.code;
    if (isEn) {
      this.error('Dependency installation failed.');
      console.log(chalk.gray('Please install dependencies manually:'));
    } else {
      this.error('依存関係のインストールに失敗しました。');
      console.log(chalk.gray('手動でインストールしてください:'));
    }
    console.log(chalk.gray(`  cd ${projectName}`));
    console.log(chalk.gray('  ni'));
  }
}