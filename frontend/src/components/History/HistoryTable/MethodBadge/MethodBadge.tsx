import type { HttpMethod } from '@/lib/types';
import { getMethodColor, getMethodBg } from '@/lib/colors';
import styles from './MethodBadge.module.css';

type MethodBadgeProps = {
  method: HttpMethod;
};

export default function MethodBadge({ method }: MethodBadgeProps) {
  return (
    <span
      className={styles.badge}
      style={{
        color: getMethodColor(method),
        backgroundColor: getMethodBg(method),
      }}
    >
      {method}
    </span>
  );
}
