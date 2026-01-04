import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

function DocumentSection() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className={styles.documentSection}>
      <div className="container">
        <Heading as="h2">このサイトについて</Heading>
        <p>
          このサイトは{siteConfig.title}
          の設計、仕様を管理するためのドキュメントサイトです。
        </p>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description="システム仕様書管理サイト">
      <HomepageHeader />
      <main className={styles.mainContent}>
        <DocumentSection />
      </main>
    </Layout>
  );
}
