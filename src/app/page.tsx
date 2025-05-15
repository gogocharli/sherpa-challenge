import styles from './page.module.css';
import { TripDetails } from '@/components/TripDetails';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TripDetails
          title={'Trip Details'}
          tripId='d67eda7a-e201-4446-95db-f81d270cb28a'
        />
      </main>
    </div>
  );
}
