const Joi = require('joi');

const signupValidation = Joi.object({
  userName: Joi.string().min(2).not('').required().messages({
    'any.invalid': ' 비밀번호가 일치하지 않습니다',
    'string.min': '최소 2자 이상 입력해 주세요',
  }),
  password: Joi.string()
    .min(4)
    .not('')
    .required()
    .messages({ 'string.min': '최소 4자 이상 입력해 주세요' }),
  confirm: Joi.equal(Joi.ref('password'))
    .required()
    .messages({ 'any.only': ' 비밀번호가 일치하지 않습니다' }),
  email: Joi.string()
    .email()
    .required()
    .messages({ 'string.email': '이메일 형식이 아닙니다.' }),
  phone: Joi.string()
    .min(8)
    .not('')
    .required()
    .messages({ 'string.min': '핸드폰을 최소 8자 이상 입력해 주세요' }),
  address: Joi.string()
    .min(4)
    .not('')
    .required()
    .messages({ 'string.min': '주소를 최소 4자 이상 입력해 주세요' }),
  userType: Joi.number().not('').required(),
});
module.exports = {
  signupValidation,
};
