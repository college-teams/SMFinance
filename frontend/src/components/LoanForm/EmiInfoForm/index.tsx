import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmiResponse } from "@/types/loan";
import { useMemo } from "react";
import Table from "@/components/Table";
import { Column } from "react-table";

type EmiInfoFormProps = {
  onNext: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  onBack: () => void;
  emis: EmiResponse[];
  updateEMI: (emiId: number) => Promise<void>;
  handleLoanPreClose: () => Promise<void>;
};

const EmiInfoForm = ({
  onBack,
  onNext,
  emis,
  updateEMI,
  handleLoanPreClose,
}: EmiInfoFormProps) => {
  // Filter unpaid EMIs
  const unpaidEmis = useMemo(
    () => emis.filter((emi) => emi.paymentStatus === "UN_PAID"),
    [emis]
  );

  // Filter paid EMIs
  const paidEmis = useMemo(
    () => emis.filter((emi) => emi.paymentStatus === "PAID"),
    [emis]
  );

  const columns = useMemo<Column<EmiResponse>[]>(
    () => [
      {
        Header: "EMI Amount",
        accessor: "emiAmount",
      },
      {
        Header: "Payment Due Date",
        accessor: "paymentDueDate",
      },
      {
        Header: "Penalty Amount",
        accessor: "penaltyAmount",
      },
      {
        Header: "Total Amount",
        accessor: "totalAmount",
      },
      //   {
      //     Header: "Payment Status",
      //     accessor: "paymentStatus",
      //     Cell: ({ cell: { value } }): JSX.Element => (
      //       <div
      //         className={`relative ${
      //           value === "PAID" ? "bg-green-600" : "bg-red-600"
      //         } px-2 py-1 rounded-sm text-black font-semibold text-sm inline`}
      //       >
      //         {value}
      //       </div>
      //     ),
      //   },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ cell: { value: emiId } }) => {
          return (
            <button
              className="bg-green-500 text-black px-3 py-1 rounded-md"
              onClick={() => updateEMI(emiId)}
            >
              Paid
            </button>
          );
        },
      },
    ],
    [updateEMI]
  );

  const initialState = { hiddenColumns: ["id"] };

  return (
    <div className="relative mt-14 w-[80%] mx-auto">
      <button
        onClick={handleLoanPreClose}
        className="relative bg-orange-500 text-center px-6 py-2  rounded-md hover:bg-orange-600 mb-5"
      >
        Pre close loan
      </button>
      <div className="relative">
        <Tabs defaultValue="un_paid" className="mx-auto">
          <TabsList className="w-full">
            <TabsTrigger
              value="un_paid"
              className="w-full  active:bg-orange-500 text-black"
            >
              Unpaid EMIs
            </TabsTrigger>
            <TabsTrigger value="paid" className="w-full">
              Paid EMIs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="un_paid">
            <Table
              data={unpaidEmis}
              columns={columns}
              loading={false} // Set loading to true/false as needed
              showPagination={true}
              initialState={{ hiddenColumns: [] }}
            />
          </TabsContent>
          <TabsContent value="paid">
            <Table
              data={paidEmis}
              columns={columns}
              loading={false} // Set loading to true/false as needed
              showPagination={true}
              initialState={initialState}
            />
          </TabsContent>
        </Tabs>
      </div>
      <div className="relative col-span-1 text-center flex items-center justify-between mt-12 ">
        <button
          onClick={onBack}
          className="relative bg-orange-500 text-center px-6 py-2  rounded-md hover:bg-orange-600 mr-2"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="relative bg-orange-500 text-center ml-auto px-6 py-2 rounded-md hover:bg-orange-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmiInfoForm;
