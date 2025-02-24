'use client'

import { useState } from 'react';
import { mockParolees } from '@/types/corrections';
import { mockInmates } from '@/types/inmates';
import { mockMostWanted } from '@/types/most-wanted';
import { ChatInterface } from '../chat/chat-interface';

export default function DashboardFeature() {
  const [activeTab, setActiveTab] = useState<'parolees' | 'inmates' | 'most-wanted'>('parolees');
  const [sendQuery, setSendQuery] = useState<(text: string) => void>(() => () => {});

  const handleRowClick = (name: string) => {
    sendQuery(`Who is ${name}?`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Department of Corrections Dashboard</h1>
        <p className="text-gray-600"></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="tabs tabs-boxed mb-4">
            <a 
              className={`tab ${activeTab === 'parolees' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('parolees')}
            >
              Parolees
            </a>
            <a 
              className={`tab ${activeTab === 'inmates' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('inmates')}
            >
              Inmates
            </a>
            <a 
              className={`tab ${activeTab === 'most-wanted' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('most-wanted')}
            >
              Most Wanted
            </a>
          </div>

          {activeTab === 'most-wanted' ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">Most Wanted List</h2>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Last Seen</th>
                      <th>Danger Level</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockMostWanted.map((person) => (
                      <tr 
                        key={person.id} 
                        className="hover cursor-pointer" 
                        onClick={() => handleRowClick(person.name)}
                      >
                        <td>{person.id}</td>
                        <td>{person.name}</td>
                        <td>{person.lastSeen}</td>
                        <td>
                          <span className={`badge ${
                            person.dangerLevel === 'Extreme' ? 'badge-error' :
                            person.dangerLevel === 'High' ? 'badge-warning' :
                            'badge-info'
                          }`}>
                            {person.dangerLevel}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${
                            person.status === 'Active' ? 'badge-error' :
                            person.status === 'Captured' ? 'badge-success' :
                            'badge-ghost'
                          }`}>
                            {person.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : activeTab === 'parolees' ? (
            <>
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
                      <tr 
                        key={parolee.id} 
                        className="hover cursor-pointer" 
                        onClick={() => handleRowClick(parolee.name)}
                      >
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
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4">Inmates Overview</h2>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Time Served</th>
                      <th>Security Level</th>
                      <th>Behavior</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInmates.map((inmate) => (
                      <tr 
                        key={inmate.id} 
                        className="hover cursor-pointer" 
                        onClick={() => handleRowClick(inmate.name)}
                      >
                        <td>{inmate.id}</td>
                        <td>{inmate.name}</td>
                        <td>{inmate.timeServed}</td>
                        <td>
                          <span className={`badge ${
                            inmate.securityLevel === 'Maximum' ? 'badge-error' :
                            inmate.securityLevel === 'Medium' ? 'badge-warning' :
                            'badge-success'
                          }`}>
                            {inmate.securityLevel}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${
                            inmate.behavior === 'Poor' ? 'badge-error' :
                            inmate.behavior === 'Fair' ? 'badge-warning' :
                            'badge-success'
                          }`}>
                            {inmate.behavior}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        <div className="bg-base-200 rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Ask Eliza</h2>
          <ChatInterface 
            onInit={(sendQueryFn) => setSendQuery(() => sendQueryFn)} 
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeTab === 'most-wanted' ? (
            <>
              <div className="stat bg-base-200 rounded-lg">
                <div className="stat-title">Total Most Wanted</div>
                <div className="stat-value">{mockMostWanted.length}</div>
              </div>
              <div className="stat bg-base-200 rounded-lg">
                <div className="stat-title">Extreme Danger</div>
                <div className="stat-value">
                  {mockMostWanted.filter(p => p.dangerLevel === 'Extreme').length}
                </div>
              </div>
              <div className="stat bg-base-200 rounded-lg">
                <div className="stat-title">Active Cases</div>
                <div className="stat-value">
                  {mockMostWanted.filter(p => p.status === 'Active').length}
                </div>
              </div>
            </>
          ) : activeTab === 'parolees' ? (
            <>
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
            </>
          ) : (
            <>
              <div className="stat bg-base-200 rounded-lg">
                <div className="stat-title">Total Inmates</div>
                <div className="stat-value">{mockInmates.length}</div>
              </div>
              <div className="stat bg-base-200 rounded-lg">
                <div className="stat-title">Maximum Security</div>
                <div className="stat-value">
                  {mockInmates.filter(i => i.securityLevel === 'Maximum').length}
                </div>
              </div>
              <div className="stat bg-base-200 rounded-lg">
                <div className="stat-title">Recent Incidents</div>
                <div className="stat-value">
                  {mockInmates.filter(i => 
                    i.lastIncident && new Date(i.lastIncident) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                  ).length}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
