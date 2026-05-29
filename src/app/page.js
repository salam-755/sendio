"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "../utils/supabaseClient";

export default function HomePage() {
  const [companies, setCompanies] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // إضافة Eruda للتشخيص من الهاتف
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/eruda';
    script.async = true;
    script.onload = () => eruda.init();
    document.body.appendChild(script);

    // جلب البيانات
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data: comp } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_type", "company")
        .eq("is_profile_complete", true);

      const { data: work } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_type", "worker")
        .eq("is_profile_complete", true);

      const { data: cli } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_type", "client")
        .eq("is_profile_complete", true);

      setCompanies(comp || []);
      setWorkers(work || []);
      setClients(cli || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
      {/* HERO SECTION */}
      <section style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "800" }}>SENDIO PLATFORM</h1>
        <p style={{ fontSize: "1.1rem", marginTop: "10px" }}>
          A unified platform connecting companies, workers, and clients in one place.
        </p>
      </section>

      {/* MAIN CATEGORIES */}
      <section style={{ display: "flex", gap: "15px", padding: "20px", overflowX: "auto" }}>
        <Link href="/client-dashboard" style={card}>Client</Link>
        <Link href="/worker-dashboard" style={card}>Worker</Link>
        <Link href="/company-dashboard" style={card}>Companies</Link>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "20px" }}>
        <h2>Popular Services</h2>
        <div style={{ display: "flex", gap: "15px", overflowX: "auto" }}>
          <div style={serviceCard}>🚚 Delivery</div>
          <div style={serviceCard}>🧹 Cleaning</div>
          <div style={serviceCard}>🏗 Construction</div>
          <div style={serviceCard}>🚛 Transport</div>
          <div style={serviceCard}>🌿 Gardening</div>
        </div>
      </section>

      {/* ADS SLIDER */}
      <section style={{ padding: "20px" }}>
        <h2>Advertisements</h2>
        <div style={{ display: "flex", gap: "15px", overflowX: "auto" }}>
          <div style={adCard}>🔥 Ad 1</div>
          <div style={adCard}>⭐ Ad 2</div>
          <div style={adCard}>💼 Ad 3</div>
          <div style={adCard}>🏆 Ad 4</div>
        </div>
      </section>

      {/* COMPANIES */}
      <section style={{ padding: "20px" }}>
        <h2>Verified Companies</h2>
        {companies.map((c) => (
          <div key={c.id} style={listItem}>
            <strong>{c.full_name}</strong>
            <p>{c.business_category || "General Services"}</p>
          </div>
        ))}
      </section>

      {/* WORKERS */}
      <section style={{ padding: "20px" }}>
        <h2>Top Workers</h2>
        {workers.map((w) => (
          <div key={w.id} style={listItem}>
            <strong>{w.full_name}</strong>
            <p>{w.bio || "No bio available"}</p>
          </div>
        ))}
      </section>

      {/* CLIENTS */}
      <section style={{ padding: "20px" }}>
        <h2>Clients</h2>
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

// الأنماط (Styles) كما هي
const card = { minWidth: "120px", padding: "20px", background: "#f5f5f5", borderRadius: "12px", textAlign: "center", fontWeight: "600", textDecoration: "none", color: "#000" };
const serviceCard = { minWidth: "140px", padding: "20px", background: "#fff", borderRadius: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", textAlign: "center", fontWeight: "600" };
const adCard = { minWidth: "180px", padding: "20px", background: "#1e2a2f", color: "#fff", borderRadius: "15px", textAlign: "center", fontWeight: "700" };
const listItem = { padding: "15px", background: "#fff", borderRadius: "10px", marginBottom: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" };
        
