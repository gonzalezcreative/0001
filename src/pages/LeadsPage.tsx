import React, { useState } from 'react';
import { LeadPreview } from '../components/LeadPreview';
import { Search, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Sample data for demonstration
const sampleLeads = [
  {
    id: '1',
    equipment: ['1', '3', '4'],
    startDate: '2024-03-20',
    duration: 'Daily',
    location: '123 Main St, Austin, TX 78701',
    budget: '<500',
    createdAt: new Date().toISOString(),
    status: 'open'
  },
  {
    id: '2',
    equipment: ['5', '7'],
    startDate: '2024-03-25',
    duration: 'Weekly',
    location: '456 Oak Ave, Dallas, TX 75201',
    budget: '1000-2500',
    createdAt: new Date().toISOString(),
    status: 'open'
  },
  {
    id: '3',
    equipment: ['2', '6', '8'],
    startDate: '2024-04-01',
    duration: 'Monthly',
    location: '789 Pine Rd, Houston, TX 77001',
    budget: '>10000',
    createdAt: new Date().toISOString(),
    status: 'claimed'
  },
] as const;

const purchasedLeads = [
  {
    id: '4',
    equipment: ['9', '10'],
    startDate: '2024-03-22',
    duration: 'Daily',
    location: '321 Elm St, Austin, TX 78702',
    budget: '500-1000',
    createdAt: new Date().toISOString(),
    status: 'claimed'
  },
  {
    id: '5',
    equipment: ['15', '34', '36'],
    startDate: '2024-04-05',
    duration: 'Weekly',
    location: '567 Maple Dr, Houston, TX 77003',
    budget: '2500-5000',
    createdAt: new Date().toISOString(),
    status: 'claimed'
  },
  {
    id: '6',
    equipment: ['42', '46', '47'],
    startDate: '2024-04-15',
    duration: 'Monthly',
    location: '890 Cedar Ln, Dallas, TX 75203',
    budget: '5000-10000',
    createdAt: new Date().toISOString(),
    status: 'claimed'
  },
  // Additional purchased leads
  {
    id: '7',
    equipment: ['21', '22', '23'],
    startDate: '2024-03-28',
    duration: 'Daily',
    location: '741 Birch Ave, Austin, TX 78704',
    budget: '500-1000',
    createdAt: new Date().toISOString(),
    status: 'claimed'
  },
  {
    id: '8',
    equipment: ['28', '29', '30'],
    startDate: '2024-04-10',
    duration: 'Weekly',
    location: '852 Willow St, Dallas, TX 75204',
    budget: '1000-2500',
    createdAt: new Date().toISOString(),
    status: 'claimed'
  },
  {
    id: '9',
    equipment: ['34', '35', '36', '37'],
    startDate: '2024-04-20',
    duration: 'Monthly',
    location: '963 Oak Ln, Houston, TX 77004',
    budget: '5000-10000',
    createdAt: new Date().toISOString(),
    status: 'claimed'
  }
] as const;

export const LeadsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'available' | 'purchased'>('available');

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('available')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'available'
                  ? 'bg-white text-purple-600'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Available Rental Requests
            </button>
            {user && (
              <button
                onClick={() => setActiveTab('purchased')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'purchased'
                    ? 'bg-white text-purple-600'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Purchased Requests
              </button>
            )}
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads..."
                className="w-full md:w-auto pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50">
              <Filter className="h-5 w-5" />
              Filter
            </button>
          </div>
        </div>
        
        {activeTab === 'available' ? (
          <LeadPreview leads={sampleLeads} />
        ) : (
          <LeadPreview leads={purchasedLeads} isPurchased />
        )}
      </div>
    </div>
  );
};