import express from 'express'
import candidatasRoutes from './routes/candidatas'
import clientesRoutes from './routes/clientes'
import votosRoutes from './routes/votos'

const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json())
app.use("/candidatas", candidatasRoutes)
app.use("/clientes", clientesRoutes)
app.use("/votos", votosRoutes)

app.get('/', (req, res) => {
  res.send('API: Sitema de Controle de Votos Rainha da Fenadoce')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})