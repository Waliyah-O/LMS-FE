import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCohortsQuery } from './cohortApi';
import { FaArrowLeftLong } from 'react-icons/fa6';
import Drawer from '../../components/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { setPrimaryContent, setSecondaryContent } from '../../components/DrawerSlice';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import sample from '../../assets/Theo.pdf';
import TextArea from '../../components/customInputs/TextArea';
import Button from '../../components/button';
import { ButtonSize, ButtonState } from '../../components/button/enum';
import { IoWarning } from 'react-icons/io5';
import { dummyProgramData } from '../../data/dummyData';
import ProfileCard from '../../components/Cards/ProfileCard';
import TitleCard from '../../components/Cards/TitleCard';
import { capitalize } from '../../utils';
import { BsClipboard2X } from 'react-icons/bs';
import InfoCard from '../../components/Cards/InfoCard';
import Loader from '../../components/loading/Loader';
import { useDeleteCohortMutation, useUpdateCohortMutation } from './cohortApi';
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil';
import CustomInput from '../../components/customInputs/CustomInputs';
import CustomRadioButton from '../../components/customInputs/CustomRadioButton';
import DrawerForms from '../../components/Forms/DrawerForm/DrawerForms';
import { openModal } from '../common/modalSlice';

const CohortDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const toggleDrawer = useToggleDrawer();

  const { primaryContent, secondaryContent } = useSelector((state) => state.drawer);

  const { data: cohorts, error, isLoading, isFetching } = useGetCohortsQuery();
  const cohortDetails = cohorts && cohorts.data ? cohorts.data : []
  console.log(cohortDetails);

  const [updateCohort, { isLoading: isUpdating }] = useUpdateCohortMutation();
  const [deleteCohort, { isLoading: isDeleting }] = useDeleteCohortMutation();

  
  const handleUpdateCohort = async (id, newData) => {
    try {
      await updateCohort({ id, ...newData });
    } catch (error) {
      console.error(`Failed to update cohort ${id}`, error);
    }
  };

  useEffect(() => {
    if (cohorts) {
      console.log('Cohorts:', cohorts.data);
    }
  }, [cohorts]);

  const goBack = () => {
    navigate(-1);
  };

  // Check if programs.data exists and is an array before finding the selected program
  // const selectedCohort = dummyProgramData.find((cohort) => cohort.cohortId === id);
  const selectedCohort = cohortDetails.find((cohort) => cohort.cohortId === id);

  console.log(selectedCohort);

  if(isLoading || isFetching){
    return <Loader type={'loading-bars'} size={'loading-lg'}/>
  }

  if (!selectedCohort) {
    return (
      <div className="w-full h-screen border border-red-600 flex flex-col items-center justify-center">
        <BsClipboard2X className="w-28 h-28 text-red-650" />
        <p>Cohort details not available</p>
        <Button value="Go back" variant={ButtonState.ALT_DARK} size={ButtonSize.md} onClick={goBack} />
      </div>
    );
  }

  const firstDrawerContent = (
    <>
     <DrawerForms isCreatingCohort/>
    </>
  );

  const secondDrawerContent = (
    <>
      <h1 className="font-bold text-gray-500">Disable Account</h1>
      <TextArea />
    </>
  );

  const handleDeleteCohort = ({organizationId, cohortId,}) => {
    dispatch(
      openModal({
        title: 'Delete Cohort',
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: 'Are you sure you want to delete this cohort?',
          type: CONFIRMATION_MODAL_CLOSE_TYPES.COHORT_DELETE,
          organizationId,
          cohortId
        }
      })
    )
  }

  const handleFirstCLick = () => {
    toggleDrawer();
    dispatch(setPrimaryContent('first'));
    dispatch(setSecondaryContent(''));
  };


  return (
    <div className="p-4 bg-gray-50">
      <div className="absolute -top-10 ">
        <Drawer
          primaryContent={primaryContent === 'first' && firstDrawerContent}
          secondaryContent={secondaryContent === 'second' && secondDrawerContent}
          defaultText={'.'}
          primaryWidth={'w-1/3'}
          secondaryWidth={'w-1/3'}
        />
      </div>
      <div className="pb-4">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="btn btn-xs btn-outline text-blue-500 no-animation">
            <FaArrowLeftLong /> Back
          </button>
          <h1 className="text-xl font-bold">Cohort Profile</h1>
        </div>
      </div>
      <ProfileCard
      nameText={selectedCohort.cohortName} subTitle={'Cohort Name'} buttonTextOne={'Edit Cohort'} onClick={handleFirstCLick} buttonTextTwo={'Delete Cohort'} onClickTwo={handleDeleteCohort}
      />
      {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus iure maiores omnis excepturi obcaecati quidem, voluptas maxime aspernatur impedit reprehenderit.</p> */}

      <TitleCard title={'Basic Information'} className={'p-4'}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          <div>
            <CustomInput labelText={'Start Date'} placeholder={'14 January, 2024'}/>       
            <CustomInput labelText={'End Date'} placeholder={'21 January, 2024'}/> 
          </div>      
          <TextArea labelText={'Cohort Description'} placeholder={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus iure maiores omnis excepturi obcaecati quidem, voluptas maxime aspernatur impedit reprehenderit.'} readOnly className={'w-full h-48'}/>       
        </div>
      </TitleCard>

{/* {selectedCohort.status === 'InReview' && (
        <TitleCard title={'Next of kin'} className={'p-4'}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">next of kin</div>
        </TitleCard>
      )} */}
      
      
    </div>
  );
};

export default CohortDetails;
