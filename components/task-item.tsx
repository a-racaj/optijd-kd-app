'use client';

import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { TaskDialog } from './task-dialog';
import { useEffect, useState } from 'react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const priorityColors = {
    low: 'bg-green-500/10 text-green-500',
    medium: 'bg-yellow-500/10 text-yellow-500',
    high: 'bg-red-500/10 text-red-500',
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={cn(
      'flex items-center space-x-4 rounded-lg border p-4',
      task.completed && 'bg-muted/50'
    )}>
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
      />
      <div className="flex-1 space-y-1">
        <div className="flex items-center space-x-2">
          <p className={cn(
            'font-medium',
            task.completed && 'line-through text-muted-foreground'
          )}>
            {task.title}
          </p>
          <Badge variant="outline" className={priorityColors[task.priority]}>
            {task.priority}
          </Badge>
        </div>
        {task.deadline && (
          <p className="text-sm text-muted-foreground">
            Deadline: {format(new Date(task.deadline), 'PPP', { locale: nl })}
          </p>
        )}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div className="flex space-x-2">
        <TaskDialog task={task} onEditTask={onEdit} onAddTask={() => {}} />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Verwijder taak</span>
        </Button>
      </div>
    </div>
  );
}