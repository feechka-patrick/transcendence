import React, { FC } from 'react';
import { useQuery } from '../hooks';

// TODO:: with the code retrieve
const Intra:FC = () => {
  const query = useQuery();
  const code = query.get('code');

  return <div>{code}</div>;
};

export default Intra;
