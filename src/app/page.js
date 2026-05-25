"use client";

import { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";

export default function HomePage() {
  const [companies, setCompanies] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: comp } = await supabase.from("profiles").select("*").eq("role", "company");
    const { data: work } = await supabase.from("profiles").select("*").eq("role", "worker");
    const { data: cli } = await supabase.from("profiles").select("*").eq("role", "client");

    setCompanies(comp || []);
    setWorkers(work || []);
    setClients(cli || []);
  }

  return (
    <div>

      {/* HERO SECTION */}
      <section style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "800" }}>SENDIO PLATFORM</h1>
        <p style={{ fontSize: "1.1rem", marginTop: "10px" }}>
          منصة شاملة تربط بين الشركات، العمال، والزبائن في مكان واحد.
        </p>
      </section>

      {/* MAIN CATEGORIES */}
      <section style={{ display: "flex", gap: "15px", padding: "20px", overflowX: "auto" }}>
        <a href="/client-dashboard" style={card}>الزبون</a>
        <a href="/worker-dashboard" style={card}>العامل</a>
        <a href="/company-dashboard" style={card}>الشركات</a>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "20px" }}>
        <h2>الخدمات</h2>

        <div style={{ display: "flex", gap: "15px", overflowX: "auto" }}>
          <div style={serviceCard}>🚚 التوصيل</div>
          <div style={serviceCard}>🧹 التنظيف</div>
          <div style={serviceCard}>🏗 البناء</div>
          <div style={serviceCard}>🚛 النقل</div>
          <div style={serviceCard}>🌿 الزراعة</div>
        </div>
      </section>

      {/* ADS SLIDER */}
      <section style={{ padding: "20px" }}>
        <h2>الإعلانات</h2>

        <div style={{ display: "flex", gap: "15px", overflowX: "auto" }}>
          <div style={adCard}>🔥 إعلان 1</div>
          <div style={adCard}>⭐ إعلان 2</div>
          <div style={adCard}>💼 إعلان 3</div>
          <div style={adCard}>🏆 إعلان 4</div>
        </div>
      </section>

      {/* COMPANIES */}
      <section style={{ padding: "20px" }}>
        <h2>الشركات الموثوقة</h2>

        {companies.map((c) => (
          <div key={c.id} style={listItem}>
            <strong>{c.full_name}</strong>
            <p>{c.category}</p>
          </div>
        ))}
      </section>

      {/* WORKERS */}
      <section style={{ padding: "20px" }}>
        <h2>أفضل العمال</h2>

        {workers.map((w) => (
          <div key={w.id} style={listItem}>
            <strong>{w.full_name}</strong>
            <p>{w.skill}</p>
          </div>
        ))}
      </section>

      {/* CLIENTS */}
      <section style={{ padding: "20px" }}>
        <h2>الزبائن</h2>

        {clients.map((cl) => (
          <div key={cl.id} style={listItem}>
            <strong>{cl.full_name}</strong>
            <p>{cl.email}</p>
          </div>
        ))}
      </section>

    </div>
  );
}

const card = {
  minWidth: "120px",
  padding: "20px",
  background: "#f5f5f5",
  borderRadius: "12px",
  textAlign: "center",
  fontWeight: "600",
  textDecoration: "none",
  color: "#000"
};

const serviceCard = {
  minWidth: "140px",
  padding: "20px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  textAlign: "center",
  fontWeight: "600"
};

const adCard = {
  minWidth: "180px",
  padding: "20px",
  background: "#1e2a2f",
  color: "#fff",
  borderRadius: "15px",
  textAlign: "center",
  fontWeight: "700"
};

const listItem = {
  padding: "15px",
  background: "#fff",
  borderRadius: "10px",
  marginBottom: "10px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
};
