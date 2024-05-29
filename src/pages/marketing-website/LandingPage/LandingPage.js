import featuresArrow from '../../../assets/svg/features-arrow.svg';
import lastImg from '../../../assets/images/landingPageImg.png';
import Card from '../../../components/Cards/Card';
import ListComponent from '../../../components/listComponent/ListComponent';
import Hero from '../../../components/heroSection/Hero';
import { listContent, featuresContent } from './landingPageData';
import { ButtonState } from '../../../components/button/enum';

const LandingPage = () => {
  return (
    <div>
      <Hero />

      <section className="h-full flex w-full p-4 lg:p-24 flex-col gap-6">
        <article className="flex flex-col gap-4 self-stretch w-full h-auto items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-center font-sora text-xl text-gray-700 sm:text-2xl md:text-3xl lg:text-xl-heading leading-tight font-bold">
              Unleash the Power of Intuitive <br /> System Management.
            </h2>

            <h2 className="text-center font-inter text-sm text-gray-500 sm:text-base md:text-lg lg:text-xl p-4 lg:w-4/6">
              Our solution includes reporting and analytics tools that provide insights into user engagement, completion rates,
              assessment scores, and other metrics. These can be used to evaluate the effectiveness of training programs.
            </h2>
          </div>
        </article>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
          {featuresContent.map((feature) => (
            <div
              style={{
                background: `linear-gradient(1deg, #020001 0.74%, rgba(2, 0, 1, 0.00) 98.73%), url(${feature.background}) lightgray 50% / cover no-repeat`,
              }}
              className="border-b-red-550 hover:border-none border-b-8 rounded-t-xl"
              key={feature.title}
            >
              <Card>
                <div
                  className={`absolute bg-transparent -bottom-36 p-8 sm:-bottom-24 w-full sm:p-10 flex flex-col group-hover:bottom-2 group-hover:duration-600 duration-500 gap-2 transition-all ease-out`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-white-400 font-extrabold text-lg md:text-2xl lg:text-l-headline">{feature.title}</span>
                    <img className="group-hover:invisible" src={featuresArrow} alt="arrow" />
                  </div>
                  <p className="text-slate-100 text-sm -my-0">{feature.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <ListComponent
        bg={'bg-black'}
        flexDirection={'flex-row'}
        src={lastImg}
        headerText={'Empower your business with a victorious digital advantage.'}
        listItems={listContent}
        headerTextColor={'text-white'}
        isButton={true}
        listTextColor={'text-white'}
        variant={ButtonState.HOME}
      />
    </div>
  );
};

export default LandingPage;
