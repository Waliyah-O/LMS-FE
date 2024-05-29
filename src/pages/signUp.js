// import GettingStarted from '../components/Forms/Admin/GettingStarted';
import { TypeAnimation } from 'react-type-animation';
import organization from '../assets/svg/office.svg';
import teacher from '../assets/svg/teacher.svg';
import student from '../assets/svg/student.svg';
import TextImageLoader from '../components/textImageLoader';

const SignUp = () => {
  const items = [
    {
      text: 'an Organization',
      imageUrl: organization,
    },
    {
      text: 'a Tutor',
      imageUrl: teacher,
    },
    {
      text: 'a Student',
      imageUrl: student,
    },
  ];

  return (
    <div className="w-full max-h-64 flex flex-col justify-center items-start gap-2 my-8">
      <p className="text-md-headline text-gray-800 font-bold">Get Started as...</p>
      <div className="w-1/3">
        <TextImageLoader className={'w-full'} items={items} delay={3000} infinite={true} />
      </div>
      <TypeAnimation
        sequence={[' an Organization', 2100, ' a Tutor', 2000, ' a Student', 2000]}
        speed={50}
        deletionSpeed={150}
        repeat={Infinity}
        cursor={true}
        className="text-red-600 text-lg-heading font-medium"
      />
    </div>
  );
};

export default SignUp;
