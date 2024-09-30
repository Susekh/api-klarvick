import userSchema from "../zodSchema/signUpSchema.js";
import { z } from "zod";
function singUpValidation(req, res, next) {
    try {
        const validatedData = userSchema.parse(req.body);
        req.body = validatedData;
        console.log("validated data :: ", validatedData);
        next();
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            console.log("SignUpValidation Error :: ", error);
            const errors = error.errors.map((err) => ({
                field: err.path.join('.'),
                isErr: true,
                msg: err.message,
            }));
            return res.status(400).json({
                status: "failed",
                statusCode: 400,
                errMsgs: { formErr: [...errors] },
            });
        }
        return res.status(500).json({
            status: "failed",
            statusCode: 500,
            errMsgs: { otherErr: 'Internal Server Error' },
        });
    }
}
export default singUpValidation;
//# sourceMappingURL=signUpValidation.js.map