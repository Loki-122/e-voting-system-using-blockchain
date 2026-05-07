import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../../context/TransactionContext";
import ElectionResult from "../../../Components/Admin/ElectionResult";
import ContentHeader from "../../../Components/ContentHeader";
import { getResult } from "../../../Data/Methods";

const ViewResult = () => {
  const { getAllTransactions } = useContext(TransactionContext);
  const [result, setResult] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    async function getData() {
      setLoading(true);
      try {
        const transactions = await getAllTransactions();
        const ans = await getResult(transactions);
        setResult(ans);
      } catch (error) {
        console.log("Error fetching results:", error);
        setResult([]);
      } finally {
        setLoading(false);
      }
    }
    getData();
    // eslint-disable-next-line
  }, []);

  // Calculate totals
  const totalVotes = result.reduce((acc, r) => {
    return acc + (r.candidates?.reduce((sum, c) => sum + (c.votes || 0), 0) || 0);
  }, 0);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <ContentHeader />
      <div style={{ padding: "32px" }}>
        <div style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#ffffff",
              marginBottom: "8px",
            }}
          >
            Election Results
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            View and publish election results to users
          </p>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3v18h18" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.85rem" }}>
                Total Elections
              </span>
            </div>
            <span style={{ fontSize: "2rem", fontWeight: 700, color: "#ffffff" }}>
              {loading ? "-" : result.length}
            </span>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11l3 3L22 4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.85rem" }}>
                Total Votes Cast
              </span>
            </div>
            <span style={{ fontSize: "2rem", fontWeight: 700, color: "#22c55e" }}>
              {loading ? "-" : totalVotes}
            </span>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17l10 5 10-5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12l10 5 10-5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.85rem" }}>
                Blockchain
              </span>
            </div>
            <span style={{ fontSize: "1rem", fontWeight: 600, color: "#3b82f6" }}>
              Verified & Immutable
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "16px",
              padding: "80px 40px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "3px solid rgba(139, 92, 246, 0.2)",
                borderTop: "3px solid #8b5cf6",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 20px",
              }}
            />
            <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.95rem" }}>
              Loading election results from blockchain...
            </p>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        )}

        {/* Election Results Grid */}
        {!loading && result && result.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {result.map((item, index) => (
              <div
                key={index}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 * index}s`,
                }}
              >
                <ElectionResult
                  index={index}
                  title={item.name}
                  candidates={item.candidates}
                  info={item}
                  electionId={item.election_id}
                  currentPhase={item.currentPhase}
                  link={item.name}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && (!result || result.length === 0) && (
          <div
            style={{
              padding: "80px 40px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M3 3v18h18" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: "8px",
              }}
            >
              No Results Available
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "rgba(255, 255, 255, 0.5)",
                maxWidth: "400px",
                margin: "0 auto 24px",
              }}
            >
              Election results will appear here once voting is complete and results are published to the blockchain.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <a
                href="/admin/election"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                View Elections
              </a>
              <a
                href="/admin/phase"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                  border: "none",
                  borderRadius: "10px",
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
                }}
              >
                Manage Phases
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewResult;
