import { ErrorBoundary } from 'react-error-boundary';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowNarrowLeft } from '../../assets/svg/arrow_narrow_left.svg';
import { ErrorUI } from '../error/ErrorUi';
import authImg from '../../assets/images/authImg.png';
import { useEffect } from 'react';
// import VerifyEmailPage from '../../pages/verifyEmail';

const VerifyEmailPageLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromRoute = location.state && location.state.email;

  // useEffect(() => {
  //   navigate('/verify', { state: { emailFromRoute } });
  // });

  return (
    <div>
      <div className="w-full flex justify-evenly gap-24 bg-white md:p-5 lg:p-16">
        <ErrorBoundary FallbackComponent={ErrorUI}>
          <div className="relative [background-color:rgba(83,85,90,0.35)] [width:524px] [height:460px] rounded-3xl hidden lg:block">
            <h3 className="font-extrabold text-white font-sora [font-size:28px] absolute top-20 right-6 ">Verify Email</h3>
            <img className="[width:369px] [height:507px] absolute bottom-0 left-0" src={authImg} />
          </div>

          <div className="[width:524px] lg:w-3/5  flex-col items-center sm:p-2 p-4">
            <div className="flex flex-col items-start gap-10">
              <button className="flex gap-2 items-center" onClick={() => navigate(-1)}>
                <ArrowNarrowLeft />
                <span className="text-black font-medium text-sm">Go Back</span>
              </button>
              <div className="w-full">
                <div className="w-full mb-5 items-center justify-start md:items-start font-inter ">
                  <h2 className="font-semibold [font-size:32px]  [color:#53555A]">Verify your email address.</h2>
                  <p className="[font-size:14px] [color:#111928] [font-weight:400]">
                    We emailed you a six-digit code to <span className="[font-weight:700] [color:#111928]">{emailFromRoute}</span>{' '}
                    <br /> Enter the code below to confirm your email address.
                  </p>
                </div>
              </div>
            </div>
            <div>{children}</div>
            {/* <VerifyEmailPage /> */}
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default VerifyEmailPageLayout;
