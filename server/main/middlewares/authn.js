const {verifyToken} = require('../helpers/jwt')

const {User} = require('../models')

async function authn(req, res, next){
  let {access_token} = req.headers

  try {
    if (!access_token) {
      // res.status(401).json({"message": "Invalid token"})
      // return
      throw{
        code: 401,
        name: 'JsonWebTokenError',
        message: "Invalid token"

      }
    }

    let payload = verifyToken(access_token)
    let {id, email} = payload

    let targetUser = await User.findByPk(id)

    if (!targetUser){
      throw{
        code: 401,
        name: 'JsonWebTokenError',
        message: "Invalid token"

      }
    }

    req.loggedUser = {
      id: targetUser.id,
      email: targetUser.email
    }

    next()

  } catch(error){
    // if (error.name === 'JsonWebTokenError'){
    //   res.status(401).json({"message": "Invalid token"})
    // } else{
    //   res.status(500).json({"message": "Internal server error"})

    // }

    next(error)
  }
}

module.exports = authn