import "./App.css";
import styles from "./App.css";
import { Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm.jsx";
import ClientList from "./components/ClientList/ClientList.jsx";
import EditClient from "./components/EditClient/EditClient.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <div className={styles.main}>
      <Header />
      <Routes>
        <Route path="/" element={<ClientList />} />
        <Route path="/update/:id" element={<EditClient />} />
        <Route path="/post" element={<RegistrationForm />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
