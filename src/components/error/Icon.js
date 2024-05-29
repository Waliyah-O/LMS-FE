import { ReactComponent as Checkmark } from '../../assets/svg/greyCheck.svg';
import { ReactComponent as Error } from '../../assets/svg/redError.svg';
import { ReactComponent as GreenCheck } from '../../assets/svg/greenCheck.svg';

export const Icon = ({ icon, color }) => {
  const icons = {
    error: <Error fill={color} />,
    checkmark: <Checkmark fill={color} />,
    greenCheck: <GreenCheck fill={color} />,
  };

  return icons[icon] || null;
};

// Usage:
// <Icon icon="error" color="red" />
