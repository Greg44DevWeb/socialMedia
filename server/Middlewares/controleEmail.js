const validator = require ('validator');

module.exports = (req, res, next) => {
    const{email} = req.body;
    if(validator.isEmail(email)){
        console.log('-->validator.isEmail');
        console.log(`format d'email valide ${validator.isEmail(email)}`);
        next()
    }else {
        return res.status(400).json({error : `le format de l'email ${email} n'est pas valide`})
    }
};