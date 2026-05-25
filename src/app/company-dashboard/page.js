"use client";

import { useEffect, useState } from "react";
import supabase from "../../utils/supabaseClient";

export default function CompanyDashboard() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  async function fetchCompanies() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "company");

    if (!error) setCompanies(data);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "1.8rem", fontWeight: "800" }}>الشركات الموثوقة</h1>

      {companies.length === 0 && (
        <p style={{ marginTop: "20px" }}>لا توجد شركات مسجلة حتى الآن.</p>
      )}

      {companies.map((c) => (
        <div
          key={c.id}
          style={{
            padding: "15px",
            background: "#fff",
            borderRadius: "12px",
            marginTop: "15px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}
        >
          <h3 style={{ margin: 0 }}>{c.full_name}</h3>
          <p style={{ margin: "5px 0" }}>{c.category}</p>

          <a
            href={`/company-profile?id=${c.id}`}
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "8px 15px",
              background: "#1e2a2f",
              color: "#fff",
              borderRadius: "8px",
              textDecoration: "none"
            }}
          >
            عرض الملف →
          </a>
        </div>
      ))}
    </div>
  );
              }
