import jwt from "jsonwebtoken"

const { TOKEN_SECRET, TOKEN_LIFE } = process.env

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    TOKEN_SECRET,
    {
      expiresIn: TOKEN_LIFE,
    }
  )
}

const verifyToken = async (req, res, next) => {
  try {
    if (req.header("Authorization")) {
      const [, token] = req.header("Authorization").split(" ")

      if (typeof token !== "undefined") {
        jwt.verify(token, TOKEN_SECRET)
        const userInfo = jwt.decode(token)
        req.user = userInfo
        next()
      }
    } else {
      return res.status(401).json({
        error: {
          message: "invalid token.",
        },
      })
    }
  } catch (error) {
    res.status(400).json({
      error,
    })
  }
}

export { generateToken, verifyToken }
