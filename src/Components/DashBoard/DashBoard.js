import React, { useMemo } from "react";
import "./DashBoard.css";
import Column from "../Column/Column";

function DashBoard({ DashBoardData, grouping, userIdToData }) {
  const keys = useMemo(() => Object.keys(DashBoardData), [DashBoardData]);
  return (
    <div className="dashboard">
      {keys.map((k) => (
        <Column
          key={k}
          tickets={DashBoardData[k]}
          grouping={grouping}
          groupBy={k}
          userIdToData={userIdToData}
        />
      ))}
    </div>
  );
}

export default DashBoard;
