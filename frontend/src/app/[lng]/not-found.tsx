'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@gravity-ui/uikit';
import { useT } from 'next-i18next/client';

import styles from './not-found.module.css';

export default function NotFoundPage() {
  const router = useRouter();
  const params = useParams<{ lng: string }>();
  const { t } = useT('notFound');

  function handleGoBack() {
    router.back();
  }

  return (
    <main className={styles.page}>
      <div className={styles.decorPrimary} aria-hidden="true" />
      <div className={styles.decorSecondary} aria-hidden="true" />

      <section className={styles.content}>
        <div className={styles.iconBox} aria-hidden="true">
          <span className={styles.fileQuestionIcon} />
        </div>

        <h1>{t('title')}</h1>

        <h2>{t('subtitle')}</h2>

        <p>{t('description')}</p>

        <div className={styles.actions}>
          <Button view="outlined" size="xl" onClick={handleGoBack}>
            <span className={styles.buttonContent}>
              <span className={styles.arrowLeftIcon} />
              {t('goBack')}
            </span>
          </Button>

          <Link className={styles.homeLink} href={`/${params.lng}`}>
            <span className={styles.homeIcon} />
            {t('backHome')}
          </Link>
        </div>
      </section>
    </main>
  );
}
