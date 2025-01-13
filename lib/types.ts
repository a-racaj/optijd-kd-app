export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  tags: string[];
  deadline?: string;
  createdAt: string;
}