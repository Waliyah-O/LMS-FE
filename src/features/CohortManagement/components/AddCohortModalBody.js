import { useState } from 'react';
import CustomInput from '../../../components/customInputs/CustomInputs';
import ErrorText from '../../../components/Typography/ErrorText';
import { showNotification } from '../../common/headerSlice';
import { useCreateCohortMutation } from '../cohortApi';
import Button from '../../../components/button';
import { ButtonSize, ButtonState } from '../../../components/button/enum';
import CustomSelect from '../../../components/customInputs/CustomSelect';
import TextArea from '../../../components/customInputs/TextArea';
import { _getTokenFromSession, hasAuthority, showToast } from '../../../utils';

function AddCohortModalBody({ closeModal }) {
  // Create program
  const [createCohort, { isLoading: isCreating }] = useCreateCohortMutation();

  const [newProgramData, setNewProgramData] = useState({
    organizationId: '',
    cohortId: '',
    programName: '',
    description: '',
    // cohortBatch: '',
    // startDate: '',
    // endDate: '',
    // picture: null,
    // pictureUrl: '',
  });

  const handlecreateCohort = async () => {
    try {
      await createCohort(newProgramData);
      showToast('program created', 'success');

      // Reset the form after successful creation
      setNewProgramData({
        organizationId: '',
        cohortId: '',
        programName: '',
        description: '',
        // cohortBatch: '',
        // startDate: '',
        // endDate: '',
        // picture: null,
        // pictureUrl: '',
      });
    } catch (error) {
      console.error('Failed to create program:', error);
      // Handle error (e.g., display error message)
    }
  };

  // const handleFileInputChange = (e) => {
  //   const file = e.target.files[0]; // Get the first file
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setNewProgramData({
  //         ...newProgramData,
  //         picture: file,
  //         pictureURL: reader.result, // Set the picture URL to display
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const cohortOptions = [
  //   { position: 1, label: '2024' },
  //   { position: 2, label: '2025' },
  // ];

  return (
    <div>
      <CustomInput
        labelText={'Organization Id'}
        type="text"
        placeholder="Enter organization id"
        value={newProgramData.organizationId}
        onChange={(e) => setNewProgramData({ ...newProgramData, organizationId: e.target.value })}
      />
      <CustomInput
        labelText={'Cohort Id'}
        type="text"
        placeholder="Enter cohort id"
        value={newProgramData.cohortId}
        onChange={(e) => setNewProgramData({ ...newProgramData, cohortId: e.target.value })}
      />
      <CustomInput
        labelText={'Program Name'}
        type="text"
        placeholder="enter program name"
        value={newProgramData.programName}
        onChange={(e) => setNewProgramData({ ...newProgramData, programName: e.target.value })}
      />
      <TextArea
        labelText={'Program Description & Goals'}
        type="text"
        placeholder="Description"
        value={newProgramData.description}
        onChange={(e) => setNewProgramData({ ...newProgramData, description: e.target.value })}
      />
      {/* <CustomSelect
        labelText={'Cohort'}
        optionText={'Select Cohort'}
        options={cohortOptions}
        type="text"
        placeholder="Cohort Batch"
        value={newProgramData.cohortBatch}
        onChange={(e) => setNewProgramData({ ...newProgramData, cohortBatch: e.target.value })}
      />
      <CustomInput
        labelText={'Program'}
        type="date"
        placeholder="Start Date"
        value={newProgramData.startDate}
        onChange={(e) => setNewProgramData({ ...newProgramData, startDate: e.target.value })}
      />
      <CustomInput
        labelText={'Program'}
        type="date"
        placeholder="End Date"
        value={newProgramData.endDate}
        onChange={(e) => setNewProgramData({ ...newProgramData, endDate: e.target.value })}
      />

      <CustomInput
        labelText={'Program'}
        type="file"
        placeholder="Picture"
        // Remove value and onChange for file input
        className={'file-input  w-full pl-0'}
        onChange={handleFileInputChange} // Handle file input change
      />
      {newProgramData.pictureURL && <img src={newProgramData.pictureURL} alt="program picture" />} */}
      <div className="modal-action">
        <Button value={'cancel'} variant={ButtonState.DarkOutline} className="btn btn-ghost" onClick={() => closeModal()} />
        <Button
          variant={ButtonState.SAVE}
          value={isCreating ? 'Creating...' : 'Create Program'}
          onClick={handlecreateCohort}
          disabled={isCreating}
        />
      </div>
    </div>
  );
}

export default AddCohortModalBody;
