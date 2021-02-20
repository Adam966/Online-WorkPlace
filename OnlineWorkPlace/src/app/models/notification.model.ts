export interface NotificationModel {
  id: number;
  type: NotificationType;
  description: string;
  creationTime: Date;
}

enum NotificationType {
  GENERAL_INFO
}

