import Image from 'next/image';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.overlay}></div>
      <div className={styles.heroImageContainer}>
        <Image
          src="/heroBg2.jpg"
          alt="Pharmacy Hero Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          className={styles.heroImage}
        />
      </div>
      <div className={styles.heroTextContainer}>
        <h1 className={styles.heroTitle}>Welcome to Our Pharmacy</h1>
        <p className={styles.heroSubtitle}>Your health is our priority. Trusted solutions for all your medical needs.</p>
      </div>
    </div>
  );
};

export default HeroSection;
