import s from './Filter.module.css';

export default function Filter({ filter, handleChange }) {
  return (
    <>
      <label>
        Find contacts by name
        <input
          className={s.input}
          value={filter}
          type="text"
          onChange={handleChange}
        />
      </label>
    </>
  );
}
