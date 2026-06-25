import { BookOpen } from '@gravity-ui/icons';
import LocalizedLink from '@/components/LocalizedLink';
import styles from './Logo.module.css';

interface LogoProps {
  compact?: boolean;
  href?: string;
  className?: string;
}

export default function Logo({ compact = false, href = '/', className }: LogoProps) {
  if (compact) {
    return (
      <div className={`${styles.iconBox}${className ? ` ${className}` : ''}`}>
        <BookOpen className={styles.icon} />
      </div>
    );
  }

  return (
    <LocalizedLink href={href} className={`${styles.link}${className ? ` ${className}` : ''}`}>
      <div className={styles.iconBox}>
        <BookOpen className={styles.icon} />
      </div>
      <span className={styles.text}>Swagger Editor</span>
    </LocalizedLink>
  );
}
