import Hero from '../../../components/heroSection/Hero';
import ListComponent from '../../../components/listComponent/ListComponent';
import imgOne from '../../../assets/images/benefitsImgOne.png';
import imgTwo from '../../../assets/images/benefitsImgTwo.png';
import { listContent, listContentTwo } from './orgData';
import { ButtonState } from '../../../components/button/enum';

const OrganizationBenefits = () => {
  return (
    <div>
      <Hero mainText={`Leveraging Seamless Employee\nTraining Adherence`} isButton={true} sectionSize={'h-screen'} />

      <section>
        <ListComponent
          headerText={'Maximising Compliance in Organisations.'}
          src={imgOne}
          flexDirection={'flex-row'}
          listItems={listContent}
          headerTextColor={'text-gray-600'}
          listTextColor={'text-gray-600'}
        />
      </section>

      <section>
        <ListComponent
          headerText={'Empower Organizations to Meet Training Mandates with Ease'}
          src={imgTwo}
          flexDirection={'flex-row-reverse'}
          listItems={listContentTwo}
          isButton={true}
          variant={ButtonState.LIST}
          headerTextColor={'text-gray-600'}
          listTextColor={'text-gray-600'}
        />
      </section>
    </div>
  );
};

export default OrganizationBenefits;
