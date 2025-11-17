"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Task } from "@/types";
import { taskService } from "@/services/taskService";
import { useAuthStore } from "@/store/authStore";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";

export default function DashboardPage() {
    const router = useRouter();
    const { user } = useAuthStore();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [filter, setFilter] = useState<string>("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
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
    }, [filter, search, page]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const params: any = { page, limit: 12 };
            if (filter) params.status = filter;
            if (search) params.search = search;

            const response = await taskService.getTasks(params);
            // service returns response.data (TasksResponse) so we follow your pattern:
            setTasks(response.data.tasks);
            setTotalPages(response.data.pagination.totalPages);

            // Stats: call once more without filters for counts
            const allTasksResponse = await taskService.getTasks({});
            const allTasks = allTasksResponse.data.tasks || [];
            setStats({
                pending: allTasks.filter((t) => t.status === "PENDING").length,
                inProgress: allTasks.filter((t) => t.status === "IN_PROGRESS").length,
                completed: allTasks.filter((t) => t.status === "COMPLETED").length,
            });
        } catch (error: any) {
            toast.error("Failed to fetch tasks");
            if (error.response?.status === 401) {
                router.push("/login");
            }
        } finally {
            setLoading(false);
        }
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

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                            <div>
                                <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide mb-2">
                                    Task Management System
                                </p>
                                <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
                                <p className="text-blue-100 text-lg">
                                    Welcome back, {user?.name || user?.email || "there"}! 👋
                                </p>
                            </div>
                            <button
                                onClick={handleCreateTask}
                                className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg flex items-center gap-2 transform hover:scale-105"
                            >
                                <span className="text-2xl">+</span>
                                Create Task
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-100 text-sm font-medium mb-1">
                                            To Do
                                        </p>
                                        <p className="text-4xl font-bold">{stats.pending}</p>
                                    </div>
                                    <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                        <span className="text-3xl">📋</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-100 text-sm font-medium mb-1">
                                            In Progress
                                        </p>
                                        <p className="text-4xl font-bold">{stats.inProgress}</p>
                                    </div>
                                    <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                        <span className="text-3xl">🚀</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-100 text-sm font-medium mb-1">
                                            Completed
                                        </p>
                                        <p className="text-4xl font-bold">{stats.completed}</p>
                                    </div>
                                    <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                        <span className="text-3xl">✅</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="🔍 Search tasks by title or description..."
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setPage(1);
                                        }}
                                        className="w-full px-6 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                                    />
                                </div>
                            </div>

                            {/* Filter Buttons */}
                            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                                <button
                                    onClick={() => {
                                        setFilter("");
                                        setPage(1);
                                    }}
                                    className={`px-5 py-3 rounded-xl font-semibold whitespace-nowrap transition ${filter === ""
                                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    All Tasks
                                </button>
                                <button
                                    onClick={() => {
                                        setFilter("PENDING");
                                        setPage(1);
                                    }}
                                    className={`px-5 py-3 rounded-xl font-semibold whitespace-nowrap transition ${filter === "PENDING"
                                            ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    📋 To Do
                                </button>
                                <button
                                    onClick={() => {
                                        setFilter("IN_PROGRESS");
                                        setPage(1);
                                    }}
                                    className={`px-5 py-3 rounded-xl font-semibold whitespace-nowrap transition ${filter === "IN_PROGRESS"
                                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    🚀 In Progress
                                </button>
                                <button
                                    onClick={() => {
                                        setFilter("COMPLETED");
                                        setPage(1);
                                    }}
                                    className={`px-5 py-3 rounded-xl font-semibold whitespace-nowrap transition ${filter === "COMPLETED"
                                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    ✅ Done
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tasks Section */}
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
                            <p className="text-gray-600 mt-6 text-lg font-medium">
                                Loading your tasks...
                            </p>
                        </div>
                    ) : tasks.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
                            <div className="text-8xl mb-6">📝</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                No tasks found
                            </h3>
                            <p className="text-gray-600 mb-8 text-lg">
                                {search || filter
                                    ? "Try adjusting your filters or search query"
                                    : "Create your first task to get started!"}
                            </p>
                            {!search && !filter && (
                                <button
                                    onClick={handleCreateTask}
                                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition shadow-lg"
                                >
                                    Create Your First Task
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {tasks.map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        onUpdate={fetchTasks}
                                        onEdit={handleEditTask}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center space-x-4 mt-10">
                                    <button
                                        onClick={() => setPage(page - 1)}
                                        disabled={page === 1}
                                        className="px-6 py-3 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-gray-700 transition shadow-sm"
                                    >
                                        ← Previous
                                    </button>
                                    <span className="text-gray-700 font-semibold text-lg">
                                        Page {page} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setPage(page + 1)}
                                        disabled={page === totalPages}
                                        className="px-6 py-3 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-gray-700 transition shadow-sm"
                                    >
                                        Next →
                                    </button>
                                </div>
                            )}
                        </>
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
