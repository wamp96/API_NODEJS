import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import productsRoutes from './routes/products.routes'

const app = express()


app.set('pkg', pkg);

//Middleware
app.use(express.json())
app.use(morgan('dev'));

//Routes
app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  })
})

get.use(require('/products',productsRoutes));


export default app;

