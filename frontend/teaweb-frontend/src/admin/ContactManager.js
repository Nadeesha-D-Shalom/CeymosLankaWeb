import React, { useEffect, useState, useCallback } from "react";
import API_BASE from "../api";
import { Link } from "react-router-dom";

export default function ContactManager() {
  const [activeTab, setActiveTab] = useState("inbox");
  const [messages, setMessages] = useState([]);
  const [counts, setCounts] = useState({ inbox: 0, spam: 0, deleted: 0 });

  // LOAD MESSAGES
  const load = useCallback(async () => {
    try {
      const res = await fetch(
        `${API_BASE}/contact_manager/get_messages.php?status=${activeTab}`
      );

      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.log("Fetch error", err);
    }
  }, [activeTab]);

  // LOAD COUNTS
  const loadCounts = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/contact_manager/get_counts.php`);
      const data = await res.json();
      if (data.success) {
        setCounts(data.counts);
      }
    } catch (err) {
      console.log("Count error", err);
    }
  }, []);

  // AUTO REFRESH
  useEffect(() => {
    load();
    loadCounts();

    const interval = setInterval(() => {
      load();
      loadCounts();
    }, 3000);

    return () => clearInterval(interval);
  }, [load, loadCounts]);

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    await fetch(`${API_BASE}/contact_manager/update_status.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    load();
    loadCounts();
  };

  // DELETE FOREVER
  const deleteForever = async (id) => {
    await fetch(`${API_BASE}/contact_manager/delete_message.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    load();
    loadCounts();
  };

  return (
    <div className="w-full p-6">

      {/* BACK BUTTON */}
      <div className="mb-6">
        <Link
          to="/admin/dashboard"
          className="px-4 py-2 bg-gray-800 text-white rounded shadow hover:bg-black transition"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* TABS */}
      <div className="flex gap-3 mb-6">
        {["inbox", "spam", "deleted"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-5 py-2 rounded-lg font-medium border transition ${
              activeTab === t
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {t.toUpperCase()} ({counts[t]})
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* EMPTY */}
            {messages.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No messages found.
                </td>
              </tr>
            )}

            {/* LIST */}
            {messages.map((m) => (
              <tr
                key={m.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{m.full_name}</td>
                <td className="px-4 py-3">{m.email}</td>
                <td className="px-4 py-3">{m.subject}</td>
                <td className="px-4 py-3">
                  {new Date(m.created_at).toLocaleString()}
                </td>

                <td className="px-4 py-3 flex gap-2">
                  
                  {activeTab !== "spam" && (
                    <button
                      onClick={() => updateStatus(m.id, "spam")}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Mark Spam
                    </button>
                  )}

                  {activeTab === "spam" && (
                    <button
                      onClick={() => updateStatus(m.id, "inbox")}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Move Inbox
                    </button>
                  )}

                  {activeTab !== "deleted" && (
                    <button
                      onClick={() => updateStatus(m.id, "deleted")}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  )}

                  {activeTab === "deleted" && (
                    <button
                      onClick={() => deleteForever(m.id)}
                      className="px-3 py-1 bg-red-700 text-white rounded hover:bg-red-800"
                    >
                      Permanent Delete
                    </button>
                  )}

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
