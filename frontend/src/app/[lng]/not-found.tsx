import { FileQuestion, House } from '@gravity-ui/icons';
import { getT } from 'next-i18next/server';

import LocalizedLink from '@/components/LocalizedLink';
import { GoBackButton } from '@/components/GoBackButton';
import styles from './not-found.module.css';
import { Text } from '@gravity-ui/uikit';

export default async function NotFoundPage() {
  const { t } = await getT('notFound');

  return (
    <main className={styles.page}>
      <div className={styles.decorPrimary} aria-hidden="true" />
      <div className={styles.decorSecondary} aria-hidden="true" />

      <section className={styles.content}>
        <div className={styles.iconBox} aria-hidden="true">
          <FileQuestion className={styles.icon} />
        </div>

        <Text as="h1">{t('title')}</Text>

        <Text as="h2">{t('subtitle')}</Text>

        <Text>{t('description')}</Text>

        <div className={styles.actions}>
          <GoBackButton>{t('goBack')}</GoBackButton>

          <LocalizedLink className={styles.homeLink} href="/">
            <House className={styles.smallIcon} />
            {t('backHome')}
          </LocalizedLink>
        </div>
      </section>
    </main>
  );
}
