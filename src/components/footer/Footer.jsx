import { Link } from 'react-router-dom';

import academyLogo from '../../assets/svg/academyLogo.svg';
import linkedIn from '../../assets/svg/linkedIn.svg';
import twitter from '../../assets/svg/twitter.svg';
import threads from '../../assets/svg/threads.svg';
import facebook from '../../assets/svg/facebook.svg';
import instagram from '../../assets/svg/instagram.svg';

const Footer = () => {
  return (
    <div>
      <footer className="w-full footer bg-gray-700 text-neutral-content flex flex-col md:flex-row justify-between items-center p-4 md:p-8">
        <aside className="md:pl-16 mb-4 md:mb-0">
          <img src={academyLogo} alt="academy-logo" />
        </aside>

        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-base opacity-60">© 2023 i-Academy, All rights reserved.</p>
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
      </footer>
    </div>
  );
};

export default Footer;
