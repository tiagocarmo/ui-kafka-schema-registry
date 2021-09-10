import axios from 'axios';

const handler = async (req, res) => {
  const list = await axios.get('http://localhost:8081/subjects');
  res.status(200).json(list.data);
};

export default handler;
