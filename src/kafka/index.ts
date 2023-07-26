import { Kafka } from "kafkajs";
import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";
import fs from "fs";
import PaymentsService from "~/services/payments.service";
import { sendEmail } from "~/mailer";

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
const consumer = kafka.consumer({ groupId: "customers-service-group" });

interface KafkaMessage {
  key: string;
  value: object;
}
class KafkaService {
  static TOPIC = "customers";

  static sendMessage = async (message: KafkaMessage) => {
    await producer.connect();
    // const registryId = await schemaRegistry.getRegistryId("users_scema", 1);
    // const schema = await schemaRegistry.getSchema(registryId);
    // console.log(schema);
    // const serializedMessage = await schemaRegistry.encode(registryId, message);

    await producer.send({
      topic: "customers",
      messages: [{ key: "Files Uploaded", value: JSON.stringify(message) }],
    });
    await producer.disconnect();
    console.log("Message sent successfully!");
  };

  static consume = async () => {
    const offsets = await admin.fetchTopicOffsets(this.TOPIC);
    console.log(offsets);
    const currentOffset = offsets[0].offset;
    await consumer.connect();
    await consumer.subscribe({ topic: this.TOPIC, fromBeginning: false });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        // const decodedKey = await schemaRegistry.decode(message.key);
        // const decodedValue = await schemaRegistry.decode(message.value);
        console.log(
          "Message received!",
          message.key?.toString() === "PaymentCompleted",
          message.value?.toString()
        );
        if (message.key?.toString() === "PaymentCompleted") {
          try {
            console.log("sending");
            await sendEmail(
              "nstarakis@wiselord.gr",
              "Files Uploaded",
              "Files Uploaded"
            );
          } catch (error) {
            console.log(error);
          }
          //   const messageValue = message.value?.toString();
          //   if (messageValue) {
          //     console.log(JSON.parse(messageValue));
          //     const {
          //       value: { customerId, filesPath },
          //     } = JSON.parse(messageValue);
          //     console.log("Files, were updated!");
          //   }
        }
      },
    });
    await consumer.seek({
      topic: this.TOPIC,
      partition: 0,
      offset: currentOffset,
    });
  };
}

export { kafka, admin, producer, consumer, KafkaService };
