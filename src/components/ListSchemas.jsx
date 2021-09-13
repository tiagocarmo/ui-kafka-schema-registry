import { useState, useEffect } from 'react';
import IconSvgView from '../components/IconSvgView';
import IconSvgTrash from '../components/IconSvgTrash';
import PreviewSchema from '../components/PreviewSchema';
import axios from 'axios';

const styles = {
  bottomSpacing: {
    paddingBottom: '40px'
  },
  rightSpacing: {
    marginRight: '10px'
  }
};

const ListSchemas = (props) => {
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState({
    subject: '',
    version: 0,
    id: 0,
    schemaType: 'JSON',
    schema: ''
  });

  const getSchema = async (name) => {
    if (name !== schema.subject) {
      setLoading(true);
      try {
        const getSchemaInfo = await axios.post(
          'http://localhost:3000/api/schema-registry-item',
          {
            name
          }
        );
        setSchema(getSchemaInfo.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  };

  const deleteSchema = async (item) => {
    setLoading(true);
    try {
      await axios.post(
        'http://localhost:3000/api/schema-registry-delete',
        {
          subject: item
        }
      );
      props.onCallbackUpdateProps();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setSchema({
      subject: '',
      version: 0,
      id: 0,
      schemaType: 'JSON',
      schema: ''
    });
  }, [props.schemas]);

  return (
    <div className='my-3 p-3 bg-body rounded shadow-sm' style={styles.bottomSpacing}>
      <legend>Lista de Schemas</legend>
      <ul className='list-group' style={styles.bottomSpacing}>
        {props.schemas?.list.map((item, key) => {
          return (
            <li
              key={key}
              className='list-group-item d-flex justify-content-between'
            >
              <span>{item}</span>
              <div>
                <button
                  type='button'
                  className='btn btn-primary'
                  data-bs-toggle='collapse'
                  data-bs-target={`#collapse-${item}`}
                  aria-expanded='false'
                  aria-controls={`collapse-${item}`}
                  onClick={() => getSchema(item)}
                  style={styles.rightSpacing}
                >
                  <IconSvgView />
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={() => deleteSchema(item)}
                  disabled={loading ? 'disabled' : ''}
                >
                  <IconSvgTrash />
                </button>
              </div>
            </li>
          );
        })}
        {!props.schemas?.count && <li className='list-group-item'>Nenhum schema cadastrado</li>}
      </ul>
      {!loading && schema.id !== 0 && <PreviewSchema schema={schema} />}
    </div>
  );
};

export default ListSchemas;
