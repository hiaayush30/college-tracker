import { z } from "zod";
export const RegisterSchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string()
});
export const LoginSchema = z.object({
    username: z.string(),
    password: z.string()
});
//# sourceMappingURL=user.schema.js.map