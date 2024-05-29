import Hero from '../../../components/heroSection/Hero';
import ListComponent from '../../../components/listComponent/ListComponent';
import imgOne from '../../../assets/images/whyPageImgOne.png';
import imgTwo from '../../../assets/images/whyPageImgTwo.png';
import { listContent } from './whyData';
import { ButtonState } from '../../../components/button/enum';

const WhyPage = () => {
  return (
    <div>
      <Hero
        mainText={`Empowering Young Africans\nwith Essential Tech Skills for\nLucrative Careers`}
        isButton={true}
        sectionSize={'h-screen'}
      />

      <section>
        <ListComponent
          bg={'bg-white'}
          src={imgOne}
          flexDirection={'flex-row'}
          listItems={false}
          headerText={'iALMS Redefines Learning with Robust Features for All'}
          bodyTextOne={
            'iALMS is designed to be user-friendly and accessible to everyone, regardless of their technical expertise. We offer a wide range of features to support all aspects of the learning process, from course creation and delivery to assessment and reporting.'
          }
          bodyTextTwo={
            'We believe that everyone has the potential to learn and grow, and we are committed to providing the tools and resources that make it possible. We are constantly working to improve our LMS and develop new features that meet the needs of our customers. We are committed to providing a world-class learning experience that helps everyone reach their full potential.'
          }
          isButton={false}
        />
      </section>

      <section>
        <ListComponent
          bg={'bg-white'}
          src={imgTwo}
          headerText={`Excellence in Learning with\nCutting-Edge Goals.`}
          listItems={listContent}
          flexDirection={'flex-row-reverse'}
          isButton={true}
          variant={ButtonState.LIST}
          headerTextColor={'text-gray-600'}
          listTextColor={'text-gray-600'}
        />
      </section>
    </div>
  );
};

export default WhyPage;
