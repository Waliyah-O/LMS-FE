import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProgramsQuery } from './programApi';
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
import { BsClipboard2X } from 'react-icons/bs';
import InfoCard from '../../components/Cards/InfoCard';

const ProgramDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDrawer = useToggleDrawer();

  const { primaryContent, secondaryContent } = useSelector((state) => state.drawer);

  const { data: programs, error, isLoading, isFetching } = useGetProgramsQuery();
  const programDetails = programs && programs.data ? programs.data : []

  useEffect(() => {
    if (programs) {
      console.log('Programs:', programs.data);
    }
  }, [programs]);

  const goBack = () => {
    navigate(-1);
  };

  // Check if programs.data exists and is an array before finding the selected program
  // const selectedProgram = programDetails.find((program) => program.programId === id);
  // const selectedProgram = dummyProgramData.find((program) => program.programId === id);
  const selectedProgram = dummyProgramData.find((program) => program.id === id);

  // if (!selectedProgram) {
  //   return (
  //     <div className="w-full h-screen border border-red-600 flex flex-col items-center justify-center">
  //       <BsClipboard2X className="w-40 h-40 text-red-650" />
  //       <p>Program details not available</p>
  //       <Button value="Go back" variant={ButtonState.ALT_DARK} size={ButtonSize.md} onClick={goBack} />
  //     </div>
  //   );
  // }

 

  const firstDrawerContent = (
    <>
      <h1 className="font-bold">Tutor's Resume</h1>
      <iframe src={sample} width={'100%'} height={'700px'} />
    </>
  );

  const secondDrawerContent = (
    <>
      <h1 className="font-bold text-gray-500">Disable Account</h1>
      <TextArea />
    </>
  );

  const handleFirstCLick = () => {
    toggleDrawer();
    dispatch(setPrimaryContent('first'));
    dispatch(setSecondaryContent(''));
  };

  const handleSecondCLick = () => {
    toggleDrawer();
    dispatch(setSecondaryContent('second'));
    dispatch(setPrimaryContent(''));
  };

  return (
    <div className="p-4 bg-gray-50">
      <div className="absolute -top-10 ">
        <Drawer
          primaryContent={primaryContent === 'first' && firstDrawerContent}
          secondaryContent={secondaryContent === 'second' && secondDrawerContent}
          defaultText={'.'}
          primaryWidth={'w-3/5'}
          secondaryWidth={'w-1/3'}
        />
      </div>
      <div className="pb-4">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="btn btn-xs btn-outline text-blue-500 no-animation">
            <FaArrowLeftLong /> Back
          </button>
          <h1 className="text-xl font-bold">Program Profile</h1>
        </div>
      </div>
      <ProfileCard
        imgSrc={selectedProgram.avatar}
        nameText={selectedProgram.program}
        title={selectedProgram.program}
        role={selectedProgram.cohort}
        Status={selectedProgram.Status}
        subTitle={'Program Name'}
        onClick={handleFirstCLick}
        onClickTwo={handleSecondCLick}
        buttonTextOne={`Edit Program`}
        buttonTextTwo={'Delete Program'}
      />

      {/* <section> */}
      {/* <TitleCard contentStyle={'w-full md:w-4/5 mx-auto'} title={'Basic Information'}>
          <div className="w-full md:w-4/5 flex flex-col mx-auto gap-3 mt-3">
            <DateInput type={'text'} inputSize={'input-sm'} labelText={'Start Date'} readOnly value={'17 January 2024'} />
            <DateInput type={'text'} inputSize={'input-sm'} labelText={'End Date'} readOnly value={'17 June 2024'} />
            <TextArea
              labelText={'Cohort Description'}
              className={'h-40'}
              value={
                'Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus.'
              }
            />
          </div>
        </TitleCard> */}
      <InfoCard />
      {/* <TitleCard title={'Program Curriculum'} actionButton colored buttonText={'Create a course'}></TitleCard> */}
      {/* </section> */}
    </div>
  );
};

export default ProgramDetails;
