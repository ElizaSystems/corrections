'use client'

import { mockParolees } from '@/types/corrections';
import { ChatInterface } from '../chat/chat-interface';

export default function DashboardFeature() {
  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Department of Corrections Dashboard</h1>
        <p className="text-gray-600">Parole Management System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Parolees Overview</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Time Left</th>
                  <th>Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {mockParolees.map((parolee) => (
                  <tr key={parolee.id} className="hover">
                    <td>{parolee.id}</td>
                    <td>{parolee.name}</td>
                    <td>{parolee.timeLeft}</td>
                    <td>
                      <span className={`badge ${
                        parolee.riskLevel === 'High' ? 'badge-error' :
                        parolee.riskLevel === 'Medium' ? 'badge-warning' :
                        'badge-success'
                      }`}>
                        {parolee.riskLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">AI Assistant</h2>
          <ChatInterface />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat bg-base-200 rounded-lg">
            <div className="stat-title">Total Parolees</div>
            <div className="stat-value">{mockParolees.length}</div>
          </div>
          <div className="stat bg-base-200 rounded-lg">
            <div className="stat-title">High Risk Cases</div>
            <div className="stat-value">
              {mockParolees.filter(p => p.riskLevel === 'High').length}
            </div>
          </div>
          <div className="stat bg-base-200 rounded-lg">
            <div className="stat-title">Recent Check-ins</div>
            <div className="stat-value">
              {mockParolees.filter(p => 
                new Date(p.lastCheckIn) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              ).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
