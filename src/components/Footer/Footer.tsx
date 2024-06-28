'use client';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#66BC89", padding: '20px 0', color: 'white' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <h4 style={{ margin: '10px 0' }}>MedLane</h4>
          <p style={{ margin: '10px 0' }}>
            © {new Date().getFullYear()} MedLane. All rights reserved.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '20px',
          }}>
            <a href="/about" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>About Us</a>
            <a href="/contact" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Contact</a>
            <a href="/privacy" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/terms" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Terms of Service</a>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '20px',
          }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: 'white' }}>Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: 'white' }}>Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: 'white' }}>Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
