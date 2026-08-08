export function filterTickets(tickets, searchText, statusFilter) {
  const search = (searchText ?? "").trim().toLowerCase();

  return tickets.filter((ticket) => {
    const matchesStatus =
      statusFilter === "ALL" || ticket.status === statusFilter;

    const searchableText = [
      ticket.title,
      ticket.name,
      ticket.assetTag,
      ticket.category,
      ticket.location,
      ticket.description,
      ticket.createdBy,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      search.length === 0 || searchableText.includes(search);

    return matchesStatus && matchesSearch;
  });
}

export function countByStatus(tickets, status) {
  return tickets.filter((ticket) => ticket.status === status).length;
}
