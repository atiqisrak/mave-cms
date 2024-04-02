import React, { useEffect, useState } from "react";
import { Button, Form, InputNumber, Tooltip } from "antd";

const Zakat = () => {
  const [goldValue, setGoldValue] = useState(0);
  const [silverValue, setSilverValue] = useState(0);
  const [cash, setCash] = useState(0);
  const [bankBalance, setBankBalance] = useState(0);
  const [loan, setLoan] = useState(0);
  const [other, setOther] = useState(0);
  const [zakatAmount, setZakatAmount] = useState(0);

  const updateZakat = () => {
    const total =
      goldValue * 89600 + silverValue * 842 + cash + bankBalance - loan - other;
    setZakatAmount(total >= 85000 ? total * 0.025 : 0);
  };

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    const debouncedUpdate = debounce(updateZakat, 500); // Adjust debounce delay as needed
    updateZakat(); // Initial calculation
    return () => clearTimeout(debouncedUpdate);
  }, [goldValue, silverValue, cash, bankBalance, loan, other]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateZakat();
  };

  return (
    <div className="ViewContainer">
      <div className="ViewContentContainer">
        <h1>Zakat Calculator</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div className="inputField">
            <h4>Nisab (Minimum Wealth eligible for zakat) is ৳85,000</h4>
            <h4>Rate of Zakat is 2.5%</h4>
            <Tooltip title="Gold market rate per vori">
              <h4>Gold Price: ৳1,12,000</h4>
            </Tooltip>
            <Tooltip title="Silver market rate per tola">
              <h4>Silver Price: ৳1,053</h4>
            </Tooltip>
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="vertical"
              onSubmit={handleFormSubmit}
            >
              <Form.Item label="Gold Value (BDT)">
                <InputNumber
                  defaultValue={0}
                  onChange={(value) => setGoldValue(value)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item label="Silver Value (BDT)">
                <InputNumber
                  defaultValue={0}
                  formatter={(value) =>
                    `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                  }
                  parser={(value) => value.replace(/,/g, "")}
                  onChange={(value) => setSilverValue(value)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item label="Cash (BDT)">
                <InputNumber
                  defaultValue={0}
                  formatter={(value) =>
                    `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                  }
                  parser={(value) => value.replace(/,/g, "")}
                  onChange={(value) => setCash(value)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item label="Bank Balance (BDT)">
                <InputNumber
                  defaultValue={0}
                  formatter={(value) =>
                    `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                  }
                  parser={(value) => value.replace(/,/g, "")}
                  onChange={(value) => setBankBalance(value)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item label="Loan (BDT)">
                <InputNumber
                  defaultValue={0}
                  formatter={(value) =>
                    `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                  }
                  parser={(value) => value.replace(/,/g, "")}
                  onChange={(value) => setLoan(value)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="Bills/Taxes/Rent to Pay (BDT)"
                style={{
                  width: "100%",
                }}
              >
                <InputNumber
                  defaultValue={0}
                  formatter={(value) =>
                    `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                  }
                  parser={(value) => value.replace(/,/g, "")}
                  onChange={(value) => setOther(value)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              {/* <Form.Item>
            <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
              <Button type="primary" htmlType="submit">
                Calculate
              </Button>
              <Button danger onClick={() => setZakatAmount(0)}>
                Reset
              </Button>
            </div>
          </Form.Item> */}
            </Form>
          </div>

          <div
            className="result"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <h1
              style={{
                fontSize: "1.5rem",
                color: zakatAmount > 0 ? "green" : "red",
                textAlign: "center",
              }}
            >
              Zakat Amount: <br />
              <span
                style={{
                  color: zakatAmount > 0 ? "orangered" : "red",
                  fontSize: "2.8rem",
                }}
              >
                {zakatAmount.toLocaleString("en-BD", {
                  style: "currency",
                  currency: "BDT",
                })}
              </span>
            </h1>{" "}
            {zakatAmount > 0 ? (
              <p style={{ color: "green" }}>Zakat calculated successfully</p>
            ) : (
              <p style={{ color: "red" }}>
                Your wealth is not yet above the Nisab threshold and therefore
                not liable for Zakat this year.
              </p>
            )}
            <p style={{ fontSize: "smaller" }}>
              Please note that this is a basic Zakat calculator and may not
              cover all specific situations. It's always recommended to consult
              with a qualified Islamic scholar or Mufti for guidance on your
              Zakat obligations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Zakat;
