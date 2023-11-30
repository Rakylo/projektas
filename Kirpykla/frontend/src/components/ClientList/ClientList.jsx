import React, { useState, useEffect } from "react";
import axios from "axios";
import Client from "../Client/Client";
import styles from "./ClientList.module.css";

const endpoint = "http://localhost:3001/";

export default function ClientList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get(endpoint)
      .then(({ data }) => setClients(data))
      .catch(() => alert("Error"));
  }, []);

  return (
    <div className={styles.clientList}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.columnHeader}>Name:</th>
            <th className={styles.columnHeader}>Surname:</th>
            <th className={styles.columnHeader}>Email:</th>
            <th className={styles.columnHeader}>Date:</th>
            <th className={styles.columnHeader}>Delete:</th>
            <th className={styles.columnHeader}>Update:</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            return (
              <Client
                setClients={setClients}
                client={client}
                key={client._id}
                styles={styles}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
