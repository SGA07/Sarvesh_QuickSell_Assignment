export const groupTicketsByStatus = (tickets) => {
  const groups = tickets.reduce(
    (result, ticket) => {
      if (!result[ticket.status]) {
        result[ticket.status] = [];
      }
      result[ticket.status].push(ticket);
      return result;
    },
    { Backlog: [], Todo: [], "In progress": [], Done: [], Cancelled: [] }
  );

  return groups;
};

export const groupTicketsByPriority = (tickets) => {
  const groups = tickets.reduce(
    (result, ticket) => {
      const priority = getPriorityLabel(ticket.priority);
      if (!result[priority]) {
        result[priority] = [];
      }
      result[priority].push(ticket);
      return result;
    },
    { "No priority": [], Low: [], Medium: [], High: [], Urgent: [] }
  );
  return groups;
};

export const groupTicketsByUserId = (tickets) => {
  const groups = tickets.reduce((result, ticket) => {
    if (!result[ticket.userId]) {
      result[ticket.userId] = [];
    }
    result[ticket.userId].push(ticket);
    return result;
  }, {});

  return groups;
};

const getPriorityLabel = (priority) => {
  switch (priority) {
    case 0:
      return "No priority";
    case 1:
      return "Low";
    case 2:
      return "Medium";
    case 3:
      return "High";
    case 4:
      return "Urgent";
    default:
      return "NA";
  }
};
