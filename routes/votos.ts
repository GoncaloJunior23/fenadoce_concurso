import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
    try {
        const votos = await prisma.voto.findMany({
           include: {
            candidata: true,
            cliente: true
           }
        })
      res.status(200).json(votos)
    } catch(error) {
        res.status(400).json(error)
    }
})

router.post("/", async (req, res) => {
    const { candidataId, clienteId, justificativa } = req.body

    if ( !candidataId || !clienteId) {
        res.status(400).send({ 'erro': 'Informe candidataId e clienteId' })
        return
    }

    try {

        const [voto, candidata] = await prisma.$transaction([
          prisma.voto.create({data: { candidataId, clienteId, justificativa } }),
          prisma.candidata.update({where: {id: candidataId}, data: {numVotos: { increment: 1} } })         
        ])
        res.status(201).json({voto, candidata})
    }       catch (error) {
        res.status(400).json(error)
    }
})

export default router