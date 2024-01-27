import Joi from 'joi';

export const userSignUpSchema = Joi.object({
    username: Joi.string().min(3).max(30).required().pattern(/^\S+$/),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().max(50).required(),
    bio: Joi.string().max(255).default('').allow(''),
    avatarURL: Joi.string().uri().default('').allow(''),
    coverURL: Joi.string().uri().default('').allow(''),
    country: Joi.string().max(50).default('na').allow('na').lowercase(),
    gender: Joi.string().valid('male', 'female', 'transgender').default('na').allow('na').lowercase(),
});

export const userLoginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
});

export const userUpdateSchema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(3).max(30).pattern(/^\S+$/),
    password: Joi.string().required(),
    name: Joi.string().max(50).required(),
    bio: Joi.string().default('').optional().allow(''),
    avatarURL: Joi.string().uri().default('').optional().allow(''),
    coverURL: Joi.string().uri().default('').optional().allow(''),
    country: Joi.string().max(50).default('NA').optional().allow('NA'),
    gender: Joi.string().valid('Male', 'Female', 'Transgender').default('NA').optional().allow('NA'),
});

// * Title & Images[] || Videos[]
const vixetSchema = Joi.object({
    title: Joi.string().required(),
    videoURL: Joi.array().items(Joi.string().uri()).default(null).min(1).max(2),
    imagesURL: Joi.array().items(Joi.string().uri()).default(null).min(1).max(4),
});

// * Title & Description & VideoUrl
const vixdeoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().min(10).max(1024).required(),
    videoURL: Joi.array().items(Joi.string().uri()).default(null).min(1).max(2).required(),
});

// * Image[]
const vixsnapSchema = Joi.object({
    imagesURL: Joi.array().items(Joi.string().uri()).default(null).min(1).max(6).required(),
});

// * Title & Description & ImageUrl
const vixogsSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().min(10).required(),
    imagesURL: Joi.array().items(Joi.string().uri()).default(null).max(1),
});

// * Title & Poll Options Array with {pollName:string, pollSupporters:number}
const vixpollSchema = Joi.object({
    title: Joi.string().required(),
    pollOptions: Joi.array().items(Joi.object({ pollName: Joi.string().required(), pollSupporters: Joi.array().default([]) })).min(2).max(4).required(),
});

// * Title & LiveVideoStreamUrl
const vixliveSchema = Joi.object({
    title: Joi.string().required(),
    videoURL: Joi.array().items(Joi.string().uri()).default(null).min(1).max(2).required(),
});

export const postCreateSchema = Joi.object({
    postType: Joi.string().valid('Vixet', 'Vixdeo', 'Vixsnap', 'Vixogs', 'Vixpoll', 'Vixlive').required(),
    tags: Joi.array().min(1).required(),
    title: Joi.string().default('').allow(''),
    description: Joi.string().min(10).default('').allow(''),
    videoURL: Joi.array().items(Joi.string().uri()).default(null).min(1).max(2).allow(null),
    imagesURL: Joi.array().items(Joi.string().uri()).default(null).min(1).max(4).allow(null),
    pollOptions: Joi.array().min(2).max(4).default(null).allow(null),
}).when('.postType', {
    is: 'Vixet',
    then: vixetSchema,
}).when('.postType', {
    is: 'Vixdeo',
    then: vixdeoSchema,
}).when('.postType', {
    is: 'Vixsnap',
    then: vixsnapSchema,
}).when('.postType', {
    is: 'Vixogs',
    then: vixogsSchema,
}).when('.postType', {
    is: 'Vixpoll',
    then: vixpollSchema,
}).when('.postType', {
    is: 'Vixlive',
    then: vixliveSchema,
})

export const createGroupValidation = Joi.object({
    groupName: Joi.string().min(3).max(25).trim(),
    groupDescription: Joi.string().min(5).max(50).trim(),
    participants: Joi.array().min(2).max(11)
});

export const createMessageValidation = Joi.object({
    text: Joi.string().min(1).max(50).trim(),
    files: Joi.array().max(4),
    chatId: Joi.string().required(),
});

