const errorType = require("../core/errorType")

exports.get404 = (req, res) => {
    res.status(404).json({
        error: errorType.NOT_FOUND,
        message: "Page not found"
    })
}