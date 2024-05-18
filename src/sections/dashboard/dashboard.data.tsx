export const columns = [
  {
    accessorFn: (row: any) => row.name,
    id: "Username",
    cell: (info: any) => info.getValue(),
    header: () => <span>Name</span>,
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row.email,
    id: "email",
    cell: (info: any) => info.getValue(),
    header: () => <span>Email Address</span>,
    isSortable: false,
  },
];
