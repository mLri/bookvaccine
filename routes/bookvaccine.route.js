const router = require('express').Router()

/* validation */
// const { validateSchema, validateSchemaType, handleErrorValidate } = require('../validation')
// const { userSchema } = require('../validation/schema/user.schema')

/* include controllers */
const bookvaccine_controller = require('../controllers/bookvaccine.controller')

router.get('/',
  // validateSchema(userSchema.signin),
  // validateSchemaType(userSchema.signin),
  // handleErrorValidate,
  bookvaccine_controller.bookVaccineList)

router.post('/',
  bookvaccine_controller.createBookVaccine)

module.exports = router