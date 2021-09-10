import { useState } from 'react';
import axios from 'axios';

const styles = {
  bottomSpacing: {
    paddingBottom: '80px'
  }
};

const ListTopics = (props) => {
  const [loading, setLoading] = useState(false);

  const deleteTopic = async (item) => {
    setLoading(true);
    try {
      await axios.post(
        'http://localhost:3000/api/kafka-delete-topic',
        {
          name: item
        }
      );
      props.onCallbackUpdateProps();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className='my-3 p-3 bg-body rounded shadow-sm' style={styles.bottomSpacing}>
      <legend>Lista de Tópicos</legend>
      <ul className='list-group'>
        {props.topics?.list.map((item, key) => {
          return (
            <li
              key={key}
              className='list-group-item d-flex justify-content-between'
            >
              <span>{item}</span>
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => deleteTopic(item)}
                disabled={loading ? 'disabled' : ''}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-trash'
                  viewBox='0 0 16 16'
                >
                  <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'></path>
                  <path fillRule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'></path>
                </svg>
              </button>
            </li>
          );
        })}
        {!props.topics?.count && <li className='list-group-item'>Nenhum tópico cadastrado</li>}
      </ul>
    </div>
  );
};

export default ListTopics;
