import { useLocation, useParams } from "react-router-dom";
import "../assets/styles/companyCard.css";
import LayoutWrapper from "../components/LayoutWrapper";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

export default function CompanyCard() {
  const location = useLocation();
  const { id } = location.state;
  const { token } = useAuth();

  interface CompanyType {
    id: string;
    company_name: string;
    phone: string;
    email: string;
    industry: string;
    org_number: string;
    is_active: boolean;
  }
  const [companyResponse, setCompanyResponse] = useState<CompanyType | null>(
    null,
  );

  useEffect(() => {
    async function fetchCompanyData() {
      const response = await axios({
        method: "get",
        url: `http://localhost:5000/company/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Company data: ", response.data);

      setCompanyResponse(response.data[0]);
    }
    fetchCompanyData();
    console.log("Company response: ", companyResponse);
  }, []);

  const params = useParams();

  return (
    <LayoutWrapper>
      <section className="company-card-wrapper">
        <div className="company-title-container">
          <h1>{params.companyname}</h1>
        </div>
        <div className="company-details">
          <div className="details">
            <label htmlFor="phone">Phone number</label>
            <p>{companyResponse?.phone}</p>
          </div>
          <div className="details">
            <label htmlFor="mail">Mail adress</label>
            <p>{companyResponse?.email}</p>
          </div>
          <div className="details">
            <label htmlFor="industry">Industry</label>
            <p>{companyResponse?.industry}</p>
          </div>
          <div className="details">
            <label htmlFor="orgNumber">Organization number</label>
            <p>{companyResponse?.org_number}</p>
          </div>
          <div className="details">
            <label htmlFor="status">Active status</label>
            <p>{companyResponse?.is_active ? "Active" : "Inactive"}</p>
          </div>
        </div>
      </section>
    </LayoutWrapper>
  );
}
