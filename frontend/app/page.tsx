import { Text } from '@gravity-ui/uikit';
import styles from './page.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <Text className={styles.title}>Home page</Text>
      <Text className={styles.subtitle}>Example for start page</Text>
    </div>
  );
}

export default Home;
