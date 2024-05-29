import Modal from './modal';
import { hideModal } from '../../redux/actions';
import { useDispatch } from 'react-redux';
const SampleModal = () => {
  const dispatch = useDispatch();
  return (
    <Modal onClose={() => dispatch(hideModal())}>
      <></>
    </Modal>
  );
};

export default SampleModal;
