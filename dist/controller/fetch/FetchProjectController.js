import asyncHandler from "../../utils/asyncHanlder.js";
import db from "../../utils/db/db.js";
const FetchProjectController = asyncHandler(async (req, res) => {
    const { projectId } = req.body;
    if (!projectId) {
        return res.status(400).json({
            status: "failed",
            statusCode: 400,
            message: "Project ID is required.",
        });
    }
    try {
        // Fetch project by ID
        const project = await db.project.findUnique({
            where: { id: projectId },
            include: {
                members: {
                    select: {
                        id: true,
                        role: true,
                        userId: true,
                        projectId: true,
                        taskId: true,
                        createdAt: true,
                        updatedAt: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                email: true,
                                imgUrl: true,
                                dob: true,
                                gender: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                        },
                    },
                },
                sprints: {
                    select: {
                        id: true,
                        name: true,
                        startDate: true,
                        endDate: true,
                        status: true,
                        createdAt: true,
                        updatedAt: true,
                        columns: {
                            select: {
                                id: true,
                                name: true,
                                tasks: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                        },
                    },
                },
            },
        });
        if (!project) {
            return res.status(404).json({
                status: "failed",
                statusCode: 404,
                message: "Project not found.",
            });
        }
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Project fetched successfully.",
            project: project,
        });
    }
    catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({
            status: "failed",
            statusCode: 500,
            message: "Internal server error.",
            error: error.message,
        });
    }
});
export default FetchProjectController;
//# sourceMappingURL=FetchProjectController.js.map