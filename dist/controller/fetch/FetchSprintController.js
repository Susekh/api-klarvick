import asyncHandler from "../../utils/asyncHanlder.js";
import db from "../../utils/db/db.js";
const FetchSprintController = asyncHandler(async (req, res) => {
    const { sprintId } = req.body;
    if (!sprintId) {
        return res.status(400).json({
            status: "failed",
            statusCode: 400,
            message: "sprint ID is required.",
        });
    }
    try {
        // Fetch sprint by ID
        const sprint = await db.sprint.findUnique({
            where: {
                id: sprintId
            },
            include: {
                columns: {
                    include: {
                        tasks: true
                    }
                }
            }
        });
        if (!sprint) {
            return res.status(404).json({
                status: "failed",
                statusCode: 404,
                message: "sprint not found.",
            });
        }
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "sprint fetched successfully.",
            sprint: sprint,
        });
    }
    catch (error) {
        console.error("Error fetching sprint:", error);
        res.status(500).json({
            status: "failed",
            statusCode: 500,
            message: "Internal server error.",
            error: error.message,
        });
    }
});
export default FetchSprintController;
//# sourceMappingURL=FetchSprintController.js.map