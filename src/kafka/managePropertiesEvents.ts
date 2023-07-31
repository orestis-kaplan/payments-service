import { KafkaMessage } from "kafkajs";
import { KafkaMessageKeys } from "~/types/kafka/messageKeys";
import PaymentsService from "~/services/payments.service";
import { IPayment } from "~/types/models/payment";
import { ServerError } from "~/middlewares/error.middleware";

export const managePaymentsEvents = async (message: KafkaMessage) => {
  const key = message.key?.toString();
  const value = message.value?.toString();

  if (!key || !value) {
    throw new Error("Invalid message");
  }

  const paymentBody: IPayment | undefined = JSON.parse(value);

  if (!paymentBody) {
    throw new ServerError("Payment message value is not valid", 500);
  }

  switch (key) {
    default:
      break;
  }
};
