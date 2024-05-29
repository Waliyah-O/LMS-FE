import Button from '../button';
import { ButtonSize, ButtonState } from '../button/enum';
import SpotHeroImg from '../../assets/images/SpotHeroImg.jpeg';
import arrowRight from '../../assets/svg/arrow-narrow-right.svg';
import { useNavigate } from 'react-router-dom';

const SpotlightProduct = () => {
  const navigate = useNavigate();

  const goToDemo = () => {
    navigate('/demo');
  };
  return (
    <div>
      <section
        style={{
          background: `linear-gradient(0deg, rgba(17, 25, 40, 0.80) 0%, rgba(17, 25, 40, 0.80) 100%), url(${SpotHeroImg}) lightgray 50% / cover no-repeat`,
        }}
        className="h-screen"
      >
        <aside className="w-full h-full flex flex-col items-center justify-center gap-6 lg:flex-wrap  p-4 lg:p-16">
          <h1 className="text-white font-sora font-extrabold text-xxl text-center lg:text-xxl-heading lg:w-3/5">
            Discover Our Solution: <br />
            Book a Live Demo
          </h1>

          <p className="text-slate-400 w-full lg:w-1/2 text-center">
            Experience the future today. Book a demo and explore the revolutionary ideas that will transform your world. Discover,
            engage, and be inspired.
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
    </div>
  );
};

export default SpotlightProduct;
