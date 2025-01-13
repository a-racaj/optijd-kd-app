'use client';

import { useState, useEffect } from 'react';
import { TaskDialog } from '@/components/task-dialog';
import { TaskItem } from '@/components/task-item';
import { ThemeToggle } from '@/components/theme-toggle';
import { Task } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, ListTodo } from 'lucide-react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, mounted]);

  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const task: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [task, ...prev]);
    toast({
      title: 'Taak toegevoegd',
      description: `"${task.title}" is toegevoegd aan je lijst.`,
    });
  };

  const handleEditTask = (id: string, updatedTask: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updatedTask }
          : task
      )
    );
    toast({
      title: 'Taak bijgewerkt',
      description: 'De taak is succesvol bijgewerkt.',
    });
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast({
      title: 'Taak verwijderd',
      description: 'De taak is verwijderd uit je lijst.',
    });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed);
    return matchesSearch && matchesFilter;
  });

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ListTodo className="h-8 w-8" />
              <h1 className="text-3xl font-bold">OpTijd</h1>
            </div>
            <ThemeToggle />
          </div>
          <p className="mt-2 text-muted-foreground">
            Beheer je taken effectief en blijf productief
          </p>
        </header>

        <div className="space-y-6">
          <TaskDialog onAddTask={handleAddTask} />

          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <Input
              placeholder="Zoek taken..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:max-w-xs"
            />
            <Tabs
              value={filter}
              onValueChange={setFilter}
              className="w-full sm:w-auto"
            >
              <TabsList>
                <TabsTrigger value="all">Alle</TabsTrigger>
                <TabsTrigger value="active">Actief</TabsTrigger>
                <TabsTrigger value="completed">Voltooid</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <CheckCircle2 className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="font-semibold">Geen taken gevonden</h3>
                <p className="text-sm text-muted-foreground">
                  {search
                    ? 'Geen taken gevonden voor je zoekopdracht'
                    : 'Begin met het toevoegen van taken aan je lijst'}
                </p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}