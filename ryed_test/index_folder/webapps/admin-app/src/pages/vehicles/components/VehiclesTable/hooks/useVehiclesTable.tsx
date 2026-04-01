import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useDeleteVehicleMutation } from '@/api/vehicleEndpoints';
import { columns, VehicleRow } from '../consts/columns';
import { Props } from '../VehiclesTable';

export const useVehiclesTable = (props: Props) => {
  // const [deleteVehicle] = useDeleteVehicleMutation();
  const navigate = useNavigate();

  const dataTable = useMemo(() => {
    const mappedData: VehicleRow[] =
      props.data?.map((item) => ({
        id: item.id,
        make: item.make,
        model: item.model,
        type: item.type,
        registeredNumber: item.registeredNumber,
        color: item.color,
        year: item.year,
        numberOfSits: item.numberOfSits,
        exclusivityLevel: item.exclusivityLevel,
        tripPricePerKm: item.tripPricePerKm,
        tripMinPrice: item.tripMinPrice,
      })) ?? [];

    return mappedData;
  }, [props.data]);

  // const deleteHandler = async (id: string) => {
  //   await deleteVehicle(id);
  // };

  const table = useReactTable({
    data: dataTable,
    columns: columns(navigate),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return { data: { table, columns } };
};
