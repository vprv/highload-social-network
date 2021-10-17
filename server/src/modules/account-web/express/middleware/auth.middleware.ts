import { JWT_SECRET } from "../../../../../constants"

const jwt = require('jsonwebtoken')

module.exports = (req: any, res: any, next: any) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'Authorization failed' })
        }
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()

    } catch (e) {
        res.status(401).json({ message: 'Authorization failed' })
    }
}