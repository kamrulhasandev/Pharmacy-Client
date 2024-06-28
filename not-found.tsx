const NotFound = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          color: "#333",
          borderBottom: "1px solid #ccc",
          paddingBottom: "10px",
          marginBottom: "20px",
        }}
      >
        Page Not Found
      </h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
