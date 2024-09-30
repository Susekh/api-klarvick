import { z } from "zod";
import sanitizeHtml from 'sanitize-html';
const sanitize = (value) => {
    return sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {},
    });
};
const userSchema = z.object({
    username: z.string({ message: "username is required" }).min(3, { message: 'Username must be at least 3 characters.' }).transform(sanitize),
    password: z.string().min(5, { message: 'Password must be at least 5 characters.' }),
});
export default userSchema;
//# sourceMappingURL=signInSchema.js.map