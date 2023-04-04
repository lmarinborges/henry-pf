import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Column } from "react-table";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Flex,
} from "@chakra-ui/react";

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: string;
    brand: Brand;
    category: Category;
}

interface Brand {
    id: number;
    name: string;
    description: string;
}

interface Category {
    id: number;
    name: string;
    description: string;
}

const Tabla = ({ data }: { data: Product[] }) => {
    const columns: Column<Product>[] = useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Description",
                accessor: "description",
            },

            {
                Header: "Price",
                accessor: "price",
            },
            {
                Header: "Stock",
                accessor: "stock",
            },
            {
                Header: "Brand",
                accessor: (row: Product) => row.brand.name,
            },
            {
                Header: "Category",
                accessor: (row: Product) => row.category.name,
            },
            {
                Header: "Actions",
                accessor: "id",
                Cell: ({ value }: { value: number }) => (
                    <Flex>
                        <Button
                            onClick={() => handleEdit(value)}
                            bg="yellow.300"
                            mr="5px"
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={() => handleDelete(value)}
                            bg="red.500"
                            color="white"
                        >
                            Delete
                        </Button>
                    </Flex>
                ),
            },
        ],
        []
    );

    const handleEdit = (id: number) => {
        // Implementar lógica de edición aquí
    };

    const handleDelete = (id: number) => {
        // Implementar lógica de edición aquí
    };

    const tableData = useMemo(() => data, [data]);

    const tableInstance = useTable({ columns, data: tableData });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;

    return (
        <Table variant="simple" {...getTableProps()}>
            <Thead>
                {headerGroups.map((headerGroup) => (
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <Th {...column.getHeaderProps()}>
                                {column.render("Header")}
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <Tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <Td {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                </Td>
                            ))}
                        </Tr>
                    );
                })}
            </Tbody>
        </Table>
    );
};

export default Tabla;
