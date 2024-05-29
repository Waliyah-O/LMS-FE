import { Link, useNavigate } from 'react-router-dom';

import Button from '../components/button';
import { ButtonSize, ButtonState } from '../components/button/enum';
import SearchBar from '../components/customInputs/SearchBar';
import searchIcon from '../assets/svg/search.svg';
import academyLogo from '../assets/svg/academyLogo.svg';
import linkedIn from '../assets/svg/linkedIn.svg';
import twitter from '../assets/svg/twitter.svg';
import threads from '../assets/svg/threads.svg';
import facebook from '../assets/svg/facebook.svg';
import instagram from '../assets/svg/instagram.svg';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="bg-notFoundBg bg-no-repeat bg-cover bg-center w-full h-screen flex flex-col items-center justify-center bg-orange-900 ">
      <div className="w-full h-4/5 border border-red-550 backdrop-blur-md flex items-center justify-center">
        <div className="w-1/2 h-full flex-1 border border-yellow-400 flex items-center justify-evenly p-4 flex-col text-white">
          <h1 className="text-xxxl-heading font-normal font-montserrat">404</h1>
          <p className="uppercase">not found</p>
          <p className=" text-md-headline">Sorry the page you were looking for was not found.</p>
          <Button
            size={ButtonSize.md}
            variant={ButtonState.ALT_WHITEOUTLINE}
            onClick={goBack}
            value="click to go back"
            className="mt-2"
          />
        </div>

        <div className="w-1/2 h-full flex-1 border border-green-500 flex flex-col items-center justify-around">
          <h1 className=" text-white text-md-headline">Would you rather search?</h1>
          <div className="relative w-full md:w-fit">
            <div className="">
              <SearchBar customStyles="input-sm placeholder-slate-400 text-gray-800 pl-8 w-[20rem] lg:w-[26rem]" />
              <div className="absolute inset-y-0 left-2 flex items-center">
                <img src={searchIcon} alt="searchicon" />
              </div>
            </div>

            <div className="absolute inset-y-0 top-[2px] right-0 flex items-center ">
              <Button variant={ButtonState.SEARCH404} size={ButtonSize.s} value="Search" />
            </div>
          </div>
          <section className="flex gap-4">
            <Link to="/">
              <img src={linkedIn} alt="linkedIn-logo" />
            </Link>
            <Link to="/">
              <img src={twitter} alt="twitter-logo" />
            </Link>
            <Link to="/">
              <img src={threads} alt="thread-logo" />
            </Link>
            <Link to="/">
              <img src={facebook} alt="facebook-logo" />
            </Link>
            <Link to="/">
              <img src={instagram} alt="instagram-logo" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
