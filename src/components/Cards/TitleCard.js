import Subtitle from '../Typography/Subtitle';
function TitleCard({
  title,
  children,
  topMargin,
  topSideButtons,
  hasRadioButton,
  className,
  hasDivider,
  actionButton,
  onClick,
  buttonText,
  colored,
  contentStyle,
}) {
  return (
    <div className={`card w-full p-6 drop-shadow-sm shadow-basic bg-white ${className} ${topMargin || 'mt-6'}`}>
      {/* Title for Card */}
      <Subtitle>
        <div className={`flex justify-between ${contentStyle}`}>
          {title}
          {actionButton && (
            <div>
              <label
                onClick={onClick}
                className={`drawer-button btn btn-sm ${
                  colored ? 'bg-blue-500 text-white' : 'btn-outline'
                } no-animation hover:bg-blue-500 ${colored ? '' : 'hover:text-white'}`}
              >
                {buttonText}
              </label>
            </div>
          )}
        </div>

        {/* Top side button, show only if present */}
        {topSideButtons && <div>{topSideButtons}</div>}
      </Subtitle>

      {hasDivider && <div className="divider mt-2"></div>}
      {hasRadioButton && <div>{hasRadioButton}</div>}

      {/** Card Body */}
      <div className="w-full bg-transparent">{children}</div>
    </div>
  );
}

export default TitleCard;
