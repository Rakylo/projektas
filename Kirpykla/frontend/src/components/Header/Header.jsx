import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <img
            className={styles.logo}
            src="https://img.favpng.com/15/2/10/hair-clipper-comb-hairstyle-barber-hairdresser-png-favpng-PeAwivwJyxtzcAirmhNbYzzRm_t.jpg"
            alt=""
          />
          <h1>Razor Crafters</h1>
          <p>Your Perfect Haircut Awaits</p>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="/"> Client List</a>
            </li>
            <li className={styles.navItem}>
              <a href="/post">Add a new Client</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
