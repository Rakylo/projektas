import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validEmail, validName, validSurname } from "../../Regex/Regex.jsx";
import styles from "./RegistrationForm.module.css";

const endpoint = "http://localhost:3001/post";

export default function RegistrationForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  async function registerClient(e) {
    e.preventDefault();

    if (!name || !surname || !email || !date) {
      return alert("All fields are required");
    }
    const validate = () => {
      if (!validEmail.test(email)) {
        console.log(validEmail.test(email));
        return alert("Please provide valid email with @ and .");
      }
      if (!validName.test(name)) {
        console.log(validName.test(name));
        return alert("Please provide valid name");
      }

      if (!validSurname.test(surname)) {
        console.log(validSurname.test(surname));
        return alert("Please provide valid surname");
      }
      const selectedDate = new Date(date);
      const currentDate = new Date();

      if (selectedDate < currentDate) {
        alert("Please provide a date in the future");
        return false;
      }

      return true;
    };

    if (!validate()) {
      return;
    } else {
      try {
        const { data } = await axios.post(endpoint, {
          name: name,
          surname: surname,
          email: email,
          date: date,
        });
        setName("");
        setSurname("");
        setEmail("");
        setDate("");
        alert("Client registered successfully!");
        navigate("/");
      } catch (error) {
        console.log(error);
        if (error.message === "Request failed with status code 401") {
          return alert("User with this email already exists");
        }
        if (error.message === "Request failed with status code 404") {
          return alert("Email must contain @ ");
        }
        if (error.message === "Request failed with status code 405") {
          return alert("Email must contain . ");
        }
        if (error.message === "Request failed with status code 400") {
          return alert("Please provide  valid email");
        }
        if (error.message === "Request failed with status code 406") {
          return alert("Email must be between 5 and 50 characters long");
        }
        if (error.message === "Request failed with status code 501") {
          return alert("Name must be between 5 and 100 characters long");
        }
        if (error.message === "Request failed with status code 502") {
          return alert("Surname must be between 5 and 100 characters long");
        }
        if (error.message === "Request failed with status code 420") {
          return alert("Email must be unique");
        }
        if (error.message === "Request failed with status code 511") {
          return alert("Date must be in the future");
        }
      }
    }
  }

  return (
    <form className={styles.mainContainer} onSubmit={registerClient}>
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
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <br />
      <button type="submit">Register</button>
    </form>
  );
}
