import React from 'react';
import Button from '../button';
import { ButtonSize, ButtonState } from '../button/enum';

const ProfileCard = ({
  imgSrc,
  nameText,
  userType,
  title,
  subTitle,
  role,
  buttonTextOne,
  buttonTextTwo,
  onClick,
  onClickTwo,
  onButtonClick,
  disabledText,
  Status,
}) => {
  return (
    <div className="stats stats-vertical shadow-basic lg:stats-horizontal w-full p-4">
      <div className="flex justify-center gap-4 lg:justify-start">
        {imgSrc && <img src={imgSrc} className="w-24 rounded-md " alt="img" />}

        {!userType && (
          <>
            <div className="flex flex-col justify-center">
              <p className="stat-desc">{subTitle}</p>
              <p className="text-xl font-semibold">{nameText}</p>
            </div>
          </>
        )}
        {userType && (
          <div className="flex flex-col gap-2 p-2  md:mr-0">
            <h1 className="text-xl font-bold">{nameText}</h1>

            <p
              className={`stat-desc px-1.5 py-1 w-fit rounded-md shadow-gray-100 font-semibold ${
                userType === 'Tutor' ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'
              }`}
            >
              {userType}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center items-center lg:items-start p-2 mt-4 lg:mt-0">
        <div className="mx-auto text-center lg:text-left">
          <p className="stat-desc">{title}</p>
          <p className="text-xl font-semibold">{role}</p>
        </div>
      </div>

      {!userType && (
        <div className="flex flex-col justify-center items-center lg:items-start p-2 mt-4 lg:mt-0">
          <div className="w-full flex justify-center items-center gap-5 p-2">
            <Button
              variant={ButtonState.ALT_DARKOUTLINE}
              size={ButtonSize.xs}
              value={buttonTextOne}
              onClick={onClick}
              className="hover:bg-slate-300"
            />
            <Button
              variant={ButtonState.ALT_RED}
              size={ButtonSize.xs}
              value={buttonTextTwo}
              onClick={onClickTwo}
              className="hover:bg-red-300"
            />
          </div>
        </div>
      )}

      {userType === 'Student' && (
        <div className="flex flex-col justify-center items-center lg:items-start p-2 mt-4 lg:mt-0">
          <div className="mx-auto">
            {Status === 'Active' ? (
              <Button
                variant={ButtonState.ALT_RED}
                size={ButtonSize.xs}
                value={buttonTextTwo}
                onClick={onClickTwo}
                className="hover:bg-red-300"
              />
            ) : (
              <Button
                variant={ButtonState.ALT_SECONDARY_OUTLINE}
                size={ButtonSize.xs}
                value={disabledText}
                onClick={onButtonClick}
              />
            )}
          </div>
        </div>
      )}

      {userType === 'Tutor' && (
        <div className="flex flex-col justify-center items-center lg:items-start p-2 mt-4 lg:mt-0">
          <div className="w-full flex justify-center items-center gap-5 p-2">
            <Button
              variant={ButtonState.ALT_DARKOUTLINE}
              size={ButtonSize.xs}
              value={buttonTextOne}
              onClick={onClick}
              className="hover:bg-slate-300"
            />
            {Status === 'Active' ? (
              <Button
                variant={ButtonState.ALT_RED}
                size={ButtonSize.xs}
                value={buttonTextTwo}
                onClick={onClickTwo}
                className="hover:bg-red-300"
              />
            ) : (
              <Button
                variant={ButtonState.ALT_SECONDARY_OUTLINE}
                size={ButtonSize.xs}
                value={disabledText}
                onClick={onButtonClick}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
