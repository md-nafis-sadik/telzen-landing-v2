import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeRemoveEsimModal,
  openEsimSuccessModal,
} from "@/store/modules/ui/uiSlice";
import { useDeleteEsimMutation } from "@/store/modules/destination/destinationApi";
import { toast } from "react-toastify";

export const useRemoveEsim = () => {
  const dispatch = useAppDispatch();
  const { removeEsimModal } = useAppSelector((state) => state.ui);
  const { isOpen: isRemoveEsimModalOpen, selectedEsimId } = removeEsimModal;
  const [deleteEsim, { isLoading }] = useDeleteEsimMutation();

  const handleClose = () => {
    dispatch(closeRemoveEsimModal());
  };

  const handleRemove = async () => {
    if (selectedEsimId) {
      try {
        await deleteEsim({ esim_id: selectedEsimId }).unwrap();
        handleClose();
        dispatch(openEsimSuccessModal());
      } catch (error: any) {
        console.log("Failed to remove eSIM:", error);
        const errorMessage =
          error?.data?.message || "Failed to remove eSIM. Please try again.";
        toast.error(errorMessage);
      }
    }
  };

  return {
    isRemoveEsimModalOpen,
    isLoading,
    handleClose,
    handleRemove,
  };
};
