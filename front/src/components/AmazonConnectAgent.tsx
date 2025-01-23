import React, { useEffect } from "react";
import { AgentClient } from "@amazon-connect/contact";
import { AgentStateChangedEventData } from "@amazon-connect/contact";

const AmazonConnectAgent = () => {
  useEffect(() => {
    const agentClient = new AgentClient();

    const handleStateChange = async (data: AgentStateChangedEventData) => {
      console.log("Estado del agente cambiado:", data);
    };

    // Suscribirse al cambio de estado del agente
    agentClient.onStateChanged(handleStateChange);

    return () => {
      // Cancelar la suscripción al desmontar el componente
      agentClient.offStateChanged(handleStateChange);
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
