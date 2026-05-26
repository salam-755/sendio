"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import supabase from "../../../utils/supabaseClient";

export default function CompanyProfile() {
  const params = useSearchParams();
  const companyId = params.get("id");

  const [profile, setProfile] = useState(null);
  const [company, setCompany] = useState(null);
  const [media, setMedia] = useState([]);
  const [services, setServices] = useState([]);
  const [social, setSocial] = useState(null);

  useEffect(() => {
    if (companyId) loadData();
  }, [companyId]);

  async function loadData() {
    const { data: p } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", companyId)
      .single();

    const { data: cp } = await supabase
      .from("company_profiles")
      .select("*")
      .eq("company_id", companyId)
      .single();

    const { data: m } = await supabase
      .from("company_media")
      .select("*")
      .eq("company_id", companyId);

    const { data: s } = await supabase
      .from("company_services")
      .select("*")
      .eq("company_id", companyId);

    const { data: sc } = await supabase
      .from("company_social")
      .select("*")
      .eq("company_id", companyId)
      .single();

    setProfile(p);
    setCompany(cp);
    setMedia(m || []);
    setServices(s || []);
    setSocial(sc);
  }

  if (!profile) return <p style={{ padding: 20 }}>Loading company data...</p>;

  return (
    <div style={{ padding: "20px" }}>

      {/* BANNER */}
      {company?.banner_url && (
        <img
          src={company.banner_url}
          style={{ width: "100%", borderRadius: "12px", marginBottom: "20px" }}
        />
      )}

      {/* LOGO + NAME */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {company?.logo_url && (
          <img
            src={company.logo_url}
            style={{ width: "70px", height: "70px", borderRadius: "50%" }}
          />
        )}
        <div>
          <h1 style={{ margin: 0 }}>{profile.full_name}</h1>
          <p style={{ margin: 0 }}>{company?.category}</p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <section style={{ marginTop: "20px" }}>
        <h2>Description</h2>
        <p>{company?.description || "No description available."}</p>
      </section>

      {/* SERVICES */}
      <section style={{ marginTop: "20px" }}>
        <h2>Services</h2>

        {services.length === 0 && <p>No services available.</p>}

        {services.map((srv) => (
          <div
            key={srv.id}
            style={{
              padding: "15px",
              background: "#fff",
              borderRadius: "10px",
              marginBottom: "10px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
            }}
          >
            <strong>{srv.service_name}</strong>
            <p>{srv.description}</p>
            <p>Price: {srv.price} €</p>
          </div>
        ))}
      </section>

      {/* MEDIA */}
      <section style={{ marginTop: "20px" }}>
        <h2>Media Gallery</h2>

        <div style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
          {media.map((m) => (
            <div key={m.id}>
              {m.type === "image" && (
                <img
                  src={m.url}
                  style={{ width: "160px", height: "120px", borderRadius: "10px" }}
                />
              )}

              {m.type === "video" && (
                <video
