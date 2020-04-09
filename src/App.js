import React, {useState, useEffect} from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);
  //handleRemoveRepository eu inclui o handle de remover entre [] porem nao estava passando no teste, por que?

  async function handleAddRepository() {
 
    const response = await api.post('/repositories', {
      url: "https://github.com/reangeline",
      title: "teste",
      techs: ["React", "Node"]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);


  }

  async function handleRemoveRepository(id) {

    document.getElementById(id).remove();
    await api.delete(`/repositories/${id}`);
    
  }

  return (
    <>
      <ul data-testid="repository-list">
      {repositories.map(repositories => <li id={repositories.id} key={repositories.id}>{repositories.title}<button onClick={() => handleRemoveRepository(repositories.id)}>Remover</button></li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
