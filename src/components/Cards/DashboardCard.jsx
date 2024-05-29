import { Link } from 'react-router-dom';
import Button from '../../components/button';
import { ButtonSize, ButtonState } from '../../components/button/enum';

const Card = ({
  mainText,
  cardText,
  srcImg,
  buttonText,
  onClick,
  onClickTwo,
  className,
  textOne,
  textTwo,
  bgColor,
  multiButton = false,
  mainTextSize,
  mainTextColor,
  cardTextColor,
}) => {
  return (
    <>
      <div className={`${bgColor} rounded-md p-4 flex shadow-basic drop-shadow-sm md:p-8 items-center justify-between`}>
        <div className={`flex items-center gap-1.5`}>
          <figure>
            <img className={`w-10 ${className}`} src={srcImg} alt="Img" />
          </figure>
          <div>
            <h2 className={`${mainTextSize} ${mainTextColor} font-bold`}>{mainText}</h2>
            <p className={`${cardTextColor} text-labels`}>{cardText}</p>
          </div>
        </div>
        {multiButton ? (
          <div className="flex flex-col-reverse gap-1 md:flex items-center md:flex-row lg:gap-3">
            <Button variant={ButtonState.outline} size={ButtonSize.s} value={textOne} onClick={onClick} />
            <Button variant={ButtonState.plain} size={ButtonSize.s} value={textTwo} onClick={onClickTwo} />
          </div>
        ) : (
          <Button variant={ButtonState.DarkOutline} size={ButtonSize.s} value={buttonText} onClick={onClick} />
        )}
      </div>
    </>
  );
};

export default Card;
