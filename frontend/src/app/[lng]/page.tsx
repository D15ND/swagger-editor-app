import styles from './page.module.css';
import { getT } from 'next-i18next/server';
import LiveResponseDemo from '@/components/SwaggerViewer/TryItOutPanel/LiveResponse/LiveResponseDemo';

export async function generateMetadata() {
  const { t } = await getT('home');
  return { title: t('title') };
}

export default async function Home() {
  const { t } = await getT('home');

  return (
    <div className={styles.page}>
      <LiveResponseDemo />
    </div>
  );
}
