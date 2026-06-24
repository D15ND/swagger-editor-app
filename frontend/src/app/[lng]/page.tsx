import styles from './page.module.css';
import { getT } from 'next-i18next/server';

export async function generateMetadata() {
  const { t } = await getT('home');
  return { title: t('title') };
}

export default async function Home() {
  const { t } = await getT('home');

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
        <p className={styles.description}>{t('description')}</p>
      </main>
    </div>
  );
}
