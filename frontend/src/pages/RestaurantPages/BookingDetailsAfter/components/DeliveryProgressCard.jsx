import React from 'react';

const STATUS_ORDER = ['PENDING', 'APPROVED', 'ASSIGNED', 'PICKED','DELIVERED'];

const TimelineStep = ({ title, subText, isActive, isLast }) => (
  <div className={`timeline-item ${isActive ? 'active' : ''} ${isLast ? 'last-item' : ''}`}>
    <p className={`font-extrabold ${isActive ? 'text-orange-600' : 'text-gray-400'}`}>
      {title}
    </p>
    <p className={`text-xs ${isActive ? 'text-gray-500' : 'text-gray-400'}`}>
      {subText}
    </p>
  </div>
);

const DeliveryProgressCard = ({ status }) => {
   const currentStatus=status
  const steps = [
    { key: 'PENDING', title: 'Pending', subText: 'Awaiting confirmation' },
    
    { key: 'APPROVED', title: 'Accepted', subText: 'Restaurant is preparing' },
    { key: 'ASSIGNED', title: 'Assigned', subText: 'Rider is on the way' },
    { key: 'PICKED', title: 'picked', subText: 'Rider is picked the order' },
    { key: 'DELIVERED', title: 'Delivered', subText: 'Enjoy your meal!' },
  ];

  const currentIndex = STATUS_ORDER.indexOf(currentStatus);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md">
      <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
        Order Status
      </h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <TimelineStep 
            key={step.key} 
            title={step.title}
            subText={step.subText}
            isActive={index <= currentIndex}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default DeliveryProgressCard;