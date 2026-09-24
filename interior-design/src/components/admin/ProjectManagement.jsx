import React, { useState } from "react";
import "./styles/ProjectManagement.css";
const mockProjects = [
  {
    name: "Modern Living Room Redesign",
    client: "Sarah Johnson",
    designer: "Michael Chen",
    deadline: "Dec 15, 2023",
    budget: "$12,500",
    status: "In Progress",
  },
  {
    name: "Kitchen Renovation",
    client: "David Wilson",
    designer: "Emma Thompson",
    deadline: "Nov 30, 2023",
    budget: "$25,000",
    status: "In Progress",
  },
  {
    name: "Master Bedroom Redesign",
    client: "Robert Brown",
    designer: "Jennifer Lee",
    deadline: "Oct 25, 2023",
    budget: "$8,000",
    status: "Completed",
  },
  {
    name: "Home Office Setup",
    client: "Lisa Adams",
    designer: "Michael Chen",
    deadline: "Dec 31, 2023",
    budget: "$5,500",
    status: "Planning",
  },
];

const ProjectManagement = () => {
  const [selectedTab, setSelectedTab] = useState("All Projects");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = mockProjects.filter((project) => {
    const matchesTab =
      selectedTab === "All Projects" || project.status === selectedTab;
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Project Management</h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        {["All Projects", "In Progress", "Planning", "Completed"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              selectedTab === tab
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search projects..."
          className="border p-2 rounded w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-lg shadow border">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Project Name</th>
              <th className="text-left px-4 py-2">Client</th>
              <th className="text-left px-4 py-2">Designer</th>
              <th className="text-left px-4 py-2">Deadline</th>
              <th className="text-left px-4 py-2">Budget</th>
              <th className="text-left px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((proj, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{proj.name}</td>
                <td className="px-4 py-2">{proj.client}</td>
                <td className="px-4 py-2">{proj.designer}</td>
                <td className="px-4 py-2">{proj.deadline}</td>
                <td className="px-4 py-2">{proj.budget}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      proj.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : proj.status === "Planning"
                        ? "bg-yellow-100 text-yellow-800"
                        : proj.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : ""
                    }`}
                  >
                    {proj.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredProjects.length === 0 && (
              <tr>
                <td className="px-4 py-2" colSpan="6">
                  No matching projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectManagement;
