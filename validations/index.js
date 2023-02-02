const Joi =require('joi');

const signupValidation = Joi.object({
    email: Joi.string().alphanum().required(),
    password: Joi.string().min(4).not('').required(),
    userName: Joi.string().min(4).not('').required().messages({ 'any.only': '이름이 비어있습니다.'}),
    phone: Joi.string().min(8).not('').required(),
    address: Joi.string().min(8).not('').required(),
    userType: Joi.number().not('').required(),
    confirm: Joi.equal(Joi.ref('password')).required().messages({
        'any.only': " 비비번호가 일치하지 않습니다"
    }),
})
module.exports = {
    signupValidation,
}