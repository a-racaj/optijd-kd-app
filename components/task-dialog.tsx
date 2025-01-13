// Dit bestand bevat de TaskDialog component voor mijn OpTijd app.
// Het biedt een dialoogvenster waarmee gebruikers taken kunnen toevoegen of bewerken.
// Gebruikers kunnen een titel, prioriteit, deadline en tags voor een taak instellen.
// De component maakt gebruik van verschillende UI-elementen zoals knoppen, invoervelden en een kalender.
// Het zorgt ervoor dat de ingevoerde gegevens worden verwerkt en opgeslagen wanneer de gebruiker op 'Toevoegen' of 'Opslaan' klikt.

'use client';

import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Priority, Task } from '@/lib/types';

interface TaskDialogProps {
  task?: Task;
  onAddTask: (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
  onEditTask?: (id: string, task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
}

export function TaskDialog({ task, onAddTask, onEditTask }: TaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(task?.title ?? '');
  const [priority, setPriority] = useState<Priority>(task?.priority ?? 'medium');
  const [date, setDate] = useState<Date | undefined>(
    task?.deadline ? new Date(task.deadline) : undefined
  );
  const [tags, setTags] = useState(task?.tags?.join(', ') ?? '');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
      setDate(task.deadline ? new Date(task.deadline) : undefined);
      setTags(task.tags?.join(', ') ?? '');
    }
  }, [task]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    const taskData = {
      title: title.trim(),
      priority,
      deadline: date?.toISOString(),
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };

    if (task && onEditTask) {
      onEditTask(task.id, taskData);
    } else {
      onAddTask(taskData);
    }

    setTitle('');
    setPriority('medium');
    setDate(undefined);
    setTags('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {task ? (
          <Button variant="ghost" size="icon">
            <span className="sr-only">Bewerk taak</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </Button>
        ) : (
          <Button className="w-full" size="lg">
            <Plus className="mr-2 h-4 w-4" /> Nieuwe Taak
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task ? 'Taak Bewerken' : 'Nieuwe Taak Toevoegen'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="task">Wat moet er gedaan worden?</Label>
            <Input
              id="task"
              placeholder="Voer je taak in..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Prioriteit</Label>
            <RadioGroup
              value={priority}
              onValueChange={(value) => setPriority(value as Priority)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low">Laag</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high">Hoog</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label>Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP', { locale: nl }) : 'Selecteer een datum'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tags">Tags (gescheiden door komma's)</Label>
            <Input
              id="tags"
              placeholder="werk, project, urgent"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuleren
          </Button>
          <Button onClick={handleSubmit}>{task ? 'Opslaan' : 'Toevoegen'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}