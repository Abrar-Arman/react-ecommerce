import z from "zod";
const signinSchema = z.object({
  email: z.string().email({ message: "Please Enter valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters" }),
});
export default signinSchema;
