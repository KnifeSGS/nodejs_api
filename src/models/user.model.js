const mongoose = require('mongoose')
const idValidator = require('mongoose-id-validator')

const UserSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: false
  },
  last_name: String,
  full_name: String,
  email: {
    type: String,
    required: true
  },
  password: String,
  role: Number,
  token: String,
  active: Boolean,
  journals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Journal'
    }
  ],
  shifts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shift'
    }
  ]
}, {
  timestamps: true
})

UserSchema.plugin(idValidator)

module.exports = mongoose.model('User', UserSchema)