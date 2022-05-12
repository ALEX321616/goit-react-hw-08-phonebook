import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const UserApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['User', 'Contacts'],

  endpoints: builder => ({
    getUser: builder.query({
      query: () => '/users/current',
      providesTags: ['User'],
    }),

    getUserContacts: builder.query({
      query: () => '/contacts',
      providesTags: ['Contacts'],
    }),

    getAddContact: builder.mutation({
      query: AddContact => ({
        url: '/contacts',
        method: 'POST',
        body: AddContact,
      }),
      invalidatesTags: ['Contacts'],
    }),

    getDeleteContact: builder.mutation({
      query: ({ DeleteContact, contactId }) => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
        body: DeleteContact,
      }),
      invalidatesTags: ['Contacts'],
    }),

    getUpdateContact: builder.mutation({
      query: ({ UpdateContact, contactId }) => ({
        url: `/contacts/${contactId}`,
        method: 'PATCH',
        body: UpdateContact,
      }),
      invalidatesTags: ['Contacts'],
    }),

    getRegisterUser: builder.mutation({
      query: registerUser => ({
        url: '/users/signup',
        method: 'POST',
        body: registerUser,
      }),
      invalidatesTags: ['User'],
    }),

    getLogInUser: builder.mutation({
      query: LogInUser => ({
        url: '/users/login',
        method: 'POST',
        body: LogInUser,
      }),
      invalidatesTags: ['User'],
    }),

    getLogOutUser: builder.mutation({
      query: LogOut => ({
        url: '/users/logout',
        method: 'POST',
        body: LogOut,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetLogInUserMutation,
  useGetLogOutUserMutation,
  useGetUserContactsQuery,
  useGetAddContactMutation,
  useGetDeleteContactMutation,
  useGetUpdateContactMutation,
  useGetRegisterUserMutation,
} = UserApi;
