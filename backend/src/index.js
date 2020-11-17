const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');
const app = express();

app.use(cors());

app.use(express.json())

const projects = [];

function logRequest(request, response,next){
    const { method, url } = request;

    const logLabel = ` [${method.toUpperCase()}] ${url}`;
    console.log(logLabel);
    next();
    console.timeEnd(logLabel); 
}

function validateProjectId(request, response, next){
    const { id } = request.params;
    if(!isUuid(id)){
        return response.status(400).json({ error: 'Invalid project ID'});
    }
    return next();
}

app.use(logRequest);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
    const { title } = request.query;

    const result = title ? projects.filter(projects => projects.title.includes(title)) : projects;

    return response.json(result);
});

app.post('/projects', (request,response) => {
    const { title, owner } = request.body;
    const project = { id: uuid(), title, owner };
    projects.push(project);
    return response.json(project);
});

app.put('/projects/:id', (request,response) => {
    const { title, owner } = request.body;
    const { id } = request.params;

    const indexProject = projects.findIndex(projects => projects.id === id);
    if(indexProject < 0){
        return response.status(400).json({error: 'Project not found'});
    }
    projects[indexProject] = {id, title, owner};
    return response.json({id, title, owner});
});

app.delete('/projects/:id',(request, response) => {
    const { id } = request.params;

    const indexProject = projects.findIndex(project => project.id === id );
    if( indexProject < 0){
        return response.status(400).json({ error: 'Project not found' });
    }
    projects.splice(indexProject, 1);
    return response.status(204).send()
})

app.listen(3333, () => {
    console.log('🚀 Back-end started!')
});