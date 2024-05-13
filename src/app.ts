import express from 'express';

const app = express();


// Routes 
// Http Methods : Get, POST, PUT, DELETE, PATCH
app.get('/', (req, res, next) => {
    res.json({message: 'Welcome to Elibrary!'});
})

export default app