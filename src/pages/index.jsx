import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import FormNewTopic from '../components/FormNewTopic';
import ListTopics from '../components/ListTopics';

const Index = () => {
  const [props, setProps] = useState({
    topics: {
      list: [],
      count: 0
    }
  });
  const [page, setpage] = useState({
    topics: false,
    schema: false
  });

  const handleUpdateProps = async () => {
    const list = await axios.get('http://localhost:3000/api/kafka-list-topics');
    setProps({
      ...props,
      topics: {
        list: list.data,
        count: list.data.length
      }
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
    handleUpdateProps();
  }, []);

  return (
    <>
      <Header
        {...props}
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
                  topics={props.topics}
                  onCallbackUpdateProps={handleUpdateProps}
                />
              </div>
              <div className='col-sm'>
                <FormNewTopic onCallbackUpdateProps={handleUpdateProps} />
              </div>
            </div>
          </div>
        </>
      )}
      {page.schema && (
        <>
          <p>Mostra componentes relacionados ao Schema Registry.</p>
        </>
      )}
    </>
  );
};

export default Index;
