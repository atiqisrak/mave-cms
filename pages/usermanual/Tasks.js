import React, { useEffect, useState } from "react";
import clickup from "./clickup.json";
import { Checkbox } from "antd";

const Tasks = () => {
    const [taskData, setTaskData] = useState(clickup);
    useEffect(() => {
        setTaskData(clickup);
    }, []);

    return (
        <div>
            <h1>
                Clickup Tasks
            </h1>
            {
                console.log("Task Data:", taskData[0]?.subtasks)
            }
            {
                taskData[0]?.subtasks?.map((task, index) => {
                    return (
                        <div>
                            <ul>
                                {/* {
                                    task?.status?.status === "complete" ?
                                        (
                                            <Checkbox key={index} checked>
                                                {task?.name}
                                            </Checkbox>
                                        ) : (
                                            <Checkbox
                                                disabled
                                                key={index}>
                                                {task?.name}
                                            </Checkbox>
                                        )
                                } */}
                                {/* {
                                    if(task?.status?.status === "complete" ||
                                    task?.status?.status === "in progress" ||
                                    task?.status?.status === "in review (internal)")
                                    {
                                    <li key={index} style={{
                                        // if task?.name starts with DevOps, color is red, else color is green
                                        color: task?.name?.startsWith("DevOps") ? "var(--themes)" : "var(--theme)",
                                    }}>
                                        {task?.name}
                                    </li>
                                }
                                } */}
                                {
                                    task?.status?.status === "complete" ||
                                        task?.status?.status === "in progress" ||
                                        task?.status?.status === "in review (internal)" ?
                                        (
                                            <li key={index} style={{
                                                // if task?.name starts with DevOps, color is red, else color is green
                                                color: task?.name?.startsWith("DevOps") ? "var(--themes)" : "var(--theme)",
                                            }}>
                                                {task?.name}
                                            </li>
                                        ) : (
                                            ""
                                        )
                                }
                            </ul>
                        </div>
                    )
                }
                )
            }
        </div>
    );
}

export default Tasks;