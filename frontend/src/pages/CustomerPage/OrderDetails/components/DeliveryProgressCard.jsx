import React from 'react';

const STATUS_ORDER = ['PENDING','PLACED', 'APPROVED', 'ASSIGNED', 'PICKED', 'DELIVERED'];

const TimelineStep = ({ title, subText, isActive, isLast, isCompleted }) => (
  <div className="relative pl-8 pb-8 last:pb-0">
    {!isLast && (
      <div 
        className={`absolute left-[11px] top-6 w-[2px] h-full ${
          isCompleted ? 'bg-orange-400' : 'bg-gray-200'
        }`} 
      />
    )}

    {/* The Circle Indicator */}
    <div className="absolute left-0 top-1">
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white ${
        isActive || isCompleted ? 'border-orange-500' : 'border-gray-300'
      }`}>
        {(isActive || isCompleted) && (
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
        )}
      </div>
    </div>

    {/* Text Content */}
    <div className="flex flex-col">
      <p className={`font-extrabold text-lg leading-none ${
        isActive || isCompleted ? 'text-orange-600' : 'text-gray-400'
      }`}>
        {title}
      </p>
      <p className={`text-sm mt-1 ${
        isActive || isCompleted ? 'text-gray-500' : 'text-gray-400'
      }`}>
        {subText}
      </p>
    </div>
  </div>
);

const DeliveryProgressCard = ({ status }) => {
  const currentStatus = status;
  const steps = [
    { key: 'PENDING', title: 'Pending', subText: 'Awaiting confirmation' },
    { key: 'PLACED', title: 'Placed', subText: 'ORDER PLACED' },
    { key: 'APPROVED', title: 'Accepted', subText: 'Restaurant is preparing' },
    { key: 'ASSIGNED', title: 'Assigned', subText: 'Rider is on the way' },
    { key: 'PICKED', title: 'Picked', subText: 'Rider Picked the order' },
    { key: 'DELIVERED', title: 'Delivered', subText: 'Enjoy your meal!' },
  ];

  const currentIndex = STATUS_ORDER.indexOf(currentStatus);

  return (
    <div className="bg-white p-8 rounded-xl shadow-strong max-w-md border border-gray-100">
      <h3 className="text-2xl font-bold text-slate-800 mb-8 border-b pb-4">
        Order Status
      </h3>

      {(currentStatus === 'REJECTED' || currentStatus === 'FAILED') && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg">
          <h3 className="text-xl font-extrabold text-red-600">
            Order Rejected
          </h3>

          <p className="text-sm text-red-500">
            Please contact support for more details.
          </p>
        </div>
      )}

      <div className="flex flex-col">
        {steps.map((step, index) => (
          <TimelineStep
            key={step.key}
            title={step.title}
            subText={step.subText}
            isActive={index === currentIndex}
            isCompleted={index < currentIndex}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default DeliveryProgressCard;