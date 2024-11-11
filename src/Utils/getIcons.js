import { ReactComponent as NoPriority } from "../Assets/No-priority.svg";
import { ReactComponent as HighPriority } from "../Assets/Img - High Priority.svg";
import { ReactComponent as MediumPriority } from "../Assets/Img - Medium Priority.svg";
import { ReactComponent as LowPriority } from "../Assets/Img - Low Priority.svg";
import { ReactComponent as UrgentPriority } from "../Assets/SVG - Urgent Priority grey.svg";
import { ReactComponent as Backlog } from "../Assets/Backlog.svg";
import { ReactComponent as Todo } from "../Assets/To-do.svg";
import { ReactComponent as InProgress } from "../Assets/in-progress.svg";
import { ReactComponent as Done } from "../Assets/Done.svg";
import { ReactComponent as Cancelled } from "../Assets/Cancelled.svg";

export const getPriorityIcon = (priority) => {
  switch (priority) {
    case "No priority":
      return <NoPriority />;
    case "Low":
      return <LowPriority />;
    case "Medium":
      return <MediumPriority />;
    case "High":
      return <HighPriority />;
    case "Urgent":
      return <UrgentPriority />;
    default:
      return <UrgentPriority />;
  }
};

export const getStatusIcon = (priority) => {
  switch (priority) {
    case "Backlog":
      return <Backlog />;
    case "Todo":
      return <Todo />;
    case "In progress":
      return <InProgress />;
    case "Done":
      return <Done />;
    case "Cancelled":
      return <Cancelled />;
    default:
      return <Cancelled />;
  }
};
