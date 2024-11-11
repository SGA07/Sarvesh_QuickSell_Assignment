import React, { useMemo } from "react";
import Card from "../Card/Card";
import "./column.css";
import { getPriorityIcon, getStatusIcon } from "../../Utils/getIcons";
import UserIcon from "../UserIcon/UserIcon";
import { ReactComponent as Add } from "../../Assets/add.svg";
import { ReactComponent as ThreeDotMenu } from "../../Assets/3 dot menu.svg";

function Column({ tickets, grouping, groupBy, userIdToData }) {
  const title = useMemo(() => {
    if (grouping === "status") return groupBy;
    if (grouping === "priority") return groupBy;
    if (grouping === "user") return userIdToData[groupBy]?.name;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grouping, groupBy]);

  const icon = useMemo(() => {
    if (grouping === "status") return getStatusIcon(groupBy);
    if (grouping === "priority") return getPriorityIcon(groupBy);
    if (grouping === "user")
      return (
        <UserIcon
          name={userIdToData[groupBy]?.name}
          available={userIdToData[groupBy]?.available}
        />
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grouping, groupBy]);

  return (
    <div className="column">
      <div className="column-header">
        <div className="column-header-left-container">
          {icon}
          <div className="column-title">
            {title}
            <span className="count">{tickets.length}</span>
          </div>
        </div>
        <div className="column-header-right-container">
          <Add />
          <ThreeDotMenu />
        </div>
      </div>
      <div className="cards-container">
        {tickets.map((ticket) => (
          <Card
            key={ticket.id}
            ticket={ticket}
            userData={userIdToData[ticket.userId]}
            hideStatusIcon={grouping === "status"}
            hideProfileIcon={grouping === "user"}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
