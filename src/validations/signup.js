import z from 'zod'
const signupSchema = z.object({
    email: z.string()
        .email({ message: 'Please enter a valid email' }),

    password: z.string()
        .min(8, { message: 'Password must contain at least 8 characters' }),

    confirmPassword: z.string()
        .min(8, { message: 'Password must contain at least 8 characters' }),

    userName: z.string()
        .min(4, { message: 'Please enter at least 4 characters' })
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
});
export default signupSchema ;