import Joi from 'joi';

export const userSignUpSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().max(50).required(),
    bio: Joi.string().max(255).default('').allow(''),
    avatarURL: Joi.string().uri().default('').allow(''),
    coverURL: Joi.string().uri().default('').allow(''),
    country: Joi.string().max(50).default('NA').allow('NA'),
    gender: Joi.string().valid('male', 'female', 'transgender').default('NA').allow('NA'),
});

export const userLoginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
});

export const userUpdateSchema = Joi.object({
    username: Joi.string().min(3).max(30),
    password: Joi.string(),
    bio: Joi.string().max(255),
    avatarURL: Joi.string().uri(),
    coverURL: Joi.string().uri(),
    name: Joi.string().max(50),
    country: Joi.string().max(50),
    gender: Joi.string().valid('Male', 'Female', 'Transgender'),
    email: Joi.string().email(),
});

// * Title & Images[] || Videos[]
const vixetSchema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    videoURL: Joi.array().items(Joi.string().uri()).default(null).min(1).max(2),
    imagesURL: Joi.array().items(Joi.string().uri()).default(null).min(1).max(4),
});

// * Title & Description & VideoUrl
const vixdeoSchema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(10).max(1024).required(),
    videoURL: Joi.array().items(Joi.string().uri()).default(null).min(1).max(2).required(),
});

// * Image[]
const vixsnapSchema = Joi.object({
    imagesURL: Joi.array().items(Joi.string().uri()).default(null).min(1).max(6).required(),
});

// * Title & Description & ImageUrl
const vixogsSchema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(10).max(1024).required(),
    imagesURL: Joi.array().items(Joi.string().uri()).default(null).max(1),
});

// * Title & Poll Options Array with {pollName:string, pollCount:number}
const vixpollSchema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    pollOptions: Joi.array().items(Joi.object({ pollName: Joi.string().required(), pollCount: Joi.number().default(0) })).min(2).max(4).required(),
});

// * Title & LiveVideoStreamUrl
const vixliveSchema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    videoURL: Joi.array().items(Joi.string().uri()).default(null).min(1).max(2).required(),
});

export const postCreateSchema = Joi.object({
    postType: Joi.string().valid('Vixet', 'Vixdeo', 'Vixsnap', 'Vixogs', 'Vixpoll', 'Vixlive').required(),
    tags: Joi.array().min(1).required(),
    title: Joi.string().min(5).max(255),
    description: Joi.string().min(10).max(1024),
    videoURL: Joi.array().items(Joi.string().uri()).default(null).min(1).max(2),
    imagesURL: Joi.array().items(Joi.string().uri()).default(null).min(1).max(4),
    pollOptions: Joi.array().min(2).max(4),
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