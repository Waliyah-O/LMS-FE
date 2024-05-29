import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_CLOSE_TYPES } from '../../../utils/globalConstantUtil';
import { showNotification } from '../headerSlice';
import { useDeleteOrganizationMutation } from '../../AdminManagement/AdminApi';
import { useDeleteCohortMutation } from '../../CohortManagement/cohortApi';
import {useDeleteProgramMutation} from '../../ProgramManagement/programApi'
import Button from '../../../components/button';
import { ButtonSize, ButtonState } from '../../../components/button/enum';
import { showToast } from '../../../utils';

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteOrganizationMutation();
  const { deleteCohort } = useDeleteCohortMutation();
  const {deleteProgram} = useDeleteProgramMutation()

  const { message, type, _id, index, organizationId, cohortId, programId } = extraObject;

  const proceedWithYes = async () => {
    try {
      if (
        type === CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE ||
        type === CONFIRMATION_MODAL_CLOSE_TYPES.ADMIN_DELETE ||
        type === CONFIRMATION_MODAL_CLOSE_TYPES.COHORT_DELETE ||
        type === CONFIRMATION_MODAL_CLOSE_TYPES.PROGRAM_DELETE
      ) {
        // positive response, call api or dispatch redux function
        await deleteAdmin({ index });
        await deleteCohort(organizationId, cohortId);
        await deleteProgram(organizationId, programId);
        // dispatch(deleteCohort({ organizationId, cohortId }));
        dispatch(showNotification({ message: 'Deleted!', status: 1 }));
      }
    } catch (error) {
      showToast(
        <div className="text-labels">
          Something went wrong! <br /> please try again!
        </div>,
        'error'
      );
      console.error('Error deleting:', error);
    } finally {
      closeModal();
    }
  };

  // const proceedWithYes = async ({ type, index, organizationId, cohortId }, closeModal) => {
  //   try {
  //     if (
  //       type === CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE ||
  //       type === CONFIRMATION_MODAL_CLOSE_TYPES.ADMIN_DELETE ||
  //       type === CONFIRMATION_MODAL_CLOSE_TYPES.COHORT_DELETE ||
  //       type === CONFIRMATION_MODAL_CLOSE_TYPES.PROGRAM_DELETE
  //     ) {
  //       // positive response, call deleteCohort function to delete the cohort
  //       await deleteCohort(organizationId, cohortId);
  //       dispatch(showNotification({ message: 'Deleted!', status: 1 }));
  //     }
  //   } catch (error) {
  //     console.error('Error deleting cohort:', error);
  //     // Handle error if needed
  //   } finally {
  //     closeModal(); // Close the modal regardless of success or failure
  //   }
  // };

  return (
    <>
      <p className=" text-xl mt-8 text-center">{message}</p>

      <div className="modal-action mt-12 flex w-full items-center justify-center">
        <Button
          value="Cancel"
          onClick={() => closeModal()}
          size={ButtonSize.md}
          variant={ButtonState.ALT_DARKOUTLINE}
          className={'w-36'}
        />

        <Button
          value={isDeleting ? 'Deleting...' : 'Yes'}
          onClick={() => proceedWithYes()}
          className={'w-36 hover:bg-red-400'}
          variant={ButtonState.ALT_SECONDARY}
          size={ButtonSize.md}
        />
      </div>
    </>
  );
}

export default ConfirmationModalBody;
