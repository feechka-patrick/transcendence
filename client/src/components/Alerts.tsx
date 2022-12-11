import React from 'react';

import { HiCheck, HiX } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { AlertItem, dismissMessage } from '../store/features/alertSlice';

const Alert = ({ message, uid, type }: AlertItem) => {
  const dispatch = useAppDispatch();

  const getIconNode = (className: string) => {
    switch (type) {
      case 'success':
        return <HiCheck className={className} />;
      case 'warning':
        return <HiCheck className={className} />;
      case 'error':
        return <HiCheck className={className} />;
      case 'info':
        return <HiCheck className={className} />;
      default:
        return <HiCheck className={className} />;
    }
  };

  const iconNode = getIconNode('w-6 h-6 mx-2');

  return (
    <div className="alert my-3 alert-success ">
      <div className="flex-1 mx-2">
        {iconNode}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>{message}</label>
      </div>
      <div className="flex-none">
        <button
          className="btn btn-sm btn-ghost btn-circle"
          onClick={() => dispatch(dismissMessage(uid!))}
          type="button"
        >
          <HiX className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

const Alerts = () => {
  const stack = useAppSelector((store) => store.alerts.stack);

  return (
    <div className="relative h-32 w-32">
      <div className="absolute bottom-0 right-3">
        {stack.map((i) => (
          <Alert
            key={i.uid}
            message={i.message}
            type={i.type}
            uid={i.uid}
            preventAutoDismiss={i.preventAutoDismiss}
          />
        ))}
      </div>
    </div>
  );
};

export default Alerts;
