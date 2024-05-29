import { useState } from 'react';
import CustomInput from '../../../components/customInputs/CustomInputs';
import { useCreateOrganizationMutation } from '../AdminApi';
import Button from '../../../components/button';
import { ButtonSize, ButtonState } from '../../../components/button/enum';
import TextArea from '../../../components/customInputs/TextArea';
import { showToast } from '../../../utils';

function AddAdminModalBody({ closeModal }) {
  // Create admin
  const [createOrganization, { isLoading: isCreating }] = useCreateOrganizationMutation();

  const [newAdminData, setNewAdminData] = useState({
    organizationName: '',
    displayName: '',
    organizationEmail: '',
    adminFirstName: '',
    adminLastName: '',
    adminEmail: '',
    // organizationStatus: 'Inactive',
  });

  const handleCreateAdmin = async () => {
    try {
      await createOrganization(JSON.stringify(newAdminData));
      // const res = await createOrganization(newAdminData);
      // console.log(res);
      showToast('admin created', 'success');
      showToast('email sent to admin and organization emails', 'success');

      // Reset the form after successful creation
      setNewAdminData({
        organizationName: '',
        displayName: '',
        organizationEmail: '',
        adminFirstName: '',
        adminLastName: '',
        adminEmail: '',
        // organizationStatus: '',
      });
    } catch (error) {
      showToast(
        <>
          Something Happened! <br /> Try Again
        </>,
        'error'
      );
      console.error('Failed to create admin:', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div>
      <CustomInput
        labelText={'Organization Name'}
        type="text"
        placeholder="Enter organization name"
        value={newAdminData.organizationName}
        onChange={(e) => setNewAdminData({ ...newAdminData, organizationName: e.target.value })}
      />
      <CustomInput
        labelText={'Display Name'}
        type="text"
        placeholder="Enter display name"
        value={newAdminData.displayName}
        onChange={(e) => setNewAdminData({ ...newAdminData, displayName: e.target.value })}
      />
      <CustomInput
        labelText={'Organization Email'}
        type="text"
        placeholder="enter organization email"
        value={newAdminData.organizationEmail}
        onChange={(e) => setNewAdminData({ ...newAdminData, organizationEmail: e.target.value })}
      />
      <CustomInput
        labelText={'Admin Firstname'}
        type="text"
        placeholder="enter admin firstname"
        value={newAdminData.adminFirstName}
        onChange={(e) => setNewAdminData({ ...newAdminData, adminFirstName: e.target.value })}
      />
      <CustomInput
        labelText={'Admin Lastname'}
        type="text"
        placeholder="enter admin lastname"
        value={newAdminData.adminLastName}
        onChange={(e) => setNewAdminData({ ...newAdminData, adminLastName: e.target.value })}
      />
      <CustomInput
        labelText={'Admin Email'}
        type="text"
        placeholder="enter admin email"
        value={newAdminData.adminEmail}
        onChange={(e) => setNewAdminData({ ...newAdminData, adminEmail: e.target.value })}
      />
      {/* <CustomInput
        labelText={'Organization Status'}
        type="text"
        placeholder="enter organization status"
        value={newAdminData.organizationStatus}
        // onChange={(e) => setNewAdminData({ ...newAdminData, organizationStatus: e.target.value })}
      /> */}

      <div className="modal-action">
        <Button value={'cancel'} variant={ButtonState.DarkOutline} className="btn btn-ghost" onClick={() => closeModal()} />
        <Button
          variant={ButtonState.SAVE}
          value={isCreating ? 'Creating...' : 'Create Admin'}
          onClick={handleCreateAdmin}
          disabled={isCreating}
        />
      </div>
    </div>
  );
}

export default AddAdminModalBody;
