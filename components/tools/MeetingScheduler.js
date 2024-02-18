import { Button, Calendar, Col, Form, Image, Input, Radio, Row, Select, Table, TimePicker, message, theme } from "antd";
import dayjs from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
import React, { useState, useEffect } from "react";
import RichTextEditor from "../RichTextEditor";
import { set } from "mongoose";

const MeetingScheduler = () => {
    const [meetingDate, setMeetingDate] = useState(null);
    const [meetingLocation, setMeetingLocation] = useState("");
    const [meetingScheduled, setMeetingScheduled] = useState(false);
    const [meetingDetails, setMeetingDetails] = useState({});

    const onDateSelect = value => {
        console.log("Selected value: ", value);
        setMeetingDate(value);
    }

    const onFinish = values => {
        console.log("Success:", values);
        message.success("Meeting scheduled successfully!");
        setMeetingScheduled(true);
        setMeetingDetails(values);
    }

    const sheduledMeetingRows = [
        {
            key: "1",
            field: "Meeting Name",
            value: meetingDetails?.meetingName
        },
        {
            key: "2",
            field: "Date",
            value: meetingDate?.format("MMMM Do YYYY")
        },
        {
            key: "3",
            field: "Time",
            value: meetingDetails?.time?.format("h:mm a")
        },
        {
            key: "4",
            field: "Duration",
            value: meetingDetails?.duration + " minutes"
        },
        {
            key: "5",
            field: "Location",
            value: meetingLocation === "online" ? "Online" : "Meeting Room " + meetingDetails.meetingRoomNumber
        },
        {
            key: "6",
            field: "Meeting Link",
            value: meetingLocation === "online" ? meetingDetails.meetingLink : "N/A"
        },
        {
            key: "7",
            field: "Meeting Description",
            // value: meetingDetails?.meetingDescription
            value: <div dangerouslySetInnerHTML={{ __html: meetingDetails?.meetingDescription }} />
        }
    ];

    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
    }

    useEffect(() => {
        dayjs.extend(dayLocaleData);
    }, []);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2em",
        }}>
            <Calendar
                style={{
                    width: "100%",
                    maxWidth: "80vw",
                    border: "1px solid #f0f0f0",
                    borderRadius: "15px",
                    backgroundColor: "var(--themes)",
                    itemActiveBg: "var(--themes)",
                    padding: "1em",
                }}
                defaultValue={dayjs()}
                onSelect={onDateSelect}
                value={meetingDate}
            />

            {
                meetingDate && (
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "1em",
                    }}>
                        <h3>{meetingDate.format("dddd")}</h3>
                        <h3>{meetingDate.format("MMMM Do YYYY")}</h3>
                        <Form
                            // style={{
                            //     display: "flex",
                            //     alignItems: "center",
                            //     justifyContent: "center",
                            //     marginTop: "1em",
                            // }}
                            layout="inline"
                            name="meeting-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Meeting Name"
                                name="meetingName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input the meeting name!",
                                    },
                                ]}
                                validateStatus="success"
                            >
                                <Input
                                    allowClear
                                    placeholder="Enter the meeting name"
                                    style={{
                                        width: "60vw",
                                        height: "3em",
                                    }}
                                />
                            </Form.Item>

                            <div style={{
                                marginTop: "1em",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1em",
                            }}>
                                <Form.Item
                                    label="Time"
                                    name="time"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input the time!",
                                        },
                                    ]}
                                >
                                    <TimePicker
                                        style={{
                                            height: "3em"
                                        }}
                                        use12Hours
                                        format="h:mm a"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Duration"
                                    name="duration"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input the duration!",
                                        },
                                    ]}
                                >
                                    <Select
                                        style={{
                                            height: "3em"
                                        }}
                                        placeholder="Select a duration"
                                        allowClear
                                    >
                                        <Select.Option value="15">15 minutes</Select.Option>
                                        <Select.Option value="30">30 minutes</Select.Option>
                                        <Select.Option value="45">45 minutes</Select.Option>
                                        <Select.Option value="60">1 hour</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Location"
                                    name="location"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input the location!",
                                        },
                                    ]}
                                >
                                    <Select
                                        style={{
                                            height: "3em"
                                        }}
                                        placeholder="Select a location"
                                        allowClear
                                        onChange={value => setMeetingLocation(value)}
                                    >
                                        <Select.Option value="online">Online</Select.Option>
                                        <Select.Option value="offline">Offline</Select.Option>
                                    </Select>
                                </Form.Item>
                                {
                                    meetingLocation === "offline" && (
                                        <Form.Item
                                            label="Meeting Room Number"
                                            name="meetingRoomNumber"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input the hall number!",
                                                },
                                            ]}
                                        >
                                            <Select
                                                style={{
                                                    height: "3em"
                                                }}
                                                placeholder="Select a meeting room"
                                                allowClear
                                            >
                                                <Select.Option value="1">Meeting Room 1</Select.Option>
                                                <Select.Option value="2">Meeting Room 2</Select.Option>
                                                <Select.Option value="3">Meeting Room 3</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    )
                                }
                                {
                                    meetingLocation === "online" && (
                                        <Form.Item
                                            label="Meeting Link"
                                            name="meetingLink"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input the meeting link!",
                                                },
                                            ]}
                                        >
                                            <Radio.Group
                                                name="meetingLink"
                                                defaultValue="zoom"
                                            >
                                                <Radio.Button value="zoom">
                                                    <Image
                                                        src="/images/zoom.svg"
                                                        width={20}
                                                        height={20}
                                                        preview={false}
                                                    />
                                                </Radio.Button>
                                                <Radio.Button value="googleMeet">
                                                    <Image
                                                        src="/images/Google_Meet_icon.svg"
                                                        width={20}
                                                        height={20}
                                                        preview={false}
                                                    />
                                                </Radio.Button>
                                            </Radio.Group>
                                        </Form.Item>
                                    )
                                }
                            </div>
                            <Form.Item
                                label="Meeting Description"
                                name="meetingDescription"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input the meeting description!",
                                    },
                                ]}
                                style={{
                                    width: "70vw",
                                    marginTop: "2em",
                                    marginBottom: "2em",
                                }}
                            >
                                <RichTextEditor
                                    defaultValue=""
                                    editMode={true}
                                    onChange={html => console.log(html)}
                                />
                            </Form.Item>
                            <Form.Item style={{
                                margin: "auto"
                            }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        backgroundColor: "var(--themes)",
                                        borderColor: "var(--themes)",
                                        padding: "0.6em 2em 2em 2em",
                                        fontSize: "1.5em",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Schedule Meeting
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                )
            }
            {
                meetingScheduled && (
                    <>
                        <Row>
                            <Col>
                                <Table
                                    style={{
                                        width: "60vw",
                                        marginTop: "2em",
                                    }}
                                    pagination={false}
                                    dataSource={sheduledMeetingRows}
                                    columns={[
                                        {
                                            title: "Field",
                                            dataIndex: "field",
                                            key: "field",
                                        },
                                        {
                                            title: "Value",
                                            dataIndex: "value",
                                            key: "value",
                                        }
                                    ]}
                                />
                            </Col>
                        </Row>
                    </>
                )
            }
        </div>
    );
};

export default MeetingScheduler;