import { useState } from 'react';
import Filter from 'components/Filter';
import { ContactForm } from 'components/Form/ContactForm/ContactForm';
import { useGetUserQuery, useGetUserContactsQuery } from 'ApiService/UserApi';

import ContactItem from 'components/ContactItem';

export default function ContactsPage() {
  const [filter, setFilter] = useState('');
  const { data: user } = useGetUserQuery();
  const { data } = useGetUserContactsQuery(user, {
    selectFromResult: ({ data }) => ({
      data: data?.filter(contact => {
        return contact?.name
          ?.toLowerCase()
          .trim()
          .includes(filter.toLowerCase().trim());
      }),
    }),
  });
  return (
    <>
      <h1>Contacts</h1>
      <div>
        {
          <Filter
            filter={filter}
            handleChange={e => setFilter(e.currentTarget.value)}
          />
        }
      </div>
      <ContactForm />

      <ul>
        {data?.map(el => (
          <ContactItem key={el.id} props={el} />
        ))}
      </ul>
    </>
  );
}
