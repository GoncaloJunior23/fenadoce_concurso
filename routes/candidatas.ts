import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
    try {
      const candidatas = await prisma.candidata.findMany()
      res.status(200).json(candidatas)
    } catch(error) {
      res.status(400).json(error)
    }
})

router.post("/", async (req, res) => {
    const { nome, clube, idade, sonho } = req.body

    if (!nome || !clube || !idade || !sonho) {
        res.status(400).send({ 'erro': 'Informe nome, clube, idade, sonho' })
        return
    }

    try {

      const candidata = await prisma.candidata.create({
        data: { nome, clube, idade, sonho }
    })
    res.status(201).json(candidata)
} catch(error) {
    res.status(400).json(error)
}
})

export default router