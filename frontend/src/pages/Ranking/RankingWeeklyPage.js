import React, { useState, useEffect } from "react";
import RankingpageLayout from "@/layouts/RankingpageLayout";
import koreaImage from '@/assets/img/Koreaprofile.png';
import chinaImage from '@/assets/img/Chinaprofile.png';
import japanImage from '@/assets/img/Japanprofile.png';
import axiosInstance from "@/axiosInstance";

const countryImages = {
  한국: koreaImage,
  중국: chinaImage,
  일본: japanImage,
};

const RankingWeeklyPage = () => {
  const [rankingData, setRankingData] = useState({});
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const countries = ["한국", "중국", "일본"];

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axiosInstance.get("/api/ranking/weekly", {
          headers: {
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        });
        setRankingData(response.data);
      } catch (err) {
        console.error("랭킹 데이터 오류:", err);
      }
    };
    fetchRanking();
  }, []);

  const styles = {
    container: {
      padding: "0 2rem 2rem 0",
    },
    header: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "2rem",
      display: "flex",
      flexDirection: "column",
    },
    divider: {
      width: "100%",
      height: "1.5px",
      backgroundColor: "#ccc",
      marginTop: "8px",
    },
    rankingWrapper: {
      display: "flex",
      justifyContent: "center",
      gap: "2rem",
    },
    card: {
      backgroundColor: "#f5f5f5",
      padding: "1rem",
      borderRadius: "1rem",
      width: "280px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      transition: "box-shadow 0.2s ease-in-out",
      cursor: "pointer",
    },
    image: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      margin: "0 auto 1rem",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.07)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "transparent",
      border: "2.5px solid white"
    },
    countryName: {
      textAlign: "center",
      marginTop: "0.5rem",
      marginBottom: "1.5rem",
    },
    userList: {
      listStyle: "none",
      padding: 0,
      marginTop: "0.5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    userItem: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "0.8rem 0",
      fontSize: "1rem",
      width: "80%",
    },
    badge: {
      fontSize: "1.5rem",
      marginRight: "10px",
    },
    userBox: {
      backgroundColor: "#e0e0e0",
      padding: "8px 12px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      boxSizing: "border-box",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
    }
  };

  const getRankStyle = (rank) => {
    switch (rank) {
      case 0:
        return { border: "2px solid gold", backgroundColor: "#fff9e6", badge: "🥇" };
      case 1:
        return { border: "2px solid #b0b0b0", backgroundColor: "#f5f5f5", badge: "🥈" };
      case 2:
        return { border: "2px solid #cd7f32", backgroundColor: "#fdf1e0", badge: "🥉" };
      case 3:
        return { border: "1px solid #ccc", backgroundColor: "#f5f5f5", badge: "4️⃣" };
      case 4:
        return { border: "1px solid #ccc", backgroundColor: "#f5f5f5", badge: "5️⃣" };
      default:
        return { border: "1px solid #ccc", backgroundColor: "#f5f5f5", badge: `#${rank + 1}` };
    }
  };

  return (
    <RankingpageLayout>
      <div style={styles.container}>
        <h2 style={styles.header}>
          📅 주간 통합 순위
          <div style={styles.divider}></div>
        </h2>
        <div style={styles.rankingWrapper}>
          {countries.map((country, idx) => (
            <div
              key={idx}
              style={{
                ...styles.card,
                ...(hoveredCardIndex === idx && {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
                  backgroundColor: "#E7F3FF",
                  border: "2px solid #1E90FF"
                }),
              }}
              onMouseEnter={() => setHoveredCardIndex(idx)}
              onMouseLeave={() => setHoveredCardIndex(null)}
            >
              <div
                style={{
                  ...styles.image,
                  backgroundImage: `url(${countryImages[country]})`,
                }}
              />
              <h3 style={styles.countryName}>{country}</h3>
              <ul style={styles.userList}>
                {(rankingData[country] || []).map((user, index) => (
                  <li key={index} style={styles.userItem}>
                    <div style={{ ...styles.userBox, ...getRankStyle(user.rank - 1) }}>
                      <span style={styles.badge}>{getRankStyle(user.rank - 1).badge}</span>
                      <img
                        src={user.profileImage}
                        alt="유저"
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                      <span>{user.nickname || user.id}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </RankingpageLayout>
  );
};

export default RankingWeeklyPage;
