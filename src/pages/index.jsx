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

  const handleUpdateTopic = async () => {
    const list = await axios.get('http://localhost:3000/api/kafka-list-topics');
    setTopics({
      list: list.data,
      count: list.data.length
    });
  };

  const handleUpdateSchema = async () => {
    const list = await axios.get('http://localhost:3000/api/schema-registry-list');
    setSchemas({
      list: list.data,
      count: list.data.length
    });
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
      {page.topics && (
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
      {page.schema && (
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
      {(!page.topics && !page.schema) && (
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
