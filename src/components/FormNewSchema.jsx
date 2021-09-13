import { useState } from 'react';
import axios from 'axios';

const styles = {
  bottomSpacing: {
    paddingBottom: '20px'
  }
};

const FormNewSchema = (props) => {
  const [loading, setLoading] = useState(false);
  const [createdSR, setCreatedSR] = useState({});

  const createTopic = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const createRegistry = await axios.post(
        'http://localhost:3000/api/schema-registry-create',
        {
          subject: event.target.inputSchemaSubject.value,
          value: event.target.inputSchemaValue.value
        }
      );
      setCreatedSR(createRegistry.data);
      setTimeout(() => {
        setCreatedSR({});
      }, 3000);
      props.onCallbackUpdateProps();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className='my-3 p-3 bg-body rounded shadow-sm' style={styles.bottomSpacing}>
      <form onSubmit={createTopic}>
        <legend>Edição/Criação de Novo Schema</legend>
        {createdSR.id && (
          <div
            className='alert alert-warning alert-dismissible fade show'
            role='alert'
          >
            <strong>Uhuuu!</strong> Schema criado!
            <br />Id: <strong>{createdSR.id}</strong>
          </div>
        )}
        <div className='form-group' style={styles.bottomSpacing}>
          <label htmlFor='inputSchemaSubject'>Insira o subject (nome) do schema</label>
          <input
            type='text'
            className='form-control'
            id='inputSchemaSubject'
            name='inputSchemaSubject'
            aria-describedby='inputSchemaSubjectHelp'
            placeholder='Ex.: Mapped Requests'
          />
          <small
            id='inputSchemaSubjectHelp'
            className='form-text text-muted'
          >
            Antes de criar o schema, verifique se ele está dentro do padrão de Taxonomia.
          </small>
        </div>
        <div className='form-group' style={styles.bottomSpacing}>
          <label htmlFor='inputSchemaValue'>Insira o nome do tópico</label>
          <textarea
            className='form-control'
            id='inputSchemaValue'
            name='inputSchemaValue'
            rows='3'
          />
          <small
            id='inputSchemaValueHelp'
            className='form-text text-muted'
          >
            Aqui você coloca o JSON do schema.
          </small>
        </div>
        <button
          type='submit'
          className='btn btn-primary'
          disabled={loading ? 'disabled' : ''}
        >
          Editar/Criar novo schema
        </button>
      </form >
    </div >
  );
};

export default FormNewSchema;
