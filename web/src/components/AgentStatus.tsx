'use client';

import { useState, useEffect } from 'react';

interface Agent {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'busy';
  capabilities: string[];
}

export default function AgentStatus() {
  const [agents, setAgents] = useState<Agent[]>([
    { id: 'credit-agent', name: 'Credit Agent', status: 'offline', capabilities: ['credit_scoring', 'risk_assessment'] },
    { id: 'fraud-agent', name: 'Fraud Agent', status: 'offline', capabilities: ['transaction_analysis', 'pattern_detection'] },
    { id: 'esg-agent', name: 'ESG Agent', status: 'offline', capabilities: ['environmental_impact', 'governance_assessment'] },
  ]);

  useEffect(() => {
    const fetchAgentStatus = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
        const response = await fetch(`${apiUrl}/agents`);
        
        if (response.ok) {
          const data = await response.json();
          const updatedAgents = Object.values(data).map((agent: any) => ({
            id: agent.id,
            name: agent.name,
            status: 'online' as const,
            capabilities: agent.capabilities || [],
          }));
          setAgents(updatedAgents);
        }
      } catch (error) {
        console.error('Failed to fetch agent status:', error);
      }
    };

    fetchAgentStatus();
    const interval = setInterval(fetchAgentStatus, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Agent Status
      </h2>
      
      <div className="space-y-3">
        {agents.map((agent) => (
          <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`} />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {agent.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {agent.capabilities.slice(0, 2).join(', ')}
                </p>
              </div>
            </div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
              {agent.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
