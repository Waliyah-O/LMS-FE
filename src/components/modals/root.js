import { createContext } from 'react';
import { ModalTypesEnum } from './modalTypes';
import { SampleModal } from './index';
import { useSelector } from 'react-redux';

export const MODAL_COMPONENTS = {
  [ModalTypesEnum.SAMPLE_MODAL]: <SampleModal />,
};

export const modalContext = createContext({});

const ModalRootContainer = () => {
  const { modalType, modalData } = useSelector((state) => state.modal);
  if (!modalType) {
    //no modal
    return null;
  }
  const SpecificModal = MODAL_COMPONENTS[modalType];

  return <modalContext.Provider value={modalData}>{SpecificModal}</modalContext.Provider>;
};

export default ModalRootContainer;
