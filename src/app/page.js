"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "../utils/supabaseClient";

export default function HomePage() {
  const [companies, setCompanies] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // إضافة Eruda للتشخيص
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/eruda';
    script.async = true;
    script.onload = () => eruda.init();
    document.body.appendChild(script);

    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data: comp } = await supabase.from("profiles").select("*").eq("user_type", "company").eq("is_profile_complete", true);
      const { data: work } = await supabase.from("profiles").select("*").eq("user_type", "worker").eq("is_profile_complete", true);
      const { data: cli } = await supabase.from("profiles").select("*").eq("user_type", "client").eq("is_profile_complete", true);

      setCompanies(comp || []);
      setWorkers(work || []);
      setClients(cli || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // تعريف الأنماط داخل المكون لضمان الأمان
  const styles = {
    card: { minWidth: "120px", padding: "20px", background: "#f5f5f5", borderRadius: "12px", textAlign: "center", fontWeight: "600", textDecoration: "none", color: "#000" },
    serviceCard: { minWidth: "140px", padding: "20px", background: "#fff", borderRadius: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", textAlign: "center", fontWeight: "600" },
    adCard: { minWidth: "180px", padding: "20px", background: "#1e2a2f", color: "#fff", borderRadius: "15px", textAlign: "center", fontWeight: "700" },
    listItem: { padding: "15px", background: "#fff", borderRadius: "10px", marginBottom: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }
  };

  return (
    <div>
      <section style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "800" }}>SENDIO PLATFORM</h1>
        <p style={{ fontSize: "1.1rem", marginTop: "10px" }}>A unified platform connecting companies, workers, and clients.</p>
      </section>

      <section style={{ display: "flex", gap: "15px", padding: "20px", overflowX: "auto" }}>
        <Link href="/client-dashboard" style={styles.card}>Client</Link>
        <Link href="/worker-dashboard" style={styles.card}>Worker</Link>
        <Link href="/company-dashboard" style={styles.card}>Companies</Link>
      </section>

      <section style={{ padding: "20px" }}>
        <h2>Popular Services</h2>
        <div style={{ display: "flex", gap: "15px", overflowX: "auto" }}>
          <div style={styles.serviceCard}>🚚 Delivery</div>
          <div style={styles.serviceCard}>🧹 Cleaning</div>
        </div>
      </section>

      <section style={{ padding: "20px" }}>
        <h2>Verified Companies</h2>
        {companies.map((c) => (
          <div key={c.id} style={styles.listItem}>
            <strong>{c.full_name}</strong>
          </div>
        ))}
      </section>
    </div>
  );
}
