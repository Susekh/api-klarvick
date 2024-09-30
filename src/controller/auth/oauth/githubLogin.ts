import axios from "axios";
import asyncHandler from "../../../utils/asyncHanlder.js";
import { CookieOptions, Request, Response } from "express";
import db from "../../../utils/db/db.js";
import { generateAccessAndRefereshTokens } from "../signInController.js";

const githubLogin = asyncHandler(
    async (req : Request , res : Response) => {
        try {
            console.log("Github Body :: ", req.body);
            console.log("github controller working");

            const code = req.body.code;

            const client_Id = process.env.CLIENT_ID_GITHUB;
            const client_secret = process.env.CLIENT_SECRET_GITHUB;
            

            const params = `?client_id=${client_Id}&client_secret=${client_secret}&code=${code}`

            const tokenResponse = await axios.post(
                `https://github.com/login/oauth/access_token${params}`,
                {},
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json', // Ensure GitHub returns JSON
                  },
                }
            )

            console.log("github data ::", tokenResponse.data);

            const tokenData = tokenResponse.data;
            const accessToken = tokenData.access_token;

            if (!accessToken) {
                return res.status(400).json({ error: 'No access token received from GitHub' });
            }
          

            const userResponse = await axios.get('https://api.github.com/user', {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });

              const userData = userResponse.data;

              // Log user data and respond
              console.log('GitHub user data:', userData.email);
              
              const user = await db.user.findFirst({
                where : {
                        email: userData.email,
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    createdAt : true,
                    password : true
                  },
            });

            if(!user) {

            } else {
                const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(res, user);

                const options : CookieOptions = {
                    httpOnly: true,
                    secure : true,
                    sameSite: 'none',
                };

                res.status(201)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json({
                status : "success",
                statusCode : 201,
                user : user,
                successMsg : "Logged in succesfully."
                });
            }
          
            
            
            res.status(200).json({ message : "Successfully Logged In" })
        } catch (error) {
            res.status(500).json({ error : "Internal Server Error" });
        }
    }
)

export default githubLogin;