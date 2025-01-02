import { MemberRole } from "@prisma/client";
import asyncHandler from "../../../../../utils/asyncHanlder.js";
import db from "../../../../../utils/db/db.js";
const deleteTaskController = asyncHandler(async (req, res) => {
    const { taskId } = req.body;
    const user = req.user;
    try {
        const task = await db.task.findUnique({
            where: { id: taskId },
        });
        if (!task) {
            return res.status(404).json({
                status: "failed",
                statusCode: 404,
                errMsgs: { otherErr: { isErr: true, msg: "Task not found." } },
            });
        }
        const member = await db.member.findFirst({
            where: {
                userId: user.id,
                projectId: task.projectId
            },
            include: {
                project: true,
            },
        });
        if (!member || !(member.role === MemberRole.ADMIN || member.role === MemberRole.MODERATOR)) {
            return res.status(403).json({
                status: "failed",
                statusCode: 403,
                errMsgs: { otherErr: { isErr: true, msg: "You do not have permission to delete tasks." } },
            });
        }
        await db.task.delete({
            where: { id: taskId },
        });
        const column = await db.column.findUnique({
            where: {
                id: task.columnId,
            },
            include: {
                sprint: true,
            },
        });
        const sprint = await db.sprint.findUnique({
            where: {
                id: column.sprintId,
            },
            include: {
                columns: {
                    include: {
                        tasks: true
                    }
                }
            }
        });
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Task deleted successfully.",
            columns: sprint.columns,
        });
    }
    catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({
            status: "failed",
            statusCode: 500,
            errMsgs: { otherErr: { isErr: true, msg: `Server Error: ${error.message}` } },
        });
    }
});
export default deleteTaskController;
//# sourceMappingURL=deleteTaskController.js.map