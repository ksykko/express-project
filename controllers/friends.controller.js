const model = require('../models/friends.model')

function postFriend(req, res) {
    if (!req.body.name) {
        return res.status(400).json({
            error: 'Missing friend name'
        })
    }

    const newFriend = {
        name: req.body.name,
        id: model.length
    }
    model.push(newFriend)
    res.json(newFriend)
}

function getFriends(req, res) {
    res.json(model)
}

function getFriend(req, res) { // GET /friends/0 => { id: 0, name: 'Albert Einstein' }
    const friendId = Number(req.params.friendId) // or +req.params.friendId
    const friend = model[friendId] // if friendId is 0, then friend is friends[0] which is { id: 0, name: 'Albert Einstein' }

    if (friend) {
        res.status(200).json(friend)
    } else {
        res.status(404).json({
            error: 'Friend does not exist'
        })
    }

}

module.exports = {
    postFriend,
    getFriends,
    getFriend
}