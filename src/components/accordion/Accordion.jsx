import { useState } from 'react';

const Accordion = ({ content }) => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleToggleAccordion = (id) => {
    setOpenAccordion((prevOpenAccordion) => (prevOpenAccordion === id ? null : id));
  };

  return (
    <div className="font-inter">
      {content.map((item) => (
        <div
          key={item.id}
          className={`collapse collapse-arrow border rounded-none ${
            openAccordion === item.id ? 'bg-base-200' : 'bg-opacity-0'
          } my-0 mx-auto w-5/6 ${item.id === content[0].id ? 'rounded-t-xl' : ''} ${
            item.id === content[content.length - 1].id ? 'rounded-b-xl' : ''
          }`}
        >
          <input
            type="radio"
            name="my-accordion-2"
            checked={openAccordion === item.id}
            onChange={() => handleToggleAccordion(item.id)}
          />
          <div
            className={`collapse-title text-md md:text-lg ${
              openAccordion === item.id ? 'text-gray-900' : 'text-gray-500'
            } font-semibold`}
          >
            {item.question}
          </div>
          <div className={`bg-white collapse-content ${openAccordion === item.id ? 'open' : ''}`}>
            <p className="p-1 text-gray-500">{item.response}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
