export interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'action' | 'notify';
  metadata: {
    journeyId?: string;
    vehicleDriverId?: string;
  };
  isRead: boolean;
  createdAt: string;
}
