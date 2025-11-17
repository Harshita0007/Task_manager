'use client';

import { Task } from '@/types';
import { taskService } from '@/services/taskService';
import toast from 'react-hot-toast';

interface TaskCardProps {
    task: Task;
    onUpdate: () => void;
    onEdit: (task: Task) => void;
}

export default function TaskCard({ task, onUpdate, onEdit }: TaskCardProps) {
    const statusConfig = {
        PENDING: {
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
            badge: 'bg-yellow-100 text-yellow-800',
            icon: '📋',
            label: 'To Do'
        },
        IN_PROGRESS: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            badge: 'bg-blue-100 text-blue-800',
            icon: '🚀',
            label: 'In Progress'
        },
        COMPLETED: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            badge: 'bg-green-100 text-green-800',
            icon: '✅',
            label: 'Done'
        },
    };

    const config = statusConfig[task.status];

    const handleToggle = async () => {
        try {
            await taskService.toggleTaskStatus(task.id);
            toast.success('Task status updated');
            onUpdate();
        } catch (error) {
            toast.error('Failed to update task');
        }
    };

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this task?')) {
            try {
                await taskService.deleteTask(task.id);
                toast.success('Task deleted successfully');
                onUpdate();
            } catch (error) {
                toast.error('Failed to delete task');
            }
        }
    };

    return (
        <div className={`bg-white rounded-lg border-2 ${config.border} hover:shadow-lg transition-all duration-200 overflow-hidden group`}>
            {/* Card Header */}
            <div className={`${config.bg} px-4 py-3 border-b ${config.border} flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                    <span className="text-xl">{config.icon}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.badge}`}>
                        {config.label}
                    </span>
                </div>
                <span className="text-xs text-gray-500 font-medium">
                    #{task.id.slice(0, 8)}
                </span>
            </div>

            {/* Card Body */}
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                    {task.title}
                </h3>

                {task.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {task.description}
                    </p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                        <span>📅</span>
                        <span>{new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span>🕐</span>
                        <span>{new Date(task.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={handleToggle}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-md hover:from-blue-700 hover:to-blue-800 transition text-sm font-medium shadow-sm"
                    >
                        ↻ Move
                    </button>
                    <button
                        onClick={() => onEdit(task)}
                        className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 transition text-sm font-medium"
                    >
                        ✏️ Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-50 text-red-600 px-3 py-2 rounded-md hover:bg-red-100 transition text-sm font-medium"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    );
}