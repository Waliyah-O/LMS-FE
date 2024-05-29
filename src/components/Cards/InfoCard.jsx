import React from 'react';
import TitleCard from './TitleCard';
import DateInput from '../../components/customInputs/DateInput';
import TextArea from '../../components/customInputs/TextArea';
import { BsClipboard2X } from 'react-icons/bs';
import Button from '../../components/button';
import { ButtonSize, ButtonState } from '../../components/button/enum';

const InfoCard = () => {
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row">
        <TitleCard contentStyle={'w-full md:w-4/5 mx-auto'} title={'Basic Information'}>
          <div className="w-full md:w-4/5 flex flex-col mx-auto gap-3 mt-3">
            <DateInput type={'text'} inputSize={'input-sm'} labelText={'Start Date'} readOnly value={'17 January 2024'} />
            <DateInput type={'text'} inputSize={'input-sm'} labelText={'End Date'} readOnly value={'17 June 2024'} />
            <TextArea
              labelText={'Cohort Description'}
              className={'h-40 textarea-sm'}
              readOnly
              value={
                'Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus.'
              }
            />
          </div>
        </TitleCard>

        <TitleCard className={'grid place-content-center'}>
          <div className="w-full h-full flex flex-col justify-center items-center gap-4">
            <BsClipboard2X className="w-16 h-16 text-red-650" />
            <h2 className="text-headline font-semibold">No Curriculum</h2>
            <p className="flex text-center items-center justify-center font-semibold md:whitespace-pre-line">
              {` Click the button below to initiate the creation of a\ncurriculum & courses as none has been established yet.`}
            </p>
            <Button value="Add Program" variant={ButtonState.ALT_DARK} size={ButtonSize.md} />
          </div>
        </TitleCard>
      </div>
    </>
  );
};

export default InfoCard;
