import axios from 'axios';

const handler = async (req, res) => {
  try {
    const list = await axios.get('http://localhost:8081/subjects');
    res.status(200).json(list.data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ statusText: 'Internal Server Error' });
  }
};

export default handler;
