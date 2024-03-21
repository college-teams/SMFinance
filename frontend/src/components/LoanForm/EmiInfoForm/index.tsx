import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmiResponse, LoanResponse, LoanStatus } from "@/types/loan";
import { useMemo } from "react";
import Table from "@/components/Table";
import { Column } from "react-table";
import { ConfirmationModal } from "@/components/ConfirmModal";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { format } from "date-fns";

type EmiInfoFormProps = {
  onNext: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  onBack: () => void;
  emis: EmiResponse[];
  updateEMI: (emiId: number) => Promise<void>;
  handleLoanPreClose: () => Promise<void>;
  loanDetails: LoanResponse | undefined;
};

const EmiInfoForm = ({
  onBack,
  onNext,
  emis,
  updateEMI,
  handleLoanPreClose,
  loanDetails,
}: EmiInfoFormProps) => {
  const [props, activateConfirmModal] = useConfirmModal();

  // Filter unpaid EMIs
  const unpaidEmis = useMemo(
    () => emis.filter((emi) => emi.paymentStatus === "UN_PAID"),
    [emis]
  );

  const totalUnpaidAmount = useMemo(
    () => unpaidEmis.reduce((total, emi) => total + emi.totalAmount, 0),
    [unpaidEmis]
  );

  // Filter paid EMIs
  const paidEmis = useMemo(
    () => emis.filter((emi) => emi.paymentStatus === "PAID"),
    [emis]
  );

  const totalpaidAmount = useMemo(
    () => paidEmis.reduce((total, emi) => total + emi.totalAmount, 0),
    [paidEmis]
  );

  const updateEmiStatus = async (emiId: number, dueData: string) => {
    const formattedDate = format(new Date(dueData), "MMMM dd, yyyy");

    if (
      !(await activateConfirmModal(
        `Are you sure you want to mark the EMI for ${formattedDate}, as paid?`
      ))
    ) {
      return;
    }
    updateEMI(emiId);
  };

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
        Cell: ({ cell: { value: emiId, row } }) => {
          return (
            <button
              className="bg-green-500 text-white px-3 py-1 rounded text-md"
              onClick={() =>
                updateEmiStatus(emiId, row.original.paymentDueDate)
              }
            >
              Paid
            </button>
          );
        },
      },
    ],
    []
  );

  const preCloseLoan = async () => {
    if (
      !(await activateConfirmModal(
        "Are you sure you want to pre-close this loan?"
      ))
    ) {
      return;
    }
    handleLoanPreClose();
  };

  const initialState = { hiddenColumns: ["id"] };

  return (
    <>
      <ConfirmationModal {...props} />

      <div className="relative mt-14 w-[80%] mx-auto">
        <div className="relative flex justify-between flex-wrap items-center">
          <div className="relative mb-8 text-lg ">
            <span>
              Total Pending Emi Amount :
              <span className="relative ml-4 tracking-wider font-semibold bg-transparent">
                ₹{totalUnpaidAmount}
              </span>
            </span>
          </div>

          <div className="relative mb-5 text-lg">
            <span>
              Total Paid Emi Amount :
              <span className="relative ml-4 tracking-wider font-semibold bg-transparent">
                ₹{totalpaidAmount}
              </span>
            </span>
          </div>
        </div>

        <button
          onClick={preCloseLoan}
          disabled={
            loanDetails?.loanStatus === LoanStatus.PRE_CLOSED ||
            loanDetails?.loanStatus === LoanStatus.CLOSED
          }
          className="relative bg-orange-500 text-center px-6 py-2  rounded-md hover:bg-orange-600 mb-5 disabled:bg-gray-300"
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
    </>
  );
};

export default EmiInfoForm;
