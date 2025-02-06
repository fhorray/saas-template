"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { SelectUser } from "@/types/user";
import { UserWithRole } from "better-auth/plugins";
import {
  Edit2Icon,
  PlusIcon,
  Shield,
  Trash2Icon,
  UserCheckIcon,
  UserXIcon,
  UsersIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface UserTableProps {
  users: SelectUser[];
  onEdit: (user: SelectUser) => void;
  onDelete: (userId: string) => void;
}

const mockUsers: Partial<SelectUser>[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    banned: false,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    banned: false,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "superadmin",
    banned: false,
  },
];

export const runtime = "edge";

const UsersDetails = () => {
  const [users, setUsers] = useState<UserWithRole[] | undefined>([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await authClient.admin.listUsers({
        query: {
          limit: 10,
        },
      });

      setUsers(data.data?.users);
    };

    getUsers();
  }, []);

  const handleEdit = (user: SelectUser) => {
    console.log("Edit user:", user);
  };

  const handleDelete = (userId: string) => {
    // setUsers(users.filter((user) => user.id !== userId));
  };

  const stats = [
    {
      label: "Total Users",
      value: users?.length,
      icon: UsersIcon,
      color: "text-blue-500",
    },
    {
      label: "Active Users",
      value: users?.filter((user) => user.banned).length,
      icon: UserCheckIcon,
      color: "text-green-500",
    },
    {
      label: "Inactive Users",
      value: users?.filter((user) => user.banned).length,
      icon: UserXIcon,
      color: "text-red-500",
    },
    {
      label: "Admins",
      value: users?.filter((user) => user.role === "superadmin").length,
      icon: Shield,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <Button size="lg">
          <PlusIcon size={20} className="mr-2" />
          Add User
        </Button>
      </div>
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-xl bg-card p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className={cn("rounded-full p-3", "bg-secondary")}>
                  <Icon size={24} className={stat.color} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="relative overflow-hidden rounded-lg border bg-card">
        <table className="w-full caption-bottom text-sm">
          <thead className="border-b bg-card">
            <tr className="[&_th]:px-6 [&_th]:py-4 [&_th]:text-left [&_th]:font-medium">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {users?.map((user) => (
              <tr
                key={user.id}
                className="border-b transition-colors hover:bg-secondary/50 data-[state=selected]:bg-secondary"
              >
                <td className="px-6 py-4 font-medium">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    )}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      user.banned
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    )}
                  >
                    {user.banned}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <Button variant="secondary" size="sm" onClick={() => {}}>
                      <Edit2Icon size={16} className="mr-1" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => {}}>
                      <Trash2Icon size={16} className="mr-1" />
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersDetails;
