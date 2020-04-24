const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];



app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});


app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs} = request.body;
  const repository = {
    id: uuid(), title, url, techs, likes: 0
      // id: uuid(), likes: 0, techs, title, url
  };
  repositories.push(repository);

  return response.json(repository);  
});



app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const data = request.body;

  if (data.likes) {
    return response.json({likes: 0});
  };

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
      return response.status(400).json({error: 'Repository not found!'});
  };

  const likes = {likes: repositories[repositoryIndex].likes};

  const repository = {
      id,
      title,
      url,
      techs,
      likes
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
      return response.status(400).json({error: 'Repository not found!'});
  };

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();

});





app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
      return response.status(400).json({error: 'Repository not found!'});
  };

  const repository = repositories[repositoryIndex];

  repository.likes = repository.likes + 1;

  repositories[repositoryIndex] = repository;    

  return response.json(repository);

});

module.exports = app;
