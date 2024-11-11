import React, { useCallback, useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import DashBoard from "./Components/DashBoard/DashBoard";
import {
  groupTicketsByPriority,
  groupTicketsByStatus,
  groupTicketsByUserId,
} from "./Utils/grouping";
import Loader from "./Components/Loader/Loader";
import "./App.css";
import { fetchAllData } from "./Api_data/Api_data";

const mapUsers = (users) => {
  let group = users.reduce((accumulator, user) => {
    accumulator[user.id] = user;
    return accumulator;
  }, {});

  return group;
};

const orderByPriority = (tickets) =>
  tickets.sort((a, b) => (a.priority > b.priority ? -1 : 1));
const orderByTitle = (tickets) =>
  tickets.sort((a, b) => (a.title < b.title ? -1 : 1));

const loadDashBoard = (tickets, grouping, ordering) => {
  let orderedTickets;
  if (ordering === "priority") orderedTickets = orderByPriority(tickets);
  else orderedTickets = orderByTitle(tickets);

  if (grouping === "status") return groupTicketsByStatus(orderedTickets);
  else if (grouping === "priority")
    return groupTicketsByPriority(orderedTickets);
  else return groupTicketsByUserId(orderedTickets);
};

function App() {
  const [tickets, setTickets] = useState([]);
  const [userData, setUserData] = useState({});
  const [DashBoardData, setDashBoardData] = useState({});
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("priority");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
    const loadTickets = async () => {
      try {
        const res = await fetchAllData(); //calling asynchronous function fetchAllData which handles fetching results from API
        setTickets(res.data.tickets);
        setUserData(mapUsers(res.data.users)); //updating states of tickets and mapping the users according to their ids
      } catch (error) {
        console.error("Error in fetching data", error);
      }
    };

    loadTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //handles displaying data on dashboard whenever there is change in parameters of grouping, orderering or if new data is fetched by api
    if (!tickets.length) return;
    setDashBoardData(loadDashBoard(tickets, grouping, ordering));
    setLoading(false);
  }, [grouping, ordering, tickets]);

  const onSetGrouping = useCallback((value) => {
    //updates state value of grouping parameter to be used
    setLoading(true);
    setGrouping(value);
    saveSettings({ grouping: value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSetOrdering = useCallback((value) => {
    //updates state value of ordering parameter to be used
    setLoading(true);
    setLoading(true);
    setOrdering(value);
    saveSettings({ ordering: value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveSettings = useCallback((data) => {
    for (let key in data) localStorage.setItem(key, data[key]); //saves the last used settings of display in local storage so that user is able to view result of his last used settings
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadSettings = useCallback(() => {
    setGrouping(localStorage.getItem("grouping") || "status"); // extracts those last used parameters/settings from local storage
    setOrdering(localStorage.getItem("ordering") || "priority");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Header
        grouping={grouping}
        setGrouping={onSetGrouping}
        ordering={ordering}
        setOrdering={onSetOrdering}
      />
      {loading ? (
        <Loader />
      ) : (
        <DashBoard
          DashBoardData={DashBoardData}
          grouping={grouping}
          userIdToData={userData}
        />
      )}
    </div>
  );
}

export default App;
