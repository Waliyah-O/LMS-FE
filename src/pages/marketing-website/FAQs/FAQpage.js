import Accordion from '../../../components/accordion/Accordion';
import Hero from '../../../components/heroSection/Hero';
import SpotlightProduct from '../../../components/spotlightProduct/SpotlightProduct';
import { faqs } from './faqData';

const FAQpage = () => {
  return (
    <div>
      <Hero mainText={`Frequently Asked\nQuestions`} />
      <section className="flex flex-col items-start justify-evenly gap-10 h-full">
        <h1 className="font-inter font-extrabold text-lg md:text-lg-heading w-5/6 mx-auto pt-8">
          Got Questions? Check Out Our FAQs
        </h1>
        <div className="divider w-5/6 m-auto"></div>
        <Accordion content={faqs} />
        <div></div>
      </section>

      <SpotlightProduct />
    </div>
  );
};

export default FAQpage;
