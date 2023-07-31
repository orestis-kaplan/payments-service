import { Kafka, Message } from "kafkajs";
import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";
import fs from "fs";
import PaymentsService from "~/services/payments.service";
import { AvailableTopics } from "~/types/kafka/topics";

const key = fs.readFileSync(
  `${process.env.KAFKA_CERTIFICATES_PATH}/ca.key`,
  "utf-8"
); //ca.key

const cert = fs.readFileSync(
  `${process.env.KAFKA_CERTIFICATES_PATH}/ca.crt`,
  "utf-8"
); //ca.cert

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [process.env.KAFKA_BROKER_1_HOST, process.env.KAFKA_BROKER_2_HOST],
  connectionTimeout: 3000, // Increase the connection timeout to 3 seconds
  ssl: {
    rejectUnauthorized: false,
    key: key,
    cert: cert,
  },
  sasl: {
    mechanism: "plain", // scram-sha-256 or scram-sha-512
    username: process.env.KAFKA_CLIENT_USER,
    password: process.env.KAFKA_CLIENT_PASSWORD,
  },
});

// const schemaRegistry = new SchemaRegistry({
//   host: process.env.KAFKA_SCHEMA_REGISTRY_HOST,
// });

const admin = kafka.admin();
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "payments-service-group" });

class KafkaService {
  static sendMessage = async (topics: AvailableTopics[], message: Message) => {
    await producer.connect();
    // const registryId = await schemaRegistry.getRegistryId("users_scema", 1);
    // const schema = await schemaRegistry.getSchema(registryId);
    // console.log(schema);
    // const serializedMessage = await schemaRegistry.encode(registryId, message);
    for (const topic of topics) {
      await producer.send({
        topic,
        messages: [message],
      });
    }

    await producer.disconnect();
    console.log("Message sent successfully!");
  };

  static consume = async () => {
    await consumer.connect();

    await consumer.subscribe({
      topic: AvailableTopics.CUSTOMERS,
      fromBeginning: false,
    });
    await consumer.subscribe({
      topic: AvailableTopics.PROPERTIES,
      fromBeginning: false,
    });

    const customersTopicOffsets = await admin.fetchTopicOffsets(
      AvailableTopics.CUSTOMERS
    );
    const customersTopicCurrentOffset = customersTopicOffsets[0].offset;

    const propertiesTopicOffsets = await admin.fetchTopicOffsets(
      AvailableTopics.CUSTOMERS
    );
    const propertiesTopicCurrentOffset = propertiesTopicOffsets[0].offset;

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        // const decodedKey = await schemaRegistry.decode(message.key);
        // const decodedValue = await schemaRegistry.decode(message.value);
        switch (topic) {
          case AvailableTopics.CUSTOMERS:
            break;
          case AvailableTopics.PROPERTIES:
          default:
            break;
        }
      },
    });

    await consumer.seek({
      topic: AvailableTopics.CUSTOMERS,
      partition: 0,
      offset: customersTopicCurrentOffset,
    });

    await consumer.seek({
      topic: AvailableTopics.PROPERTIES,
      partition: 0,
      offset: propertiesTopicCurrentOffset,
    });
  };
}

export { kafka, admin, producer, consumer, KafkaService };
