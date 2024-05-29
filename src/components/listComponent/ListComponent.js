import LogoBullets from '../../assets/svg/LogoBullets.svg';
import Button from '../button';
import { ButtonSize, ButtonState } from '../button/enum';
import { useNavigate } from 'react-router-dom';

const ListComponent = ({
  listItems = [],
  headerText,
  src,
  headerTextColor,
  bodyTextOne,
  bodyTextTwo,
  isButton,
  bg,
  flexDirection,
  listTextColor,
  variant,
}) => {
  const navigate = useNavigate();
  const goToSignUp = () => {
    navigate('/signup');
  };
  const goToDemo = () => {
    navigate('/demo');
  };
  return (
    <div>
      <section className={`${bg} font-sora`}>
        <div className={`w-full items-center p-4 md:flex ${flexDirection} gap-8 lg:p-8`}>
          <div className="p-3 lg:w-auto">
            <img src={src} className="rounded-md" alt="Image" />
          </div>

          <div className={`w-full p-2 lg:w-3/5 gap-1 flex flex-col justify-between lg:p-10`}>
            <h3
              style={{ whiteSpace: 'pre-line' }}
              className={`font-sora font-semibold text-xl ${headerTextColor} lg:text-lg-heading`}
            >
              {headerText}
            </h3>

            <div className="divider mt-1 w-full"></div>

            <div>
              {listItems ? (
                <ul className="font-inter text-labels list-none">
                  {listItems.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 my-4">
                      <img className="h-10 w-10" src={LogoBullets} />
                      <span className={`flex-1 text-sm leading-tight ${listTextColor} font-medium md:text-base`}>
                        {item.element}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <section className="flex flex-col gap-6 text-gray-500">
                  <p>{bodyTextOne}</p>
                  <p>{bodyTextTwo}</p>
                </section>
              )}
            </div>

            {isButton && (
              <div className="flex flex-col lg:flex-row gap-3">
                <Button onClick={goToDemo} variant={ButtonState.SECONDARY} size={ButtonSize.md} value="Book a demo" />
                <Button onClick={goToSignUp} variant={variant} size={ButtonSize.md} value="Sign Up" />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListComponent;
