// Footer.js
import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h1>BarberShop</h1>
          <p>Your Hair, Our Care</p>
        </div>
        <div className={styles.contact}>
          <h2>Contact Us</h2>
          <p>Email: info@barbershop.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; 2023 BarberShop. All rights reserved.</p>
      </div>
    </footer>
  );
}
