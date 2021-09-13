# O que precisa para iniciar a aplicação?

Ter o Zookeeper, Kafka e Schema-Registry rodando na sua maquina. Caso já estejam instalados (containers do docker), podem ser iniciados com os seguintes comandos:

```
sudo docker start zookeeper kafka schema-registry
```


# Como instalar as aplicações requeridas?


## Rede do Docker
```
sudo docker network create --subnet 172.16.0.0/24 kafka-net
```

---

## Containers

### Zookeeper
```
sudo docker run -d --network kafka-net --hostname zookeeper --name zookeeper -p 2181:2181 -e ZOOKEEPER_CLIENT_PORT=2181 -e ZOOKEEPER_TICK_TIME=2000 confluentinc/cp-zookeeper:5.5.1
```

### Kafka
```
sudo docker run -d --network kafka-net --hostname kafka --name kafka -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT='zookeeper:2181' -e KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092 -e KAFKA_BROKER_ID=1 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 -e CONFLUENT_METRICS_REPORTER_ZOOKEEPER_CONNECT=zookeeper:2181 -e CONFLUENT_SUPPORT_CUSTOMER_ID=c0 -e CONFLUENT_METRICS_REPORTER_TOPIC_REPLICAS=1 -e CONFLUENT_METRICS_ENABLE=true -e CONFLUENT_SUPPORT_CUSTOMER_ID='anonymous' confluentinc/cp-kafka:5.5.1
```

### Schema-registry
```
sudo docker run -d --network kafka-net --hostname schema-registry --name schema-registry -p 8081:8081 -e SCHEMA_REGISTRY_KAFKASTORE_CONNECTION_URL='zookeeper:2181' -e SCHEMA_REGISTRY_HOST_NAME=schema-registry confluentinc/cp-schema-registry:5.5.1
```

### MongoDB com replicaset
```
sudo docker run -d -p 27017:27017 -p 27020:27020 -p 27021:27021 --name mongo-rep -e "REPLICA_SET_NAME=mongo-rs" --restart=always minutrade/mongodb-replica-set:4.2
```

### Redis
```
sudo docker run -d --name redis6 -p 6379:6379 redis
```

---

## Kafkacat ############
```
sudo apt-get install kafkacat
```
