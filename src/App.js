import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await api.get("repositories");
      setRepositories(response.data);
    };
    getData();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "Desafio ReactJS",
      url: "http://github.com",
      techs: ["Node.js"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if (response.status === 204)
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title, likes }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
