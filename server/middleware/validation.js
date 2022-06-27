const Validator = require('validatorjs');
const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

const signup = (req, res, next) => {
    const validationRule = {
        "firstName": "required|string",
        "lastName": "required|string",
        "email": "required|email",
        "password": "required|string|min:6",
        "gender": "string"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const logIn = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "password": "required|string|min:6"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed, please, verify your email and password',
                    data: err
                });
        } else {
            next();
        }
    });
}

const comment = (req, res, next) => {
    const validationRule = {
        "comment": "required|string|max:180"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const category = (req, res, next) => {
    const validationRule = {
        "categoryName": "required|string|max:12"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).json({
                    success: false,
                    message: 'Length of categoryName exceeded. Fill in an appropriate categoryName',
                    data: err
                });
        } else {
            next();
        }
    });
}

const article = (req, res, next) => {
    const validationRule = {
        "title": "required|string|max:50",
        "article": "required|string|max:2500"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const flagArticle = (req, res, next) => {
    const validationRule = {
        "flagged": "required|boolean"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}


module.exports = { 
  signup,
  logIn,
  comment,
  category,
  article,
  flagArticle
}