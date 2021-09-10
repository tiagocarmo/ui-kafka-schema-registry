const styles = {
  leftSpacing: {
    paddingLeft: '10px'
  },
  rightSpacing: {
    paddingRight: '10px'
  },
  bottomSpacing: {
    marginBottom: '40px'
  }
};

const Header = (props) => {
  return (
    <div className='container border-bottom' style={styles.bottomSpacing}>
      <header className='d-flex flex-wrap justify-content-center py-3 mb-4'>
        <div className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none'>
          <a
            href='#'
            onClick={() => props.onCallbackHideAll()}
            className='nav-link'
          >
            <img
              src='/schema-kafka.png'
              className='img-thumbnail'
              width='80'
            />
            <span
              className='fs-5'
              style={styles.leftSpacing}
            >
              UI - Kafka - Schema Registry
            </span>
          </a>
        </div>
        <ul className='nav nav-pills'>
          <li className='nav-item '>
            <a
              href='#'
              onClick={() => props.onCallbackShowTopics()}
              className='nav-link'
            >
              <span style={styles.rightSpacing}>Tópicos</span>
              <span className='badge bg-primary rounded-pill'>
                {props.topics?.count || 0}
              </span>
            </a>
          </li>
          <li className='nav-item'>
            <a
              href='#'
              onClick={() => props.onCallbackShowSchema()}
              className='nav-link'
            >
              <span style={styles.rightSpacing}>Schemas</span>
              <span className='badge bg-primary rounded-pill'>
                {props.schemas?.count || 0}
              </span>
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
