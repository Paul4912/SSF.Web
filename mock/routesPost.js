module.exports = server => {
    server.post('/users', (req, res) => {
        res.send({
            isSuccess: 'true'
        })
    })
}