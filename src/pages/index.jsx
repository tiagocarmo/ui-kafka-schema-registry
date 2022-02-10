import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import FormNewTopic from '../components/FormNewTopic';
import ListTopics from '../components/ListTopics';
import FormNewSchema from '../components/FormNewSchema';
import ListSchemas from '../components/ListSchemas';

const Index = () => {
  const [topics, setTopics] = useState({
    list: [],
    count: 0
  });
  const [schemas, setSchemas] = useState({
    list: [],
    count: 0
  });
  const [page, setpage] = useState({
    topics: false,
    schema: false
  });
  const [reloadRequired, setReloadRequired] = useState(false);

  const handleUpdateTopic = async () => {
    try {
      const list = await axios.get('http://localhost:4000/api/kafka-list-topics');
      setTopics({
        list: list.data,
        count: list.data.length
      });
    } catch (e) {
      setReloadRequired(true);
      console.error(e);
      console.error('Não foi possível obter os tópicos do Kafka');
    }
  };

  const handleUpdateSchema = async () => {
    try {
      const list = await axios.get('http://localhost:4000/api/schema-registry-list');
      setSchemas({
        list: list.data,
        count: list.data.length
      });
    } catch (e) {
      setReloadRequired(true);
      console.error(e);
      console.error('Não foi possível obter os schemas');
    }
  };

  const handleShowTopics = () => {
    setpage({
      topics: true,
      schema: false
    });
  };

  const handleShowSchema = () => {
    setpage({
      topics: false,
      schema: true
    });
  };

  const handleHideAll = () => {
    setpage({
      topics: false,
      schema: false
    });
  };

  useEffect(() => {
    handleUpdateTopic();
    handleUpdateSchema();
  }, []);

  return (
    <>
      <Header
        topics={topics}
        schemas={schemas}
        onCallbackShowTopics={handleShowTopics}
        onCallbackShowSchema={handleShowSchema}
        onCallbackHideAll={handleHideAll}
      />
      {reloadRequired && (!page.topics && !page.schema) && (
        <div className='container'>
          <div className='row'>
            <p>Hey! Verifique se o <strong>zookeeper</strong>, <strong>kafka</strong> e <strong>schema-registry</strong> estão rodando.</p>
            <p>Você pode verificar usando o comando:</p>
            <pre>
              <code>sudo docker start zookeeper kafka schema-registry</code>
            </pre>
            <p>Caso um deles não esteja iniciado, você pode rodar eles com o comando:</p>
            <pre>
              <code>sudo docker start NOME_DO_SERVICO</code>
            </pre>
            <p>Se não tiverem instalado, leia o README.md e siga as instruções!</p>
          </div>
        </div>
      )}
      {!reloadRequired && page.topics && (
        <>
          <div className='container'>
            <div className='row'>
              <div className='col-sm'>
                <ListTopics
                  topics={topics}
                  onCallbackUpdateProps={handleUpdateTopic}
                />
              </div>
              <div className='col-sm'>
                <FormNewTopic onCallbackUpdateProps={handleUpdateTopic} />
              </div>
            </div>
          </div>
        </>
      )}
      {!reloadRequired && page.schema && (
        <>
          <div className='container'>
            <div className='row'>
              <div className='col-sm'>
                <ListSchemas
                  schemas={schemas}
                  onCallbackUpdateProps={handleUpdateSchema}
                />
              </div>
              <div className='col-sm'>
                <FormNewSchema
                  onCallbackUpdateProps={handleUpdateSchema}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {!reloadRequired && (!page.topics && !page.schema) && (
        <>
          <div className='container'>
            <div className='row'>
              <div className='col-sm'>
                <FormNewSchema
                  onCallbackUpdateProps={handleUpdateSchema}
                />
              </div>
              <div className='col-sm'>
                <FormNewTopic onCallbackUpdateProps={handleUpdateTopic} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Index;
