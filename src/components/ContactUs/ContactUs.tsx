import Image from 'next/image';
import styles from './ContactUs.module.css';

const ContactUs = () => {
  return (
    <div className={styles.contactUs}>
      <div className={styles.overlay}></div>
      <Image 
        src="/heroBg1.jpg" 
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        
        className={styles.backgroundImage}
      />
       <div className={styles.content}>
        <h1>Contact Us</h1>
        <form className={styles.contactForm}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" name="email" placeholder='example@example.com' required />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required></textarea>

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
};

export default ContactUs;
