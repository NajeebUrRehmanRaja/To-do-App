import React from "react";

const NavbarComponent = ({ title, links = [] }) => {
  return (
    <nav style={styles.navbar} aria-label="Main Navigation" className="fixed top-0 w-full z-10">
      <h1 style={styles.title} className="cursor-pointer text-2xl" onClick={() => window.location.href = '/' }>
        {title}
      </h1>
      <ul style={styles.navList}>
        {Array.isArray(links) &&
          links.map((link, index) => (
            <li key={link.href || index} style={styles.navItem}>
              <a href={link.href} style={styles.navLink}>
                {link.label}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
  },
  title: {
    margin: 0,
  },
  navList: {
    listStyle: "none",
    display: "flex",
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: "15px",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
  },
};

export default NavbarComponent;
