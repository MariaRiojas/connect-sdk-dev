import React, { useEffect, useState } from "react";
import { AgentClient } from "@amazon-connect/contact";
import { AmazonConnectApp } from "@amazon-connect/app";
import { AgentStateChangedEventData } from "@amazon-connect/contact";

const handler = async (data: AgentStateChangeEventData) => {
  console.log(data);
};

// Inicializa AmazonConnectApp solo una vez
const { provider } = AmazonConnectApp.init({
  onCreate: (event) => {
    const { appInstanceId } = event.context;
    console.log("App initialized: ", appInstanceId);
  },
  onDestroy: (event) => {
    console.log("App being destroyed");
  },
});

const AmazonConnectAgent = () => {
  const [agentInfo, setAgentInfo] = useState(null);

  useEffect(() => {
    const agentClient = new AgentClient();
    console.log(agentClient);

    const handleStateChange = (state) => {
      console.log("Cambio de estado del agente:", state);
    };
  
    try {
      agentClient.onStateChanged(handleStateChange);
    } catch (error) {
      console.error("Error al suscribirse al estado del agente:", error);
    }
  
    const fetchAgentInfo = async () => {
      try {
        const info = await agentClient.getAgentData();
        console.log("Información del agente:", info);
        setAgentInfo(info);
      } catch (error) {
        console.error("Error al obtener datos del agente:", error);
      }
    };
  
    fetchAgentInfo();
  
    return () => {
      try {
        agentClient.offStateChanged(handleStateChange);
      } catch (error) {
        console.error("Error al desuscribirse del estado del agente:", error);
      }
    };
  }, []);
  

  return (
    <div>
      <h1>Amazon Connect Agent</h1>
      {agentInfo ? (
        <div>
          <p>Nombre: {agentInfo.configuration.firstname}</p>
        </div>
      ) : (
        <p>Conectando al agente de Amazon Connect...</p>
      )}
    </div>
  );
};

export default AmazonConnectAgent;
