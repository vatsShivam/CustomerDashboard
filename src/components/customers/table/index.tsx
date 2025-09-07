import { useState } from "react";
import { SORT_ORDERS } from "../../../core/constants";
import { useCustomerList } from "../../../hooks/useCustomerList";
import { CustomerListHeader } from "./CustomerListHeader";
import { TableFooter } from "./TableFooter";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { CustomerTableCell } from "./CustomerTableCell";
import type { Customer } from "../../../domain/customer";

 export  function CustomerTable() {
  const [pageNumber, setPageNumber] = useState(1);
  const [sortOrder, setSortOrder] = useState<string>(SORT_ORDERS.DESC);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const {
    columnHeaders,
    customerList,
    totalPerPage,
    totalCustomer,
    isError,
    isLoading,
  } = useCustomerList(pageNumber, sortOrder, searchTerm);

  return (
    <div className="p-4 shadow-lg rounded-lg my-10 bg-white">
      <CustomerListHeader
        sortOrder={sortOrder}
        onSortOrderChange={(newSortOrder) => setSortOrder(newSortOrder)}
        searchTerm={searchTerm}
        onSearchTermChange={(searchText) => {
          setSearchTerm(searchText);
          setPageNumber(1);
        }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="customer table">
          <TableHead>
            <TableRow>
              {columnHeaders.map((header) => (
                <TableCell key={header.key}>{header.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columnHeaders.length} align="center" sx={{ py: 4 }}>
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={columnHeaders.length} align="center" sx={{ py: 4 }}>
                  <Alert severity="error">Failed to load customers. Please try again.</Alert>
                </TableCell>
              </TableRow>
            ) : customerList.length > 0 ? (
              customerList.map((customer) => (
                <TableRow key={customer.email}>
                  {columnHeaders.map((header) => (
                    <CustomerTableCell
                      key={header.key}
                      item={customer}
                      columnKey={header.key as keyof Customer}
                    />
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnHeaders.length}
                  align="center"
                  sx={{ py: 4, color: "text.secondary", fontStyle: "italic" }}
                >
                  No customers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Show pagination only if data exists */}
      {customerList.length > 0 && !isLoading && !isError && (
        <TableFooter
          currentPage={pageNumber}
          totalPages={Math.ceil(totalCustomer / totalPerPage)}
          pageSize={totalPerPage}
          onPageChange={(newPage) => {
            setPageNumber(newPage);
          }}
        />
      )}
    </div>
  );
}
