const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 32
    },
    isProcurador: {
      type: Boolean,
      default: false
    },
    entrada: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Entrada',
      }
    ],
    saida: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Saida',
    }],
    arquivados: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Arquivados',
    }]

  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  },
);

const salt = 10;

UserSchema.pre('save', async function crypt(next) {
  if (this.isModified('password')) {
    this.password = await this.encryptPassword(this.password);
  }
  return next();
});

UserSchema.pre('updateOne', async function recovery(next) {
  if (this._update.password) {
    this._update.password = await this.schema.methods.encryptPassword(
      this._update.password,
    );
  }
  return next();
});

UserSchema.methods = {
  authenticate(password) {
    return bcrypt.compareSync(password, this.password);
  },
  encryptPassword(password) {
    return bcrypt.hashSync(password, salt);
  },
};

module.exports = mongoose.model('User', UserSchema);