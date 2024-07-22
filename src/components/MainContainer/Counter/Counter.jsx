import { useState, useEffect } from "react";
import axios from "axios";
import "./Counter.css";

const Counter = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token nicht gefunden");
          return;
        }

        const response = await axios.get(`${apiUrl}/sales/count`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTotalSales(response.data.count);
      } catch (error) {
        console.error(
          "Fehler beim Abrufen der Gesamtanzahl der Verkäufe:",
          error
        );
      }
    };

    fetchTotalSales();
  }, [apiUrl]);

  const splitNumber = (number) => {
    return number
      .toString()
      .split("")
      .map((digit, index) => (
        <div className="digit-container" key={index}>
          <span className="decor top"></span>
          <span className="decor bottom"></span>
          <span className="from top">
            <span>{digit}</span>
            <span className="shadow"></span>
          </span>
          <span className="from bottom">
            <span>{digit}</span>
            <span className="shadow"></span>
          </span>
          <span className="to top">
            <span>{digit}</span>
            <span className="shadow"></span>
          </span>
          <span className="to bottom">
            <span>{digit}</span>
            <span className="shadow"></span>
          </span>
        </div>
      ));
  };

  return (
    <>
      <h1>
        Insgesamt
        <div className="counter">{splitNumber(totalSales)}</div>
        Verkäufe.
      </h1>
    </>
  );
};

export default Counter;
