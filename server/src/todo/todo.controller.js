import { PrismaClient } from "@prisma/client"
import { customAlphabet } from "nanoid"

const prisma = new PrismaClient()
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const nanoid = customAlphabet(alphabet, 10)

const listsTodoController = async (req, res) => {
  try {
    const { id } = req.user
    const todos = await prisma.todo.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    res.json({
      data: {
        todos,
      },
    })
  } catch (error) {
    res.status(500).json({
      error,
    })
  }
}

const createTodoController = async (req, res) => {
  try {
    const { id: userId } = req.user
    const { todo: newTodo } = req.body
    const todo = await prisma.todo.create({
      data: {
        id: nanoid(),
        todo: newTodo,
        User: {
          connect: {
            id: userId,
          },
        },
      },
    })

    res.status(201).json({
      data: {
        todo,
      },
    })
  } catch (error) {
    res.status(400).json({
      error,
    })
  }
}

const getTodoController = async (req, res) => {
  try {
    const { id } = req.params
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    })

    if (todo === null) {
      return res.status(404).json({
        error: {
          message: "no todo found.",
        },
      })
    }

    res.json({
      data: {
        todo,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error,
    })
  }
}

const updateTodoController = async (req, res) => {
  try {
    const { id } = req.params
    const oldTodo = await prisma.todo.findUnique({
      where: {
        id,
      },
    })

    if (oldTodo === null) {
      return res.status(404).json({
        error: {
          message: "no todo found.",
        },
      })
    }

    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        isdone: !oldTodo.isdone,
      },
    })

    res.json({
      data: {
        todo,
      },
    })
  } catch (error) {
    res.status(500).json({
      error,
    })
  }
}

const deleteTodoController = async (req, res) => {
  try {
    let todo
    const { id } = req.params
    todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    })

    if (todo === null) {
      return res.status(404).json({
        error: {
          message: "no todo found.",
        },
      })
    }

    todo = await prisma.todo.delete({
      where: {
        id,
      },
    })

    res.json({
      data: {
        message: "todo deleted.",
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error,
    })
  }
}

export {
  listsTodoController,
  createTodoController,
  getTodoController,
  updateTodoController,
  deleteTodoController,
}
