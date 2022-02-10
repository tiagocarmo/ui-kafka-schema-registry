import { useState } from 'react';
import axios from 'axios';
import IconSvgTrash from '../components/IconSvgTrash';

const styles = {
  bottomSpacing: {
    paddingBottom: '80px'
  },
  listItem: {
    width: '100%'
  },
  action: {
    width: '110px',
    marginLeft: '10px',
    textAlign: 'right'
  }
};

const ListTopics = (props) => {
  const [loading, setLoading] = useState(false);

  const deleteTopic = async (item) => {
    setLoading(true);
    try {
      await axios.post(
        'http://localhost:4000/api/kafka-delete-topic',
        {
          name: item
        }
      );
      props.onCallbackUpdateProps();
    } catch (error) {
      console.error(error);
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
              style={styles.listItem}
            >
              <span>{item}</span>
              <div style={styles.action}>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={() => deleteTopic(item)}
                  disabled={loading ? 'disabled' : ''}
                  style={{ float: 'right' }}
                >
                  <IconSvgTrash />
                </button>
              </div>
            </li>
          );
        })}
        {!props.topics?.count && <li className='list-group-item'>Nenhum tópico cadastrado</li>}
      </ul>
    </div>
  );
};

export default ListTopics;
