import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Client.module.css";

const endpoint = "http://localhost:3001/delete";

export default function Client({ client, setClients }) {
  const navigate = useNavigate();

  function handleDelete() {
    axios
      .delete(`${endpoint}/${client._id}`)
      .then(() => {
        setClients((prev) => prev.filter((c) => c._id !== client._id));
      })
      .catch(() => alert("Error"));
  }

  function handleUpdate() {
    navigate(`/update/${client._id}`);
  }
  const clientDate = new Date(client.date);
  const dateOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = clientDate.toLocaleString(undefined, dateOptions);

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.surname}</td>
      <td>{client.email}</td>
      {/* <td>{client.date}</td> */}
      <td>{formattedDate}</td>
      <td>
        <button className={styles.deleteButton} onClick={handleDelete}>
          Delete
        </button>
      </td>
      <td>
        <button className={styles.updateButton} onClick={handleUpdate}>
          Update
        </button>
      </td>
    </tr>
  );
}
