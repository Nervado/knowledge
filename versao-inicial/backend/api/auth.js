const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        // validar email
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Informe usuário e senha')
        }
        // consulta o banco para verificar o email e a senha
        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()

        // caso usuario nao exista    
        if (!user) return res.status(400).send('Usuário não encontrado')

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!isMatch) return res.status(401).send('Email/senha inválido!')

        // Gerar token de autenticação
        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now,
            exp: now + (60 * 60 * 24 * 3)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    // verificar se o token é válido
    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret)
                if (new Date(token.exp * 1000 > new Date())) {
                    return res.send(true)
                }
            }
        } catch (e) {
            // problema com token
        }

        res.send(false)
    }

    return { signin, validateToken }

}