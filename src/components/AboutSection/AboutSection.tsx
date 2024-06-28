import Image from "next/image";
import styles from "./AboutSection.module.css";

const AboutSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.imageContainer}>
          <Image
            src="/aboutImg.png"
            alt="about image"
            width={500}
            height={500}
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.welcomeText}>Welcome to MedLane.</p>
          <h3 className={styles.title}>We make healthcare Understandable, Accessible, and Affordable.</h3>
          <p className={styles.description}>
            MedLane brings to you an online platform, which can be accessed for
            all your health needs. We are trying to make healthcare a
            hassle-free experience for you. Get your allopathic, ayurvedic,
            homeopathic medicines, vitamins & nutrition supplements and other
            health-related products delivered at home.
          </p>
          <button className={styles.button}>Explore More</button>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
