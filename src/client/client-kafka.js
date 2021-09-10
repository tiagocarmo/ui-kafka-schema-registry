import packageJson from '../../package.json';
import { Kafka } from 'kafkajs';

const clientKafka = () => new Kafka({
  clientId: packageJson.name,
  brokers: ['localhost:9092']
});

export default clientKafka;
