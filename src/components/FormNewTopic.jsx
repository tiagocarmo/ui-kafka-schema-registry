import { useState } from 'react';
import axios from 'axios';

const styles = {
  bottomSpacing: {
    paddingBottom: '20px'
  }
};

const FormNewTopic = (props) => {
  const [loading, setLoading] = useState(false);

  const createTopic = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        'http://localhost:3000/api/kafka-create-topic',
        {
          name: event.target.inputTopicName.value
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
      <form onSubmit={createTopic}>
        <legend>Criação de Novo Tópico</legend>
        <div className='form-group' style={styles.bottomSpacing}>
          <label htmlFor='inputTopicName'>Insira o nome do tópico</label>
          <input
            type='text'
            className='form-control'
            id='inputTopicName'
            name='inputTopicName'
            aria-describedby='inputTopicNameHelp'
            placeholder='Ex.: event-streaming.business.mapped-requests'
          />
          <small
            id='inputTopicNameHelp'
            className='form-text text-muted'
          >
            Antes de criar o tópico, verifique se ele está dentro do padrão de Taxonomia.
          </small>
        </div>
        <button
          type='submit'
          className='btn btn-primary'
          disabled={loading ? 'disabled' : ''}
        >
          Criar novo tópico no Kafka
        </button>
      </form>
    </div>
  );
};

export default FormNewTopic;
