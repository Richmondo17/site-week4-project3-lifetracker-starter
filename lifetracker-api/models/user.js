const db = require("../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")

const { BCRYPT_WORK_FACTOR } = require("../config")

class User {
    
  /* 
  This code snippet defines a static method _createPublicUser 
  that takes in a user object as input. 
  It creates and returns a new object with properties email, username, firstName, lastName, 
  and password, which are assigned the corresponding values from the user object.
  */
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


