const Joi =require('joi');

const signupValidation = Joi.object({
    email: Joi.string().alphanum().required(),
    password: Joi.string().min(4).not('').required(),
    name: Joi.string().min(4).not('').required(),
    phone: Joi.string().min(8).not('').required(),
    address: Joi.string().min(8).not('').required(),
    userType: Joi.string().not('').required(),
    confirm: Joi.equal(Joi.ref('password')).required().message({
        'any.only': " 비비번호가 일치하지 않습니다"
    }),
})
module.exports = {
    signupValidation,
}