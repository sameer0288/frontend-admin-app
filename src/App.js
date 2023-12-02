import React, { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCancel } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingRow, setEditingRow] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  const rowsPerPage = 10;

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRowSelect = (userId) => {
    const isSelected = selectedRows.includes(userId);
    if (isSelected) {
      setSelectedRows(selectedRows.filter((id) => id !== userId));
    } else {
      setSelectedRows([...selectedRows, userId]);
    }
  };

  const handleEditInitiate = (userId) => {
    setEditingRow(userId);
    const userToEdit = users.find((user) => user.id === userId);
    setEditedName(userToEdit.name);
    setEditedRole(userToEdit.role);
    setEditedEmail(userToEdit.email);
  };

  const handleEditCancel = () => {
    setEditingRow(null);
    setEditedName("");
    setEditedRole("");
    setEditedEmail("");
  };

  const handleEditSave = () => {
    const updatedUsers = users.map((user) => {
      if (user.id === editingRow) {
        return {
          ...user,
          name: editedName,
          role: editedRole,
          email: editedEmail,
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setEditingRow(null);

    setEditedName("");
    setEditedRole("");
    setEditedEmail("");
  };

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setSelectedRows(selectedRows.filter((id) => id !== userId));
  };

  const handleDeleteSelected = () => {
    const updatedUsers = users.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setUsers(updatedUsers);
    setSelectedRows([]);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {" "}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="delete-selected" onClick={handleDeleteSelected}>
          <FontAwesomeIcon icon={faTrash} /> Delete Selected
        </button>
      </div>

      {/* Table with rows */}
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" onChange={() => {}} />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr
              key={user.id}
              className={selectedRows.includes(user.id) ? "selected" : ""}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => handleRowSelect(user.id)}
                />
              </td>
              <td>{user.id}</td>
              <td>
                {editingRow === user.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingRow === user.id ? (
                  <input
                    type="text"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingRow === user.id ? (
                  <input
                    type="text"
                    value={editedRole}
                    onChange={(e) => setEditedRole(e.target.value)}
                  />
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editingRow === user.id ? (
                  <>
                    <button onClick={handleEditSave}>
                      <FontAwesomeIcon icon={faEdit} /> Save
                    </button>
                    <button
                      style={{
                        marginLeft: "20px",
                      }}
                      onClick={handleEditCancel}
                    >
                      <FontAwesomeIcon
                        style={{
                          color: "#ff5555",
                        }}
                        icon={faCancel}
                      />{" "}
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditInitiate(user.id)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      style={{
                        color: "#ff5555",
                        marginLeft: "20px",
                      }}
                      onClick={() => handleDelete(user.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => handlePageChange(1)}>First</button>
        <button onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        <button onClick={() => handlePageChange(totalPages)}>Last</button>
      </div>
    </div>
  );
}

export default App;
