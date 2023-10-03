import Joi from 'joi';

const gamesValidations=Joi.object({
    gamename:Joi.string().required().messages({
        'string.empty':'Game Name Is Required',
        'any.required':'Game Name Is Required'
    }),
    gametype:Joi.string().required().messages({
        'string.empty':'Game Type Is Required',
        'any.required':'Game Type Is Required'
    }),
    time:Joi.string().required().messages({
        'string.empty':'Time Is Required',
        'any.required':'Time Is Required'
    }),
    result:Joi.string().required().messages({
        'string.empty':'Result Is Required',
        'any.required':'Result Is Required'
    }),
    
})

export default gamesValidations;