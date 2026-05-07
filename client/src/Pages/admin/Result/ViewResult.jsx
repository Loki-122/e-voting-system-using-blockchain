import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../../context/TransactionContext";
import ElectionResult from "../../../Components/Admin/ElectionResult";
import ContentHeader from "../../../Components/ContentHeader";
import { getResult } from "../../../Data/Methods";

const ViewResult = () => {
  const { getAllTransactions } = useContext(TransactionContext);
  const [result, setResult] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    async function getData() {
      try {
        const transactions = await getAllTransactions();
        const ans = await getResult(transactions);
        setResult(ans);
      } catch (error) {
        console.log("Error fetching results:", error);
      }
    }
    getData();
    // eslint-disable-next-line
  }, []);

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

        {result && result.length > 0 ? (
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
        ) : (
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
                width: "64px",
                height: "64px",
                background: "rgba(139, 92, 246, 0.1)",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M3 3v18h18" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3
              style={{
                fontSize: "1.1rem",
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
              }}
            >
              Election results will appear here once voting is complete
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewResult;
