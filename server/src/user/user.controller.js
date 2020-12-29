import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { generateToken } from "../middleware/jwt"

const prisma = new PrismaClient()

const registerController = async (req, res) => {
  try {
    const { fullname, username, password } = req.body
    const isUsernameExist = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (isUsernameExist) {
      return res.status(400).json({
        error: {
          message: "Username already taken.",
        },
      })
    }

    const saltRounds = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = await prisma.user.create({
      data: {
        fullname,
        username,
        password: hashedPassword,
      },
    })

    res.status(201).json({
      data: {
        id: user.id,
        fullname,
        username,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    res.status(400).json({
      error,
    })
  }
}

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      return res.status(400).json({
        error: {
          message: "no user exists.",
        },
      })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        error: {
          message: "invalid user password.",
        },
      })
    }

    const token = generateToken(user)

    res.json({
      data: {
        fullname: user.fullname,
        token,
      },
    })
  } catch (error) {
    res.status(400).json({
      error,
    })
  }
}

export { registerController, loginController }
