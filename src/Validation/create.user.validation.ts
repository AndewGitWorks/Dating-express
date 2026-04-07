import * as z from 'zod'

const regexHandler =  /[^a-zA-Z0-9а-яА-ЯёЁ_ ]/;
export const CreateUser = z.object({
    name: z.string("Name must contain only alphabet symbols").length(0, "Name must be at least 1 symbols").min(1, "Name is required!")
    .regex(regexHandler, "Name must not contain special symbols")
    
})