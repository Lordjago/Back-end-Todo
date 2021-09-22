const task = require('../model/todos')

function pagination() {
    return async (req, res, next) => {
        //collecting page and limit from request query => http://localhost:3000/tasks?page=1&limit=3
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        //where to start displaying from
        const startIndex = (page - 1) * limit;
        //where to stop displaying
        const endIndex = page * limit;

        let results = {}

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        if (endIndex < await task.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        try {
            results.result = await task.find().limit(limit).skip(startIndex).exec();
            // console.log(results);
            res.pagination = results;
            next();
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
        // results.result = model.slice(startIndex, endIndex);

    }
}

module.exports = pagination