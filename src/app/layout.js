export const metadata = {
  title: "SENDIO Platform",
  description: "Premium verified services platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: "sans-serif" }}>

        {/* NAVBAR */}
        <nav style={{
          width: "100%",
          padding: "15px 25px",
          background: "#1e2a2f",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000
        }}>
          
          {/* Logo */}
          <div style={{ fontWeight: "800", fontSize: "1.3rem" }}>
            SENDIO
          </div>

          {/* Links */}
          <div style={{
            display: "flex",
            gap: "20px",
            fontSize: "1rem",
            flexWrap: "wrap"
          }}>
            <a href="/" style={{ color: "#fff", textDecoration: "none" }}>Home</a>
            <a href="/advanced-search" style={{ color: "#fff", textDecoration: "none" }}>Search</a>
            <a href="/company-dashboard" style={{ color: "#fff", textDecoration: "none" }}>Companies</a>
            <a href="/worker-dashboard" style={{ color: "#fff", textDecoration: "none" }}>Workers</a>
            <a href="/client-dashboard" style={{ color: "#fff", textDecoration: "none" }}>Clients</a>
            <a href="/setup-profile" style={{ color: "#fff", textDecoration: "none" }}>Setup Profile</a>
            <a href="/login" style={{ color: "#fff", textDecoration: "none" }}>Login</a>
            <a href="/register" style={{ color: "#fff", textDecoration: "none" }}>Register</a>
          </div>

        </nav>

        {/* PAGE CONTENT */}
        <div style={{ minHeight: "100vh" }}>
          {children}
        </div>

      </body>
    </html>
  );
            }
