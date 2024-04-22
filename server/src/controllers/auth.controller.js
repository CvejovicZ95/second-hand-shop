import bcrypt from 'bcrypt'
import { User } from '../models/usersSchema.js'
import { generateTokenAndSetCookie } from '../utils/generateToken.js'
import { logger } from '../../logger.js'

export const register = async (req, res) => {
  try {
    const { firstLastName, username, password, confirmPassword, email, phoneNumber } = req.body

    logger.info('Received registration request:', req.body)

    if (password !== confirmPassword) {
      logger.error('Password do not match')
      return res.status(400).json({ error: 'Password do not match' })
    }
    const user = await User.findOne({ username })
    const mail = await User.findOne({ email })
    const phone = await User.findOne({ phoneNumber })

    if (user) {
      logger.error('Username is already in use')
      return res.status(400).json({ error: 'Username is already in use' })
    }

    if (mail) {
      logger.error('Email is already in use')
      return res.status(400).json({ error: 'Email is already in use' })
    }

    if (phone) {
      logger.error('Phone number is already in use')
      return res.status(400).json({ error: 'Phone number is already in use' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      firstLastName,
      username,
      password: hashedPassword,
      email,
      phoneNumber
    })

    if (newUser) {
      const token = generateTokenAndSetCookie(newUser._id, res)
      await newUser.save()

      logger.info('User registered successfully:', newUser.username)

      res.status(201).json({
        token,
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber
      })
    } else {
      logger.error('Invalid user data')
      res.status(400).json({ error: 'Invalid user data' })
    }
  } catch (error) {
    logger.error('Error in register controller:', error.message)
    res.status(500).json({ error: 'Server error' })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    const isPasswordCorrect = await bcrypt.compare(password, user.password || '')

    if (!user || !isPasswordCorrect) {
      logger.error('Invalid username or password')
      return res.status(400).json({ error: 'Invalid username or password' })
    }

    const token = generateTokenAndSetCookie(user._id, res)

    logger.info('User logged in successfully:', user.username)
    res.status(200).json({
      token,
      _id: user._id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber
    })
  } catch (error) {
    logger.error('Error in login controller:', error.message)
    res.status(500).json({ error: 'Server error' })
  }
}

export const logout = async (req, res) => {
  try {
    res.cookie('token', '', { maxAge: 0 })
    logger.info('User logged out successfully')
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    logger.error('Error in logout controller:', error.message)
    res.status(500).json({ error: 'Server error' })
  }
}
