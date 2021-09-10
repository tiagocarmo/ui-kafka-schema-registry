const PreviewSchema = ({ schema }) => {
  return (
    <>
      <legend>Preview do Schema selecionado</legend>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{schema.subject}</h5>
          </div>
          <div className='modal-body'>
            <p>Latest ID: <strong>{schema.id}</strong></p>
            <p><code>{schema.schema}</code></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewSchema;
