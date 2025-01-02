import asyncHandler from "../../../utils/asyncHanlder.js";
import db from "../../../utils/db/db.js";

const deleteProjectController = asyncHandler(async (req, res) => {
    const { projectId } = req.body;
    const user = req.user;

    if (!projectId) {
        return res.status(400).json({ err: "Project ID is required." });
    }

    try {
        // Find the project
        const project = await db.project.findUnique({
            where: { id: projectId },
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }

        // Check if the user is the project creator or has the necessary permissions
        if (project.userId !== user.id) {
            return res.status(403).json({
                status: "failed",
                statusCode: 403,
                errMsgs: { otherErr: { isErr: true, msg: "You do not have permission to delete this project." } },
            });
        }

        // Delete the project
        await db.project.delete({
            where: { id: projectId },
        });

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Project deleted successfully.",
            projectId: projectId,
        });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

export default deleteProjectController;
