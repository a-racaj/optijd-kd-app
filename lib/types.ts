// Dit bestand definieert de types voor mijn OpTijd app.
// Het bevat het Priority type, dat de prioriteit van een taak kan zijn: 'low', 'medium', of 'high'.
// Het Task interface beschrijft de structuur van een taak, inclusief id, titel, voltooiingsstatus, prioriteit, tags, deadline, en aanmaakdatum.

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