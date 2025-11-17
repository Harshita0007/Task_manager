"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Task } from "@/types";
import { taskService } from "@/services/taskService";
import { useAuthStore } from "@/store/authStore";
import Navbar from "@/components/Navbar";
import TaskForm from "@/components/TaskForm";

import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";

const STATUS_CONFIG: {
    id: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    title: string;
    color: string;
    badge: string;
}[] = [
        {
            id: "PENDING",
            title: "To Do",
            color: "from-yellow-400 to-yellow-500",
            badge: "bg-yellow-100 text-yellow-800",
        },
        {
            id: "IN_PROGRESS",
            title: "In Progress",
            color: "from-blue-400 to-blue-500",
            badge: "bg-blue-100 text-blue-800",
        },
        {
            id: "COMPLETED",
            title: "Done",
            color: "from-green-400 to-green-500",
            badge: "bg-green-100 text-green-800",
        },
    ];

export default function DashboardPage() {
    const router = useRouter();
    const { user } = useAuthStore();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [search, setSearch] = useState("");

    const [stats, setStats] = useState({
        pending: 0,
        inProgress: 0,
        completed: 0,
    });

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            router.push("/login");
        } else {
            fetchTasks();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);

            // ✅ no params – let backend use its own pagination defaults
            const apiResponse = await taskService.getTasks();
            const fetchedTasks = apiResponse.data.tasks;

            setTasks(fetchedTasks);
            setStats({
                pending: fetchedTasks.filter((t) => t.status === "PENDING").length,
                inProgress: fetchedTasks.filter((t) => t.status === "IN_PROGRESS")
                    .length,
                completed: fetchedTasks.filter((t) => t.status === "COMPLETED").length,
            });
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to fetch tasks");
            if (error.response?.status === 401) {
                router.push("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const filteredTasks = tasks.filter((task) =>
        (task.title + " " + (task.description || ""))
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const tasksByStatus: Record<"PENDING" | "IN_PROGRESS" | "COMPLETED", Task[]> =
    {
        PENDING: filteredTasks.filter((t) => t.status === "PENDING"),
        IN_PROGRESS: filteredTasks.filter((t) => t.status === "IN_PROGRESS"),
        COMPLETED: filteredTasks.filter((t) => t.status === "COMPLETED"),
    };

    const handleCreateTask = () => {
        setEditingTask(null);
        setShowForm(true);
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingTask(null);
        fetchTasks();
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingTask(null);
    };

    // DRAG & DROP
    const handleDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;

        const newStatus = destination.droppableId as
            | "PENDING"
            | "IN_PROGRESS"
            | "COMPLETED";

        const task = tasks.find((t) => t.id === draggableId);
        if (!task) return;
        if (task.status === newStatus) return;

        try {
            // optimistic UI update
            setTasks((prev) =>
                prev.map((t) =>
                    t.id === draggableId ? { ...t, status: newStatus } : t
                )
            );

            await taskService.updateTask(draggableId, { status: newStatus });
            toast.success("Task moved");
            fetchTasks();
        } catch (error) {
            toast.error("Failed to move task");
            fetchTasks();
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">
                {/* HEADER SECTION */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                            <div>
                                <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
                                <p className="text-blue-100 text-lg">
                                    Welcome back, {user?.name || user?.email || "User"}! 👋
                                </p>
                            </div>
                            <button
                                onClick={handleCreateTask}
                                className="mt-4 md:mt-0 bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg flex items-center gap-2 transform hover:scale-105"
                            >
                                <span className="text-2xl">+</span>
                                Create Task
                            </button>
                        </div>

                        {/* STATS CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard label="To Do" value={stats.pending} emoji="📋" bg="bg-blue-500/30" />
                            <StatCard
                                label="In Progress"
                                value={stats.inProgress}
                                emoji="🚀"
                                bg="bg-indigo-500/30"
                            />
                            <StatCard
                                label="Completed"
                                value={stats.completed}
                                emoji="✅"
                                bg="bg-green-500/30"
                            />
                        </div>
                    </div>
                </div>

                {/* SEARCH BAR */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="🔍 Search tasks by title or description..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full px-6 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                            />
                        </div>
                    </div>
                </div>

                {/* KANBAN BOARD */}
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600" />
                            <p className="text-gray-600 mt-6 text-lg font-medium">
                                Loading your tasks...
                            </p>
                        </div>
                    ) : (
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {STATUS_CONFIG.map((column) => (
                                    <Droppable key={column.id} droppableId={column.id}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className={`bg-gray-50 border border-gray-200 rounded-2xl p-4 min-h-[320px] flex flex-col transition ${snapshot.isDraggingOver
                                                        ? "bg-blue-50 border-blue-300"
                                                        : ""
                                                    }`}
                                            >
                                                {/* Column header */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <h2 className="font-semibold text-gray-800">
                                                            {column.title}
                                                        </h2>
                                                        <span
                                                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${column.badge}`}
                                                        >
                                                            {tasksByStatus[column.id].length} tasks
                                                        </span>
                                                    </div>
                                                    <div
                                                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${column.color} flex items-center justify-center text-xl text-white shadow-md`}
                                                    >
                                                        {column.id === "PENDING"
                                                            ? "📋"
                                                            : column.id === "IN_PROGRESS"
                                                                ? "🚀"
                                                                : "✅"}
                                                    </div>
                                                </div>

                                                {/* Tasks in the column */}
                                                <div className="space-y-3 flex-1">
                                                    {tasksByStatus[column.id].map((task, index) => (
                                                        <Draggable
                                                            key={task.id}
                                                            draggableId={task.id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className={`bg-white rounded-xl border shadow-sm p-4 cursor-grab active:cursor-grabbing transition ${snapshot.isDragging
                                                                            ? "ring-2 ring-blue-400 shadow-lg"
                                                                            : ""
                                                                        }`}
                                                                >
                                                                    <div className="flex justify-between items-center mb-2">
                                                                        <p className="text-sm font-semibold text-gray-800">
                                                                            {task.title}
                                                                        </p>
                                                                        <button
                                                                            onClick={() => handleEditTask(task)}
                                                                            className="text-xs text-blue-600 hover:underline"
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                    </div>
                                                                    {task.description && (
                                                                        <p className="text-xs text-gray-600 mb-3 line-clamp-3">
                                                                            {task.description}
                                                                        </p>
                                                                    )}
                                                                    <div className="flex items-center justify-between text-[11px] text-gray-500">
                                                                        <span>
                                                                            📅{" "}
                                                                            {new Date(
                                                                                task.createdAt
                                                                            ).toLocaleDateString("en-US", {
                                                                                month: "short",
                                                                                day: "numeric",
                                                                            })}
                                                                        </span>
                                                                        <span>
                                                                            🕓{" "}
                                                                            {new Date(
                                                                                task.updatedAt
                                                                            ).toLocaleTimeString("en-US", {
                                                                                hour: "2-digit",
                                                                                minute: "2-digit",
                                                                            })}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            </div>
                                        )}
                                    </Droppable>
                                ))}
                            </div>
                        </DragDropContext>
                    )}
                </div>
            </div>

            {/* Task Form Modal */}
            {showForm && (
                <TaskForm
                    task={editingTask}
                    onSuccess={handleFormSuccess}
                    onCancel={handleFormCancel}
                />
            )}
        </>
    );
}

function StatCard({
    label,
    value,
    emoji,
    bg,
}: {
    label: string;
    value: number;
    emoji: string;
    bg: string;
}) {
    return (
        <div
            className={`rounded-2xl px-6 py-5 border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-between ${bg}`}
        >
            <div>
                <p className="text-sm text-blue-100 mb-1">{label}</p>
                <p className="text-3xl font-bold">{value}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
                {emoji}
            </div>
        </div>
    );
}
