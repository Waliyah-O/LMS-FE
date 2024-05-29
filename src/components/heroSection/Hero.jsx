import heroImg from '../../assets/images/heroImg.jpeg';
import BgImg from '../../assets/images/BgImg.jpeg';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Button from '../button';
import { ButtonSize, ButtonState } from '../button/enum';
import arrowRight from '../../assets/svg/arrow-narrow-right.svg';

const Hero = ({ mainText, isButton, sectionSize }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/signup');
  };
  const goToDemo = () => {
    navigate('/demo');
  };

  return (
    <div>
      {location.pathname !== '/' ? (
        <section
          style={{
            background: `linear-gradient(0deg, rgba(17, 25, 40, 0.80) 0%, rgba(17, 25, 40, 0.80) 100%), url(${heroImg}) lightgray 50% / cover no-repeat`,
          }}
          className={`${sectionSize} md:h-screen flex flex-col`}
        >
          <header className="text-white text-sm hidden lg:flex flex-col lg:flex-row lg:justify-end items-center gap-4 p-4 lg:p-7 mx-4 lg:mx-14 font-inter">
            <NavLink className={({ isActive }) => [isActive ? 'border-b-2' : '']} to="/why">
              Why i-Academy
            </NavLink>
            <NavLink className={({ isActive }) => [isActive ? 'border-b-2' : '']} to="/benefits">
              Organization Benefits
            </NavLink>
            <NavLink className={({ isActive }) => [isActive ? 'border-b-2' : '']} to="/faq">
              FAQs
            </NavLink>
            <NavLink className={({ isActive }) => [isActive ? 'border-b-2' : '']} to="/contact">
              Contact us
            </NavLink>

            <Button onClick={goToSignUp} variant={ButtonState.HOME} size={ButtonSize.md} value="Sign Up" />
            <Button onClick={goToDemo} variant={ButtonState.SECONDARY} size={ButtonSize.md} value="Book a demo" />
          </header>

          <section className="flex flex-col items-center h-full gap-12 justify-around lg:gap-8 lg:h-3/6 my-12">
            <h1
              style={{ whiteSpace: 'pre-line' }}
              className="text-white font-sora font-extrabold text-xl lg:text-xxl-heading lg:w-full text-center"
            >
              {mainText}
            </h1>

            {isButton && (
              <Button
                onClick={goToDemo}
                variant={ButtonState.SECONDARY}
                size={ButtonSize.lg}
                iconRight={<img src={arrowRight} alt="Arrow Right" />}
                value="Book a demo"
              />
            )}
          </section>

          <div></div>
        </section>
      ) : (
        <section
          style={{
            background: `linear-gradient(0deg, rgba(17, 25, 40, 0.80) 0%, rgba(17, 25, 40, 0.80) 100%), url(${BgImg}) lightgray 50% / cover no-repeat`,
          }}
          className="h-screen"
        >
          <header className="text-white text-sm hidden lg:flex flex-col lg:flex-row lg:justify-end items-center gap-3 p-4 lg:p-7 mx-4 lg:mx-14 font-inter">
            <NavLink className={({ isActive }) => [isActive ? 'border-b-2' : '']} to="/why">
              Why i-Academy
            </NavLink>
            <NavLink className={({ isActive }) => [isActive ? 'border-b-2' : '']} to="/benefits">
              Organization Benefits
            </NavLink>
            <NavLink className={({ isActive }) => [isActive ? 'border-b-2' : '']} to="/faq">
              FAQs
            </NavLink>
            <NavLink className={({ isActive }) => [isActive ? 'border-b-2' : '']} to="/contact">
              Contact us
            </NavLink>

            <Button onClick={goToSignUp} variant={ButtonState.HOME} size={ButtonSize.md} value="Sign Up" />
            <Button onClick={goToDemo} variant={ButtonState.SECONDARY} size={ButtonSize.md} value="Book a demo" />
          </header>

          <aside className="w-full h-full flex flex-col items-center lg:items-start justify-center lg:justify-start gap-6 lg:flex-wrap  p-4 lg:p-16">
            <h1 className="text-white font-sora font-extrabold text-xxl lg:text-xxl-heading lg:w-3/5 text-center lg:text-left">
              Seamless Learning management processes from Start to Finish.
            </h1>

            <p className="text-slate-400 w-full lg:w-1/2 text-center lg:text-left">
              Experience a comprehensive and flawless training journey that covers every stage, from initial job posting to final
              candidate onboarding, fostering a seamless and integrated learning system.
            </p>

            <Button
              variant={ButtonState.SECONDARY}
              size={ButtonSize.lg}
              iconRight={<img src={arrowRight} alt="Arrow Right" />}
              value="Book a demo"
              onClick={goToDemo}
            />
          </aside>
        </section>
      )}
    </div>
  );
};

export default Hero;
