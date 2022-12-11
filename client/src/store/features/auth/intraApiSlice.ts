import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const INTRA_CLIENT_ID = 'u-s4t2ud-ca01e0a3b33eab9ff01d73db18b976e02e503b4790869d016eefcb585850a2ef';
const INTRA_CLIENT_SECRET = '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';

interface Breed {
  id: string;
  name: string;
  image: {
    url: string;
  };
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => headers,
  }),
  endpoints: (builder) => ({
    fetchBreeds: builder.query<Breed[], number | void>({
      query: (limit = 10) => `/breeds?limit=${limit}`,
    }),
  })
  ,
});

export const { useFetchBreedsQuery } = apiSlice;
