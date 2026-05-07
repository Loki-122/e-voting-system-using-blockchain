import "../css/SidebarStyle.css";
import { SidebarData, WebsiteDetails } from "../Data/SidebarData";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const [data, setData] = useState(SidebarData);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    setData(prevData => 
      prevData.map(item => ({
        ...item,
        id: currentPath.includes(item.link.split('/').pop()) ? "active" : ""
      }))
    );
  }, [location]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#030014",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: isCollapsed ? "80px" : "280px",
          minHeight: "100vh",
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.06)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Logo Section */}
        <div
          style={{
            padding: isCollapsed ? "24px 16px" : "24px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: isCollapsed ? "center" : "flex-start",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {!isCollapsed && (
            <div>
              <h1
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                ChainVote
              </h1>
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "rgba(255, 255, 255, 0.4)",
                  margin: 0,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Admin Portal
              </p>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav
          style={{
            flex: 1,
            padding: "16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {data.map((item, index) => {
            const isActive = item.id === "active";
            const isHovered = hoveredItem === index;
            const isLogout = item.title === "Logout";

            return (
              <Link
                to={item.link}
                key={index}
                style={{ textDecoration: "none" }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: isCollapsed ? "14px" : "14px 16px",
                    borderRadius: "12px",
                    background: isActive 
                      ? "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%)"
                      : isHovered 
                        ? "rgba(255, 255, 255, 0.04)"
                        : "transparent",
                    border: isActive
                      ? "1px solid rgba(139, 92, 246, 0.3)"
                      : "1px solid transparent",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    justifyContent: isCollapsed ? "center" : "flex-start",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "3px",
                        height: "60%",
                        background: "linear-gradient(180deg, #8b5cf6 0%, #ec4899 100%)",
                        borderRadius: "0 4px 4px 0",
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    style={{
                      fontSize: "20px",
                      color: isLogout 
                        ? "rgba(239, 68, 68, 0.8)"
                        : isActive 
                          ? "#8b5cf6" 
                          : isHovered 
                            ? "rgba(255, 255, 255, 0.9)"
                            : "rgba(255, 255, 255, 0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* Title */}
                  {!isCollapsed && (
                    <span
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: isActive ? 600 : 500,
                        color: isLogout
                          ? "rgba(239, 68, 68, 0.8)"
                          : isActive 
                            ? "#ffffff"
                            : isHovered
                              ? "rgba(255, 255, 255, 0.9)"
                              : "rgba(255, 255, 255, 0.6)",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {item.title}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Collapse Button */}
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              width: "100%",
              padding: "12px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "10px",
              color: "rgba(255, 255, 255, 0.6)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontSize: "0.8rem",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            >
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {!isCollapsed && "Collapse"}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Effects */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: isCollapsed ? "80px" : "280px",
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(ellipse 80% 50% at 70% -20%, rgba(139, 92, 246, 0.1), transparent),
              radial-gradient(ellipse 60% 40% at 100% 100%, rgba(236, 72, 153, 0.05), transparent)
            `,
            pointerEvents: "none",
            zIndex: 0,
            transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        {/* Grid Pattern */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: isCollapsed ? "80px" : "280px",
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            pointerEvents: "none",
            zIndex: 0,
            transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        {/* Content Outlet */}
        <div
          style={{
            flex: 1,
            position: "relative",
            zIndex: 1,
            overflowY: "auto",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
