import { Col, Modal, Row, Tabs, message, Button, Select, Input, Switch } from "antd";
import React, { useState, useEffect } from "react";
import instance from "../axios";
import moment from "moment";
import { CiCircleFilled, ClockCircleOutlined, CloseCircleFilled, CloseCircleOutlined, EditOutlined, EyeOutlined, FilterOutlined, OrderedListOutlined, ProfileOutlined, SearchOutlined, SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";

const DealershipRequests = () => {
    const [dealers, setDealers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDealer, setSelectedDealer] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [searchMode, setSearchMode] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [isAscending, setIsAscending] = useState(true);
    const [dealerDetails, setDealerDetails] = useState(null);


    const fetchDealers = async () => {
        try {
            setLoading(true);
            const response = await instance.get("/formdata?form_id=2");
            if (response.status === 200) {
                setDealers(response.data);
                setLoading(false);
            } else {
                console.log("Error: ", response);
                message.error("Error fetching data");
                setLoading(false);
            }
        } catch (error) {
            console.log("Error: ", error);
            message.error("Error fetching data");
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDealers();
    }, []);

    const handleDealerClick = async (dealerid) => {
        try {
            setLoading(true);
            const response = await instance.get("/formdata/" + dealerid);
            if (response.status === 200) {
                setSelectedDealer(response.data);
                setModalVisible(true);
                setLoading(false);
            } else {
                console.log("Error: ", response);
                message.error("Error fetching data");
                setLoading(false);
            }
        }
        catch (error) {
            console.log("Error: ", error);
            message.error("Error fetching data");
            setLoading(false);
        }
    };

    const handleDealerUpdate = async (dealerid) => {
        try {
            setLoading(true);
            const response = await instance.get("/formdata/" + dealerid);
            if (response.status === 200) {
                setSelectedDealer(response.data);
                setModalVisible(true);
                setLoading(false);
            } else {
                console.log("Error: ", response);
                message.error("Error fetching data");
                setLoading(false);
            }
        }
        catch (error) {
            console.log("Error: ", error);
            message.error("Error fetching data");
            setLoading(false);
        }
    }

    const handleStatusChange = async (value) => {
        try {
            setLoading(true);
            const response = await instance.put("/formdata/" + selectedDealer?.id, {
                status: value,
            });
            if (response.status === 200) {
                message.success("Status updated successfully");
                fetchDealers();
                setEditMode(false);
                setLoading(false);
            } else {
                console.log("Error: ", response);
                message.error("Error updating status");
                setLoading(false);
            }
        } catch (error) {
            console.log("Error: ", error);
            message.error("Error updating status");
            setLoading(false);
        }
    }

    // sort name ascending and descending
    const sortByName = (a, b) => {
        if (a?.dealer_mave?.full_name < b?.dealer_mave?.full_name) {
            return isAscending ? -1 : 1;
        }
        if (a?.dealer_mave?.full_name > b?.dealer_mave?.full_name) {
            return isAscending ? 1 : -1;
        }
        return 0;
    }


    // sort by date ascending and descending
    const sortByDate = (a, b) => {
        if (a?.created_at < b?.created_at) {
            return -1;
        }
        if (a?.created_at > b?.created_at) {
            return 1;
        }
        return 0;
    }

    // Sort by district
    const sortByDistrict = (a, b) => {
        if (a?.dealer_mave?.district < b?.dealer_mave?.district) {
            return -1;
        }
        if (a?.dealer_mave?.district > b?.dealer_mave?.district) {
            return 1;
        }
        return 0;
    }

    // Export to CSV
    const exportToCSV = () => {
        const csvContent = [
            ["ID", "Name", "Phone", "Contact Person", "Address 1", "Address 2", "Thana", "District", "Sales Volume", "Order Date", "Status"],
        ];
        dealers.forEach((dealer) => {
            csvContent.push([
                dealer?.id,
                dealer?.dealer_mave?.full_name,
                dealer?.dealer_mave?.phone,
                dealer?.dealer_mave?.additionals?.contactPerson,
                dealer?.dealer_mave?.address_line_1,
                dealer?.dealer_mave?.address_line_2,
                dealer?.dealer_mave?.thana,
                dealer?.dealer_mave?.district,
                Math.round(dealer?.dealer_mave?.monthly_sales_volumn),
                moment(dealer?.created_at).format("DD-MM-YYYY"),
                dealer?.dealer_mave?.status == 0 ? "Approved" : "Pending",
            ]);
        });

        const csvString = csvContent.map((row) => row.join(",")).join("\n");
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([csvString], { type: "text/csv" }));
        a.setAttribute("download", "dealers.csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }


        
            

    return (
        <div className="">
            <h1>All Dealers</h1>
            {console.log("Dealers: ", dealers)}

            <div className="flexed-center" style={{
                gap: "1em",
            }}>
                <Button
                    type="primary"
                    onClick={() => {
                        exportToCSV();
                    }}
                >
                    Export to CSV
                </Button>
                <Input
                    style={{
                        width: "20em",
                    }}
                    allowClear
                    placeholder="Search by name"
                    prefix={<SearchOutlined />}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        if (e.target.value == "") {
                            setSearchMode(false);
                            setDealers(dealers.sort(sortByName));
                        } else {
                            setSearchMode(true);
                            setDealers(dealers.filter((dealer) => {
                                return dealer?.dealer_mave?.full_name.toLowerCase().includes(e.target.value.toLowerCase());
                            }));
                        }
                    }}
                />
                <Button
                    type="primary"
                    onClick={() => {
                        setSearchValue("");
                        setSearchMode(false);
                        fetchDealers();
                    }}
                >
                    Clear
                </Button>
            </div>



            <Row gutter={[16, 16]} style={{
                paddingTop: "3em",
                paddingBottom: "1em",
                textAlign: "center",
                borderBottom: "1px solid #ddd",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
            }}>
                <Col span={1}
                ><h3>ID</h3>
                </Col>
                <Col span={4}
                >
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}>
                        <h3>Name</h3>
                        <Switch
                            style={{
                                marginTop: "0.5em",
                            }}
                            checkedChildren={<SortAscendingOutlined />}
                            unCheckedChildren={<SortDescendingOutlined />}
                            onChange={() => {
                                setIsAscending(!isAscending);
                                setDealers(dealers.sort(sortByName));
                            }}
                        />
                    </div>

                </Col>
                <Col span={3}
                ><h3>Phone</h3></Col>
                <Col span={3}
                ><h3>Thana</h3></Col>
                <Col span={3}
                >
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}>
                        <h3>District</h3>
                        <Switch
                            style={{
                                marginTop: "0.5em",
                            }}
                            checkedChildren={<SortAscendingOutlined />}
                            unCheckedChildren={<SortDescendingOutlined />}
                            onChange={() => {
                                setIsAscending(!isAscending);
                                setDealers(dealers.sort(sortByDistrict));
                            }}
                        />
                    </div>
                </Col>
                <Col span={3}
                >
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}>
                        <h3>Date</h3>
                        <Switch
                            style={{
                                marginTop: "0.5em",
                            }}
                            checkedChildren={<SortAscendingOutlined />}
                            unCheckedChildren={<SortDescendingOutlined />}
                            onChange={() => {
                                setIsAscending(!isAscending);
                                setDealers(dealers.sort(sortByDate));
                            }}
                        />
                    </div>
                </Col>
                <Col span={1}
                ><h3><EyeOutlined/></h3></Col>
                <Col span={6}
                ><h3>Status</h3></Col>
            </Row>
            {
                dealers.map((dealer, index) => {
                    return (
                        <Row gutter={[16, 16]} key={index} style={{
                            textAlign: "center",
                            borderBottom: "1px solid #ddd",
                            padding: "1em 0",
                        }}>
                            <Col span={1}
                            ><p>{dealer?.id}</p></Col>
                            <Col span={4}
                            ><p>{dealer?.dealer_mave?.full_name}</p></Col>
                            <Col span={3}
                            ><p>{dealer?.dealer_mave?.phone}</p></Col>
                            <Col span={3}
                            ><p>{dealer?.dealer_mave?.thana}</p></Col>
                            <Col span={3}
                            ><p>{dealer?.dealer_mave?.district}</p></Col>
                            <Col span={3}
                            ><p>{moment(dealer?.created_at).format("DD-MM-YYYY")}</p></Col>
                            <Col span={1}
                            >
                                <div className="flexed-center">
                                    <Button
                                    style={{
                                        backgroundColor: "transparent",
                                        border: "none",
                                        color: "var(--theme)",
                                    }}
                                        type="primary"
                                        onClick={() => {
                                            setModalVisible(true);
                                            handleDealerClick(dealer?.id);
                                        }}
                                    >
                                        <EyeOutlined />
                                    </Button>
                                    <Modal
                                        title="Dealer Details"
                                        centered
                                        open={modalVisible}
                                        onOk={() => {
                                            setModalVisible(false);
                                        }}
                                        onCancel={() => {
                                            setModalVisible(false);
                                        }}
                                        width={1000}
                                        footer={[
                                            <Button
                                                key="back"
                                                onClick={() => {
                                                    setModalVisible(false);
                                                }}
                                            >
                                                Close
                                            </Button>,
                                        ]}
                                    >
                                        <div style={{
                                            textAlign: "left",
                                        }}>
                                            {/* <p><b>Name: </b>{selectedDealer?.dealer_mave?.full_name}</p>
                                            <p><b>Phone: </b>{selectedDealer?.dealer_mave?.phone}</p>
                                            <p><b>Thana: </b>{selectedDealer?.dealer_mave?.thana}</p>
                                            <p><b>District: </b>{selectedDealer?.dealer_mave?.district}</p>
                                            <p><b>Address: </b>{selectedDealer?.dealer_mave?.address}</p>
                                            <p><b>Shop Name: </b>{selectedDealer?.dealer_mave?.shop_name}</p>
                                            <p><b>Shop Address: </b>{selectedDealer?.dealer_mave?.shop_address}</p>
                                            <p><b>Shop Phone: </b>{selectedDealer?.dealer_mave?.shop_phone}</p> */}
                                            <Row>
                                            <Col span={12} style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                borderRight: "1px solid #ddd",
                                                gap: "1em",
                                            }}>
                                            <Row style={{
                                                display: "grid",
                                                gridTemplateColumns: "1fr 3fr"
                                            }}><h4>Name: </h4>{selectedDealer?.dealer_mave?.full_name}</Row>
                                            <Row style={{
                                                display: "grid",
                                                gridTemplateColumns: "1fr 3fr"
                                            }}><h4>Phone: </h4>{selectedDealer?.dealer_mave?.phone}</Row>
                                            <Row style={{
                                                display: "grid",
                                                gridTemplateColumns: "1fr 3fr"
                                            }}><h4>Contact Person: </h4>{selectedDealer?.dealer_mave?.additionals?.contactPerson}</Row>
                                            <Row style={{
                                                display: "grid",
                                                gridTemplateColumns: "1fr 3fr"
                                            }}><h4>Address 1: </h4>{selectedDealer?.dealer_mave?.address_line_1}</Row>
                                            <Row style={{
                                                display: "grid",
                                                gridTemplateColumns: "1fr 3fr"
                                            }}><h4>Address 2: </h4>{selectedDealer?.dealer_mave?.address_line_2}</Row>
                                                <Row style={{
                                                    display: "grid",
                                                    gridTemplateColumns: "1fr 3fr"
                                                }}><h4>Thana: </h4>{selectedDealer?.dealer_mave?.thana}</Row>
                                                <Row style={{
                                                    display: "grid",
                                                    gridTemplateColumns: "1fr 3fr"
                                                }}><h4>District: </h4>{selectedDealer?.dealer_mave?.district}</Row>
                                            </Col>
                                            <Col span={12} style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "1em",
                                                paddingLeft: "2em",
                                            }}>
                                                <h3>Order Details</h3>
                                                <Row style={{
                                                    display: "grid",
                                                    gridTemplateColumns: "1fr 3fr"
                                                }}><h4>Sales Volume: </h4>{
                                                    // Float to integer
                                                    Math.round(selectedDealer?.dealer_mave?.monthly_sales_volumn)
                                                    } Metric Ton/Taka</Row>
                                                <Row style={{
                                                    display: "grid",
                                                    gridTemplateColumns: "1fr 3fr"
                                                }}><h4>Order Date: </h4>{selectedDealer?.dealer_mave?.created_at}</Row>
                                                <Row style={{
                                                    display: "grid",
                                                    gridTemplateColumns: "1fr 3fr"
                                                }}><h4>Status: </h4>
                                                <h4 style={{
                                                    backgroundColor: selectedDealer?.dealer_mave?.status == 0 ? "green" : "orange",
                                                    color: "#fff",
                                                    padding: "0.3em 0.6em",
                                                    borderRadius: "0.3em",
                                                    fontWeight: "bold",
                                                    textAlign: "center",
                                                
                                                }}>
                                                {
                                                    selectedDealer?.dealer_mave?.status == 0 ? "Approved" : "Pending"
                                                }
                                                </h4>
                                                </Row>
                                                </Col>
                                                </Row>
                                            </div>
                                            </Modal>
                                </div>
                            </Col>

                            <Col span={6}
                            >
                                <div className="flexed-center">
                                    {
                                        editMode ? (
                                            <div className="flexed-center" style={{
                                                gap: "1em",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                flexDirection: "column",
                                            }}>
                                                <Select
                                                    defaultValue={
                                                        dealer?.status == 0 ? "Approved" : "Pending"
                                                    }
                                                    style={{ width: 120 }}
                                                    onChange={handleStatusChange}
                                                >
                                                    <Select.Option value={0}>Approved</Select.Option>
                                                    <Select.Option value={1}>Pending</Select.Option>
                                                </Select>
                                                <Button
                                                    type="primary"
                                                    onClick={() => {
                                                        setEditMode(false);
                                                    }}
                                                    style={{
                                                        marginRight: "1em",
                                                    }}
                                                >
                                                    <CloseCircleOutlined /> Cancel
                                                </Button>
                                            </div>
                                        ) : (
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "1em",
                                            }}>
                                                <h3 style={{
                                                    backgroundColor: dealer?.status == 0 ? "green" : "orange",
                                                    color: "#fff",
                                                    padding: "0.3em 0.6em",
                                                    borderRadius: "0.3em",
                                                    fontWeight: "bold",
                                                    textAlign: "center",
                                                }}>
                                                    {
                                                        dealer?.status == 0 ?
                                                            "Approved" : "Pending"
                                                    }
                                                </h3>
                                                <Button
                                                    type="primary"
                                                    onClick={() => {
                                                        setEditMode(true);
                                                        handleDealerClick(dealer?.id);
                                                    }
                                                    }
                                                >
                                                    <EditOutlined />
                                                </Button>
                                            </div>
                                        )
                                    }

                                </div>
                            </Col>
                        </Row>
                    );
                })
            }
        </div>
    );

};

export default DealershipRequests;