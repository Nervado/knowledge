// criptografar senha do usuário 
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    // destructuring
    const { existOrError, notExistsOrError, equalsOrError } = app.api.validation

    // encypt password
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    // salvar ou alterar usuário
    const save = async (req, res) => {
        const user = { ...req.body }
        if (req.params.id) user.id = req.params.id

        // Apenas adms podem cadastrar administradores 
        if (!req.originalUrl.startsWith('/users')) user.admin = false
        if (!req.user || !req.user.admin) user.admin = false

        try {
            existOrError(user.name, 'Nome não informado')
            existOrError(user.email, 'E-mail não informado')
            existOrError(user.password, 'Senha não informada')
            existOrError(user.confirmPassword, 'Confirmação de senha inválida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não são iguais')

            const userFromDB = await app.db('users')
                .where({ email: user.email }).first()

            if (!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }

        } catch (msg) {
            return res.status(400).send(msg) //400 - erro do lado do servidor
        }

        user.password = encryptPassword(user.password)

        delete user.confirmPassword

        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500))
        }
    }

    // metodo get
    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }


    // desafio get by id    
    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id }) // pode ser verificado o id
            .whereNull('deletedAt')
            .first() //apenas um usuário
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const articles = await app.db('articles')
                .where({ userId: req.params.id })
            notExistsOrError(articles, 'Usuario possui artigos.')

            const rowsUpdate = await app.db('users')
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id })
            existOrError(rowsUpdate, 'Usuario nao foi encontrado.')

            res.status(204).send()
        } catch (e) {
            res.status(400).send(e)
        }
    }
    return { save, get, getById, remove }
}