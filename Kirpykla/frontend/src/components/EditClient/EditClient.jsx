import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./EditClient.module.css";

const endpoint = "http://localhost:3001/update";
const endpointGet = "http://localhost:3001/get";

export default function EditClient() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${endpointGet}/${id}`).then(({ data }) => {
      setName(data.name);
      setSurname(data.surname);
      setEmail(data.email);
      setDate(data.date.split(".")[0]);
    });
  }, [id]);

  function validate() {
    if (!name || !surname || !email || !date) {
      alert("All fields are required");
      return false;
    }

    if (!/^[a-zA-Z]+$/.test(name)) {
      alert("Please provide valid name");
      return false;
    }

    if (!/^[a-zA-Z]+$/.test(surname)) {
      alert("Please provide valid surname");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please provide valid email with @ and .");
      return false;
    }
    const selectedDate = new Date(date);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      alert("Please provide a date in the future");
      return false;
    }

    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    axios
      .put(`${endpoint}/${id}`, {
        name,
        surname,
        email,
        date,
      })
      .then(() => {
        alert("Client updated successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);

        if (error.response) {
          const statusCode = error.response.status;

          switch (statusCode) {
            case 404:
              alert("Email must contain @");
              break;
            case 405:
              alert("Email must contain .");
              break;
            case 400:
              alert("Please provide valid email");
              break;
            case 406:
              alert("Email must be between 5 and 50 characters long");
              break;
            case 501:
              alert("Name must be between 5 and 100 characters long");
              break;
            case 502:
              alert("Surname must be between 5 and 100 characters long");
              break;
            case 511:
              alert("Date must be in the future");
              break;
            default:
              alert("Error");
          }
        } else {
          alert("Error");
        }
      });
  }

  return (
    <div>
      <form className={styles.mainContainer} onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label>Surname:</label>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <br />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <label>Date:</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
