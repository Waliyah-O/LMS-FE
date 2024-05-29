import { ButtonSize, ButtonState } from './enum';

const Button = ({
  value = 'Click Me',
  variant = ButtonState.PRIMARY,
  size = ButtonSize.lg,
  icon,
  iconRight,
  className,
  disabled,
  onClick,
  type,
  isLoading = false,
  ...props
}) => {
  return (
    <button
      className={`disabled:cursor-not-allowed disabled:opacity-50 ${className} ${variant} ${size}`}
      disabled={disabled}
      type={type}
      {...props}
      onClick={onClick}
    >
      {isLoading && <span className="loading loading-spinner"></span>}
      {icon && <span className={'mr-2'}>{icon}</span>}
      <span className={``}>{value}</span>
      {iconRight && <span className={'ml-2'}>{iconRight}</span>}
    </button>
  );
};

export default Button;
