'use client';

interface ResponseDisplayProps {
  responses: any[];
}

export default function ResponseDisplay({ responses }: ResponseDisplayProps) {
  if (responses.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Responses
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No responses yet. Submit a request to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Responses
      </h2>
      
      <div className="space-y-6 max-h-[600px] overflow-y-auto">
        {responses.map((response, index) => (
          <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
            {response.error ? (
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <p className="text-red-600 dark:text-red-400 font-medium">
                  Error: {response.message}
                </p>
              </div>
            ) : (
              <>
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Request ID: {response.request_id}
                  </span>
                </div>
                
                {response.routing && (
                  <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">
                      Routing Decision
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      Agents: {response.routing.selected_agents.join(', ')}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-500 mt-1">
                      {response.routing.reasoning}
                    </p>
                  </div>
                )}
                
                {response.responses && Object.entries(response.responses).map(([agentId, agentResponse]: [string, any]) => (
                  <div key={agentId} className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {agentId}
                    </p>
                    {agentResponse.error ? (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        Error: {agentResponse.error}
                      </p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {agentResponse.response}
                        </p>
                        {agentResponse.processing_time_ms && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Processing time: {agentResponse.processing_time_ms.toFixed(0)}ms
                          </p>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
