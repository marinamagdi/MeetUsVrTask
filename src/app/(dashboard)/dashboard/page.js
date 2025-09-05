"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id, name } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(clearUser());
    router.push("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome, {name || "User"}!</h1>
        <p style={styles.info}>Your ID: <span style={styles.id}>{id || "-"}</span></p>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    fontFamily: "'ABeeZee', sans-serif",
  },
  card: {
    background: "#fff",
    padding: "2rem 3rem",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "400px",
  },
  title: {
    fontSize: "2rem",
    color: "#1A1A1E",
    marginBottom: "1rem",
  },
  info: {
    fontSize: "1rem",
    color: "#62626B",
    marginBottom: "2rem",
  },
  id: {
    fontWeight: "bold",
    color: "#9414FF",
  },
  logoutBtn: {
    backgroundColor: "#9414FF",
    color: "#fff",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "0.3s",
  },
};

export default Dashboard;
