import s from './ContactItem.module.css';
import { useGetDeleteContactMutation } from 'ApiService/UserApi';

export default function ContactItem({ props }) {
  const { name, id, number } = props;
  const [getDeleteContact] = useGetDeleteContactMutation();

  const deleteContact = async contactId => {
    await getDeleteContact({ contactId });
  };
  return (
    <>
      <li>
        {name} : {number}
        <button
          className={s.buttonList}
          type="button"
          onClick={() => deleteContact(id)}
        >
          Delete
        </button>
      </li>
    </>
  );
}
