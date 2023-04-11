import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Column } from "react-table";
interface Columna {
  nombre: string;
  componente?: any;
}

interface Accion {
  icon: React.ReactNode;
  onclick: (row: any) => void;
}

interface Props {
  data: any[];
  columnas?: Columna[];
  acciones: Accion[];
}

export default function TablaDinamica ({ data, columnas, acciones }: Props) {
  const tableData = useMemo(() => data, [data]);
    let columnasTabla:any;
  const columns: any = useMemo(() => {
    const keys = Object.keys(data[0]);
    if (columnas) {
        columnasTabla = columnas.map((columna) => ({
            Header: columna.nombre,
            accessor: columna.nombre,
            id: columna.nombre,
            Cell: columna.componente ? ({ row }: { row: any }) => columna.componente({ id: row.original.item }) : undefined,
          }));
    }else{
        columnasTabla=[]
    }


    const actionsColumn = {
      Header: "Actions",
      accessor: "actions",
      id: "actions",
      Cell: ({ row }: { row: any }) => (
        <div className="flex items-center ">
          {acciones.map(({ icon, onclick }, index) => {
            return(
            <button
              key={index}
              onClick={() => onclick(row.original)}
              className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold p-2  rounded inline-flex items-center "
            >
              {icon}
            </button>
          )})}
        </div>
      ),
    };
    return [
      ...keys.map((key) => ({
        Header: key,
        accessor: key,
        id: key,
      })),
      ...columnasTabla, actionsColumn
    ];
    
  }, [data, columnas, acciones]);


  const tableInstance = useTable({ columns: columns, data: tableData });

  
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <Table variant="simple" {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
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
                <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

