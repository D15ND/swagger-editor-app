import { getT } from 'next-i18next/server';
import { Text } from '@gravity-ui/uikit';
import SignUpHandler from './SignUpHandler';
import styles from '../layout.module.css';

export default async function SignUpPage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  const { t } = await getT('auth', { lng });

  return (
    <>
      <Text as="h1" variant="header-2" className={styles.title}>
        {t('signup.title')}
      </Text>
      <Text variant="body-1" color="secondary" className={styles.description}>
        {t('signup.description')}
      </Text>
      <SignUpHandler lng={lng} />
    </>
  );
}
