import Loader from '../components/loading/Loader';

function SuspenseContent() {
  return (
    // <div className="w-full h-screen grid place-items-center">
    //   <div className="loading loading-bars loading-lg"></div>
    // </div>
    <Loader className={'-mt-12'} size={'loading-lg'} type={'loading-bars'} />
  );
}

export default SuspenseContent;
