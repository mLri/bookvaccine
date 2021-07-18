/* include models */
const BookVaccine = require('../models/bookvaccine.model')

/* include helpers */
const { handleError } = require('../helpers/handle_error.helper')
const statusError = require('../helpers/status_error.helper')

module.exports.bookVaccineList = async (req, res) => {
  try {
    const { start_date, end_date } = req.query

    const find_book_vaccine = await BookVaccine.aggregate([
      {
        $match: {
          $and: [
            { date_time: { $gte: new Date(start_date) } },
            { date_time: { $lte: new Date(end_date) } }
          ]
        }
      },
      {
        $group: {
          _id: '$date_time',
          count: { $sum: 1 }
        }
      }
    ])

    res.json(find_book_vaccine)
  } catch (error) {
    handleError(error, res)
  }
}

module.exports.createBookVaccine = async (req, res) => {
  try {
    const { prefix, firstname, lastname, employee_id, institution, tel, date_time } = req.body

    const count_book_vaccine = await BookVaccine.countDocuments({ date_time: new Date(date_time) })
    if (count_book_vaccine >= 6) throw statusError.bad_request_with_message('can not bookking limit.')

    const dup_data = await BookVaccine.findOne({ employee_id, date_time: new Date(date_time) })
    if (dup_data) throw statusError.bad_request_with_message('duplicate data!')

    const create_data = {
      prefix,
      firstname,
      lastname,
      employee_id,
      institution,
      tel,
      date_time : new Date(date_time)
    }

    const create_book_vaccine = await BookVaccine.create(create_data)

    res.json(create_book_vaccine)
  } catch (error) {
    handleError(error, res)
  }
}