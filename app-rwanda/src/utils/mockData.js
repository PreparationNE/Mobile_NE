// Mock data for the Rwanda Commute app

export const transportOptions = [
  {
    id: '1',
    type: 'Bus',
    route: 'Nyabugogo - Remera',
    fare: '500 RWF',
    estimatedTime: '15 mins',
    stops: ['Nyabugogo', 'Kimironko', 'Remera'],
    schedule: 'Every 30 minutes',
    capacity: 45,
  },
  {
    id: '2',
    type: 'Moto',
    route: 'Nyabugogo - Kigali Heights',
    fare: '1000 RWF',
    estimatedTime: '10 mins',
    stops: ['Nyabugogo', 'Kigali Heights'],
    schedule: 'Available 24/7',
    capacity: 1,
  },
  {
    id: '3',
    type: 'Bus',
    route: 'Nyabugogo - Kicukiro',
    fare: '400 RWF',
    estimatedTime: '20 mins',
    stops: ['Nyabugogo', 'Kicukiro'],
    schedule: 'Every 45 minutes',
    capacity: 45,
  },
];

export const mockUser = {
  email: 'test@rwanda.com',
  password: '123456',
  name: 'Test User',
};

export const rideHistory = [
  {
    id: '1',
    route: 'Nyabugogo - Remera',
    date: '2024-03-20T10:30:00',
    fare: '500 RWF',
    status: 'completed',
  },
  {
    id: '2',
    route: 'Nyabugogo - Kigali Heights',
    date: '2024-03-19T15:45:00',
    fare: '1000 RWF',
    status: 'completed',
  },
];

export const emergencyTypes = [
  'Safety Concern',
  'Vehicle Issue',
  'Driver Behavior',
  'Route Problem',
  'Other',
];

export const mockTransportOptions = [
  {
    id: '1',
    type: 'Bus',
    route: 'Kigali - Huye',
    fare: 'RWF 2,500',
    estimatedTime: '2 hours',
    schedule: 'Every 30 minutes',
    stops: ['Nyabugogo', 'Muhanga', 'Huye']
  },
  {
    id: '2',
    type: 'Bus',
    route: 'Kigali - Musanze',
    fare: 'RWF 3,000',
    estimatedTime: '2.5 hours',
    schedule: 'Every 45 minutes',
    stops: ['Nyabugogo', 'Ruhengeri', 'Musanze']
  },
  {
    id: '3',
    type: 'Moto',
    route: 'Kigali - Kicukiro',
    fare: 'RWF 1,000',
    estimatedTime: '15 minutes',
    schedule: 'Available 24/7',
    stops: ['City Center', 'Kicukiro Center']
  },
  {
    id: '4',
    type: 'Moto',
    route: 'Kigali - Gasabo',
    fare: 'RWF 1,500',
    estimatedTime: '20 minutes',
    schedule: 'Available 24/7',
    stops: ['City Center', 'Gasabo District']
  }
]; 