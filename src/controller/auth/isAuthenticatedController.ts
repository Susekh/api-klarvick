import asyncHandler from "../../utils/asyncHanlder.js";
import db from "../../utils/db/db.js";
import { Request, Response } from "express";

const isAuthenticatedController = asyncHandler(
    async (req : Request, res : Response) => {

    try {
        const user = await db.user.findFirst({
            where : {
                id : req.body.id
            },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt : true
              },
        });


        // Clear cookies and send response
        return res
            .status(200)
            .json({ status : "success", user : user, successMsg : "User is Authenticated" });

    } catch (error) {
        // Handle any errors
        return res.status(500).json({ status : "failed", errMsgs : { otherErr : "Error occured at checking Authentication."} });
    }
});


export default isAuthenticatedController;