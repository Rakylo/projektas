import Client from "../models/Client.js";

export async function addNewClients(req, res) {
  const { name, surname, email, date } = req.body;

  if (!name || !surname || !email || !date) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  const currentDate = new Date();
  const selectedDate = new Date(date);

  if (selectedDate < currentDate) {
    return res.status(511).json({ error: "Date must be in the future" });
  }

  if (name.length < 5) {
    return res.status(501).json({
      success: false,
      message: "Name must be at least 5 characters long",
    });
  }
  if (surname.length < 5) {
    return res.status(502).json({
      success: false,
      message: "Surname must be at least 5 characters long",
    });
  }

  if (name.length > 100) {
    return res.status(501).json({
      success: false,
      message: "Name must be less than 100 characters long",
    });
  }
  if (surname.length > 100) {
    return res.status(502).json({
      success: false,
      message: "Surname must be less than 100 characters long",
    });
  }

  if (!email.includes(".")) {
    return res.status(405).json({
      success: false,
      message: "Please provide a valid email",
    });
  }

  if (!email.includes("@")) {
    return res.status(404).json({
      success: false,
      message: "Please provide valid email with @ symbol",
    });
  }
  if (email.length < 5) {
    return res.status(406).json({
      success: false,
      message: "Email must be between 6 and 50 characters",
    });
  }

  if (email.length > 50) {
    return res.status(406).json({
      success: false,
      message: "Email must be between 6 and 50 characters",
    });
  }

  try {
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(420).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const newClient = new Client({
      name,
      surname,
      email,
      date,
    });

    await newClient.save();

    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getAllClients(req, res) {
  try {
    const clients = await Client.find({}, { __v: 0 });

    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getClientById(req, res) {
  const { id } = req.params;

  try {
    const client = await Client.findById(id);

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteClientById(req, res) {
  const { id } = req.params;

  try {
    const deletedClient = await Client.findById(id);

    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
      // return cia reikalingas, kad nevykdytu toliau esancio kodo
    }

    await Client.findByIdAndDelete(id);

    res.status(200).json({ message: "Client deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateClientById(req, res) {
  const { id } = req.params;
  const { name, surname, email, date } = req.body;

  if (!name || !surname || !email || !date) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (name.length < 5) {
    return res.status(501).json({
      success: false,
      message: "Name must be at least 5 characters long",
    });
  }
  if (surname.length < 5) {
    return res.status(502).json({
      success: false,
      message: "Surname must be at least 5 characters long",
    });
  }
  if (date < new Date()) {
    return res.status(511).json({
      success: false,
      message: "Date must be in the future",
    });
  }

  if (name.length > 100) {
    return res.status(501).json({
      success: false,
      message: "Name must be less than 100 characters long",
    });
  }
  if (surname.length > 100) {
    return res.status(502).json({
      success: false,
      message: "Surname must be less than 100 characters long",
    });
  }

  if (!email.includes(".")) {
    return res.status(405).json({
      success: false,
      message: "Please provide a valid email",
    });
  }

  if (!email.includes("@")) {
    return res.status(404).json({
      success: false,
      message: "Please provide valid email with @ symbol",
    });
  }
  if (email.length < 5) {
    return res.status(406).json({
      success: false,
      message: "Email must be between 6 and 50 characters",
    });
  }

  if (email.length > 50) {
    return res.status(406).json({
      success: false,
      message: "Email must be between 6 and 50 characters",
    });
  }

  try {
    const updatedClient = await Client.findByIdAndUpdate(id);

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    updatedClient.name = name;
    updatedClient.surname = surname;
    updatedClient.email = email;
    updatedClient.date = date;

    await updatedClient.save();

    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
