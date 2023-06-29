const db = require("../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")

const { BCRYPT_WORK_FACTOR } = require("../config")

class User {
    
    
    
    static _createPublicUser(user) {
        return {
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName, 
          password: user.password,
        }
      }
    
}


