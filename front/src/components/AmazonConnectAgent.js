import React, { useEffect } from "react";
import { AgentClient } from "@amazon-connect/contact";
import { AgentStateChangedEventData } from "@amazon-connect/contact";

const AmazonConnectAgent = () => {
  // Instanciar el cliente del agente
  const agentClient = new AgentClient();

  // Callback para manejar el cambio de estado del agente
  const handleStateChange = async (data: AgentStateChangedEventData) => {
    console.log("Estado del agente cambiado:", data);
  };

  // Obtener el ARN del agente
  const getAgentArn = async () => {
    try {
      const arn = await agentClient.getARN();
      console.log(`ARN del agente: ${arn}`);
    } catch (error) {
      console.error("Error obteniendo el ARN del agente:", error);
    }
  };

  useEffect(() => {
    // Suscribirse al evento de cambio de estado del agente
    agentClient.onStateChanged(handleStateChange);

    // Obtener el ARN al montar el componente
    getAgentArn();

    // Cleanup al desmontar el componente
    return () => {
      agentClient.offStateChanged(handleStateChange); // Remover el listener
    };
  }, []);

  return (
    <div>
      <h1>Amazon Connect Agent</h1>
      <p>Monitorizando el estado del agente...</p>
    </div>
  );
};

export default AmazonConnectAgent;
