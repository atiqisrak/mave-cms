import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Card as AntCard,
    Image,
    Spin,
    Button,
    Input,
    Modal,
    Switch,
    Card,
    Select,
    Checkbox,
    Pagination,
    message,
    DatePicker,
    Popconfirm
} from 'antd';
import instance from '../axios';
import Site from '../components/Site';
import {
    ArrowRightOutlined,
    CheckCircleFilled,
    CloseCircleFilled,
    CloseCircleOutlined,
    DeleteFilled,
    DeleteOutlined,
    EditFilled,
    EditOutlined,
    FilterOutlined,
    PlusCircleOutlined,
    RestOutlined,
    SyncOutlined,
    UploadOutlined
} from '@ant-design/icons';
import Loader from '../components/Loader';
import SingleMediaSelect from '../components/SingleMediaSelect';
import CreateCardForm from '../components/CreateCardForm';
import { setPageTitle } from '../global/constants/pageTitle';
import Link from 'next/link';
import RichTextEditor from '../components/RichTextEditor';
import moment from 'moment';
import MediaSelectionModal from '../components/MediaSelectionModal';

const Events = () => {

    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const [updateResponse, setUpdateResponse] = useState(null);
    const [cards, setCards] = useState([]);
    const [media, setMedia] = useState([]);
    const [expandedEvent, setExpandedEvent] = useState(null);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [formData, setFormData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [createMode, setCreateMode] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMediaIDs, setSelectedMediaIDs] = useState([]);
    const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

    const fetchEvents = async () => {
        setLoading(true);
        const response = await instance.get('/events');
        if (response && response.data) {
            setEvents(response.data);
            console.log("Events", response.data);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const cardsResponse = await instance.get('/cards');
        const mediaResponse = await instance.get('/media');

        if (cardsResponse && cardsResponse.data) {
            setCards(cardsResponse.data);
        }

        if (mediaResponse && mediaResponse.data) {
            setMedia(mediaResponse.data);
        }
    }

    useEffect(() => {
        fetchData();
    }, [updateResponse]);

    const handleExpand = (eventId) => {
        if (expandedEvent === eventId) {
            setExpandedEvent(null);
        } else {
            setExpandedEvent(eventId);
        }
    }

    const handleEditPageClick = (eventId) => {
        setEditMode(true);
        setSelectedEventId(eventId);
        const event = events?.find((event) => event.id === eventId);
        setFormData(event);
        setSelectedMediaIDs(event?.medias_mave?.map((media) => media.id));
    }

    const handleDateChange = (date, dateString) => {
        console.log("Date", date);
        console.log("DateString", dateString);
        setFormData({
            ...formData,
            event_date: dateString,
        });
    }

    const handleMediaSelection = (mediaId) => {
        setSelectedMediaIDs((prevSelectedMedia) => {
            if (prevSelectedMedia?.includes(mediaId)) {
                return prevSelectedMedia?.filter((id) => id !== mediaId);
            } else {
                return [...prevSelectedMedia, mediaId];
            }
        });
    }

    const oncancel = () => {
        setModalVisible(false);
    }

    const onOk = () => {
        setModalVisible(false);
    }

    const handleDelete = async (eventId) => {
        try {
            const response = await instance.delete(`/events/${eventId}`);
            if (response && response.data) {
                message.success('Event deleted successfully');
                setUpdateResponse(response.data);
                fetchEvents();
            }
        } catch (error) {
            message.error('Error deleting event');
        }
    }

    const handleUpdate = async (eventId) => {
        try {
            const response = await instance.put(`/events/${eventId}`, {
                ...formData,
                media_ids: selectedMediaIDs,
            });
            if (response && response.data) {
                message.success('Event updated successfully');
                setUpdateResponse(response.data);
                setEditMode(false);
                fetchEvents();
            }
        } catch (error) {
            message.error('Error updating event');
        }
    }

    // Create new event
    const handleCreate = async () => {
        try {
            const response = await instance.post('/events', {
                ...formData,
                media_ids: selectedMediaIDs,
            });
            if (response && response.data) {
                message.success('Event created successfully');
                setUpdateResponse(response.data);
                setCreateMode(false);
                fetchEvents();
            }
        } catch (error) {
            message.error('Error creating event');
        }
    }





    return (
        <div className="ViewContainer">
            <div className="ViewContentContainer">
                <div className="PageHeader" style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <h1>Events</h1>

                    {
                        createMode ? (
                            <>

                                <Button danger
                                    style={{
                                        borderRadius: "10px",
                                        fontSize: "1.2em",
                                        marginRight: "1em",
                                        paddingBottom: "1.8em",
                                    }} icon={<CloseCircleFilled />}
                                    onClick={() => setCreateMode(false)}>Cancel Create</Button>
                            </>

                        ) : <Button type="primary"
                            style={{
                                backgroundColor: "var(--theme)",
                                borderColor: "var(--theme)",
                                color: "white",
                                borderRadius: "10px",
                                fontSize: "1.2em",
                                marginRight: "1em",
                                paddingBottom: "1.8em",
                            }} icon={<CheckCircleFilled />}
                            onClick={() => setCreateMode(true)}>Create New</Button>
                    }
                </div>

                <div className="pageContainers">
                    {
                        createMode ? (
                            <div className="pageContainer">
                                <div className="pageContainerHeader">
                                    <h2>Create Event</h2>
                                    <div className="pageContainerBody">

                                        <Input
                                            placeholder="Event Name (English)"
                                            style={{
                                                marginBottom: "1em",
                                            }}
                                            value={formData?.title_en}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    title_en: e.target.value,
                                                });
                                            }}
                                        />
                                        <Input
                                            placeholder="Event Name (Bangla)"
                                            style={{
                                                marginBottom: "1em",
                                            }}
                                            value={formData?.title_bn}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    title_bn: e.target.value,
                                                });
                                            }}
                                        />
                                        <DatePicker
                                            allowClear={false}
                                            onChange={handleDateChange}
                                        />
                                        <br /><br />
                                        <Button
                                            icon={<SyncOutlined />}
                                            onClick={() => setModalVisible(true)}
                                            style={{
                                                marginBottom: "1em",
                                            }}
                                        >
                                            Select Images
                                        </Button>
                                        <br /><br />
                                        <Modal title="Select Images"
                                            open={modalVisible}
                                            width="60%"
                                            footer={[
                                                <Button
                                                    key="back"
                                                    onClick={() => {
                                                        oncancel();
                                                    }
                                                    }
                                                >
                                                    Cancel
                                                </Button>,
                                                <Button
                                                    key="submit"
                                                    type="primary"
                                                    onClick={() => {
                                                        onOk();
                                                    }}
                                                >
                                                    Submit
                                                </Button>
                                            ]}
                                        >
                                            <MediaSelectionModal
                                                setSelectedMedia={setSelectedMediaIDs}
                                                selectedMedia={selectedMediaIDs}
                                                handleMediaSelection={handleMediaSelection}
                                            />
                                        </Modal>
                                        <br /><br />
                                        <h3>Selected Gallery</h3>
                                        <div style={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(3, 1fr)",
                                            gridGap: "1em",
                                            marginTop: "1em",
                                        }}>
                                            {
                                                selectedMediaIDs?.map((mediaId) => {
                                                    const mediaItem = media?.find((media) => media.id === mediaId);
                                                    return (
                                                        <div key={mediaItem.id}>
                                                            {
                                                                mediaItem?.file_type.startsWith('image') ? (
                                                                    <Image
                                                                        preview={false}
                                                                        src={`${MEDIA_URL}/${mediaItem?.file_path}`}
                                                                        alt="Hero Image"
                                                                        width="16vw"
                                                                        height="16vh"
                                                                        objectFit="cover"
                                                                        style={{
                                                                            borderRadius: 10,
                                                                        }}

                                                                    />
                                                                ) : mediaItem?.file_type.startsWith('video') ? (
                                                                    <video
                                                                        autoPlay
                                                                        muted
                                                                        loop
                                                                        style={{
                                                                            width: "16vw",
                                                                            height: "10vh",
                                                                            borderRadius: 10,
                                                                            objectFit: 'cover',
                                                                        }}
                                                                        src={`${MEDIA_URL}/${mediaItem?.file_path}`}
                                                                    >
                                                                        Your browser does not support the video tag.
                                                                    </video>
                                                                ) : (
                                                                    <img
                                                                        src="/images/Image_Placeholder.png"
                                                                        style={{
                                                                            height: "200px",
                                                                            width: "18vw",
                                                                            objectFit: 'cover',
                                                                            borderRadius: 10,
                                                                        }}
                                                                    />
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }
                                                )
                                            }
                                        </div>
                                    </div>
                                    <Button
                                        style={{
                                            backgroundColor: "var(--theme)",
                                            borderColor: "var(--theme)",
                                            color: "white",
                                            borderRadius: "10px",
                                            fontSize: "1.2em",
                                            marginRight: "1em",
                                            paddingBottom: "1.8em",
                                        }}
                                        icon={<CheckCircleFilled />}
                                        onClick={() => {
                                            handleCreate();
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        ) : null
                    }

                    <Row gutter={[16, 16]}>
                        {
                            events?.map((event) => (
                                <Col key={event.id} xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Card
                                        title={`Event ID: ${event.id}`}
                                        extra={
                                            <div>
                                                <Button onClick={() => handleExpand(event?.id)}>
                                                    {expandedEvent === event.id ? 'Collapse' : 'Expand'}
                                                </Button>
                                            </div>
                                        }
                                        style={{
                                            marginBottom: "5em",
                                            marginTop: "3em",
                                            border: "1px solid var(--theme)",
                                            borderRadius: 10,
                                        }}
                                    >
                                        {
                                            expandedEvent === event?.id && (
                                                <div>
                                                    <center>
                                                        {
                                                            editMode ?
                                                                (
                                                                    <>
                                                                        <Button danger
                                                                            style={{
                                                                                borderRadius: "10px",
                                                                                fontSize: "1.2em",
                                                                                marginRight: "1em",
                                                                                paddingBottom: "1.8em",
                                                                            }}
                                                                            icon={<CloseCircleFilled />}
                                                                            onClick={() => {
                                                                                setEditMode(false);
                                                                            }}>Cancel Edit</Button>
                                                                        <Button
                                                                            type="primary"
                                                                            style={{
                                                                                backgroundColor: 'var(--theme)',
                                                                                borderColor: 'var(--theme)',
                                                                                color: 'white',
                                                                                borderRadius: '10px',
                                                                                fontSize: '1.2em',
                                                                                marginRight: '1em',
                                                                                paddingBottom: '1.8em',
                                                                            }}
                                                                            icon={<CheckCircleFilled />}
                                                                            onClick={() => {
                                                                                handleUpdate(event.id);
                                                                            }}
                                                                        >
                                                                            Submit
                                                                        </Button>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Button type="primary"
                                                                            style={{
                                                                                backgroundColor: "var(--theme)",
                                                                                borderColor: "var(--theme)",
                                                                                color: "white",
                                                                                borderRadius: "10px",
                                                                                fontSize: "1.2em",
                                                                                marginRight: "1em",
                                                                                paddingBottom: "1.8em",
                                                                            }}
                                                                            icon={<EditOutlined />}
                                                                            onClick={() => {
                                                                                handleEditPageClick(event.id);
                                                                            }}>Edit Event</Button>
                                                                        <Popconfirm
                                                                            title="Are you sure to delete this event?"
                                                                            onConfirm={() => handleDelete(event.id)}
                                                                            okText="Yes"
                                                                            cancelText="No"
                                                                        >
                                                                            <Button danger
                                                                                style={{
                                                                                    borderRadius: "10px",
                                                                                    fontSize: "1.2em",
                                                                                    marginRight: "1em",
                                                                                    paddingBottom: "1.8em",
                                                                                }}
                                                                                icon={<DeleteOutlined />}
                                                                            >Delete Event</Button>
                                                                        </Popconfirm>
                                                                    </>
                                                                )
                                                        }
                                                    </center>
                                                    <div className="pageContainer" style={{
                                                        marginTop: "2em",
                                                    }}>
                                                        {
                                                            editMode ? (
                                                                <div>
                                                                    <Input
                                                                        defaultValue={event?.title_en}
                                                                        placeholder="Event Name (English)"
                                                                        style={{
                                                                            marginBottom: "1em",
                                                                        }}
                                                                        value={formData?.title_en}
                                                                        onChange={(e) => {
                                                                            setFormData({
                                                                                ...formData,
                                                                                title_en: e.target.value,
                                                                            });
                                                                        }}
                                                                    />
                                                                    <Input
                                                                        defaultValue={event?.title_bn}
                                                                        placeholder="Event Name (Bangla)"
                                                                        style={{
                                                                            marginBottom: "1em",
                                                                        }}
                                                                        value={formData?.title_bn}
                                                                        onChange={(e) => {
                                                                            setFormData({
                                                                                ...formData,
                                                                                title_bn: e.target.value,
                                                                            });
                                                                        }}
                                                                    />
                                                                    <DatePicker
                                                                        allowClear={false}
                                                                        onChange={handleDateChange}
                                                                    />
                                                                    <br /><br />

                                                                    <h3>Current Gallery</h3>
                                                                    <div style={{
                                                                        display: "grid",
                                                                        gridTemplateColumns: "repeat(3, 1fr)",
                                                                        gridGap: "1em",
                                                                        marginTop: "1em",
                                                                    }}>
                                                                        {
                                                                            event?.medias_mave?.map((media) => (
                                                                                <div key={media.id}>
                                                                                    {
                                                                                        media?.file_type.startsWith('image') ? (
                                                                                            <Image
                                                                                                preview={false}
                                                                                                src={`${MEDIA_URL}/${media?.file_path}`}
                                                                                                alt="Hero Image"
                                                                                                width="16vw"
                                                                                                height="16vh"
                                                                                                objectFit="cover"
                                                                                                style={{
                                                                                                    borderRadius: 10,
                                                                                                }}

                                                                                            />
                                                                                        ) : media?.file_type.startsWith('video') ? (
                                                                                            <video
                                                                                                autoPlay
                                                                                                muted
                                                                                                loop
                                                                                                style={{
                                                                                                    width: "16vw",
                                                                                                    height: "10vh",
                                                                                                    borderRadius: 10,
                                                                                                    objectFit: 'cover',
                                                                                                }}
                                                                                                src={`${MEDIA_URL}/${media?.file_path}`}
                                                                                            >
                                                                                                Your browser does not support the video tag.
                                                                                            </video>
                                                                                        ) : (
                                                                                            <img
                                                                                                src="/images/Image_Placeholder.png"
                                                                                                style={{
                                                                                                    height: "200px",
                                                                                                    width: "18vw",
                                                                                                    objectFit: 'cover',
                                                                                                    borderRadius: 10,
                                                                                                }}
                                                                                            />
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                    <br /><br />
                                                                    <Button
                                                                        icon={<SyncOutlined />}
                                                                        onClick={() => setModalVisible(true)}
                                                                        style={{
                                                                            marginBottom: "1em",
                                                                        }}
                                                                    >
                                                                        Change Images
                                                                    </Button>
                                                                    <br /><br />
                                                                    <Modal title="Select Images"
                                                                        open={modalVisible}
                                                                        width="50%"
                                                                        footer={[
                                                                            <Button
                                                                                key="back"
                                                                                onClick={() => {
                                                                                    oncancel();
                                                                                }
                                                                                }
                                                                            >
                                                                                Cancel
                                                                            </Button>,
                                                                            <Button
                                                                                key="submit"
                                                                                type="primary"
                                                                                onClick={() => {
                                                                                    onOk();
                                                                                }}
                                                                            >
                                                                                Submit
                                                                            </Button>
                                                                        ]}
                                                                    >
                                                                        <MediaSelectionModal
                                                                            setSelectedMedia={setSelectedMediaIDs}
                                                                            selectedMedia={selectedMediaIDs}
                                                                            handleMediaSelection={handleMediaSelection}
                                                                        />
                                                                    </Modal>
                                                                    <br /><br />
                                                                    <h3>Selected Gallery</h3>
                                                                    <div style={{
                                                                        display: "grid",
                                                                        gridTemplateColumns: "repeat(3, 1fr)",
                                                                        gridGap: "1em",
                                                                        marginTop: "1em",
                                                                    }}>
                                                                        {
                                                                            selectedMediaIDs?.map((mediaId) => {
                                                                                const mediaItem = media?.find((media) => media.id === mediaId);
                                                                                return (
                                                                                    <div key={mediaItem.id}>
                                                                                        {
                                                                                            mediaItem?.file_type.startsWith('image') ? (
                                                                                                <Image
                                                                                                    preview={false}
                                                                                                    src={`${MEDIA_URL}/${mediaItem?.file_path}`}
                                                                                                    alt="Hero Image"
                                                                                                    width="16vw"
                                                                                                    height="16vh"
                                                                                                    objectFit="cover"
                                                                                                    style={{
                                                                                                        borderRadius: 10,
                                                                                                    }}

                                                                                                />
                                                                                            ) : mediaItem?.file_type.startsWith('video') ? (
                                                                                                <video
                                                                                                    autoPlay
                                                                                                    muted
                                                                                                    loop
                                                                                                    style={{
                                                                                                        width: "16vw",
                                                                                                        height: "10vh",
                                                                                                        borderRadius: 10,
                                                                                                        objectFit: 'cover',
                                                                                                    }}
                                                                                                    src={`${MEDIA_URL}/${mediaItem?.file_path}`}
                                                                                                >
                                                                                                    Your browser does not support the video tag.
                                                                                                </video>
                                                                                            ) : (
                                                                                                <img
                                                                                                    src="/images/Image_Placeholder.png"
                                                                                                    style={{
                                                                                                        height: "200px",
                                                                                                        width: "18vw",
                                                                                                        objectFit: 'cover',
                                                                                                        borderRadius: 10,
                                                                                                    }}
                                                                                                />
                                                                                            )
                                                                                        } </div>)
                                                                            })}</div>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <div key={event.id} style={{
                                                                        margin: "2em 1em",
                                                                        border: "2px solid var(--theme)",
                                                                        borderRadius: 10,
                                                                        padding: "2em 1em",
                                                                    }}>
                                                                        <h3>
                                                                            Event Name (English): {event.title_en}
                                                                        </h3>
                                                                        <h3>
                                                                            Event Name (Bangla): {event.title_bn}
                                                                        </h3>
                                                                        <h3>
                                                                            Event Date: {event.event_date}
                                                                        </h3>
                                                                        <div style={{
                                                                            display: "grid",
                                                                            gridTemplateColumns: "repeat(3, 1fr)",
                                                                            gridGap: "1em",
                                                                            marginTop: "1em",
                                                                        }}>
                                                                            {
                                                                                event?.medias_mave?.map((media) => (
                                                                                    <div key={media.id}>
                                                                                        {
                                                                                            media?.file_type.startsWith('image') ? (
                                                                                                <Image
                                                                                                    src={`${MEDIA_URL}/${media?.file_path}`}
                                                                                                    alt="Hero Image"
                                                                                                    width="16vw"
                                                                                                    height="16vh"
                                                                                                    objectFit="cover"
                                                                                                    style={{
                                                                                                        borderRadius: 10,
                                                                                                    }}

                                                                                                />
                                                                                            ) : media?.file_type.startsWith('video') ? (
                                                                                                <video
                                                                                                    autoPlay
                                                                                                    muted
                                                                                                    loop
                                                                                                    style={{
                                                                                                        width: "16vw",
                                                                                                        height: "10vh",
                                                                                                        borderRadius: 10,
                                                                                                        objectFit: 'cover',
                                                                                                    }}
                                                                                                    src={`${MEDIA_URL}/${media?.file_path}`}
                                                                                                >
                                                                                                    Your browser does not support the video tag.
                                                                                                </video>
                                                                                            ) : (
                                                                                                <img
                                                                                                    src="/images/Image_Placeholder.png"
                                                                                                    style={{
                                                                                                        height: "200px",
                                                                                                        width: "18vw",
                                                                                                        objectFit: 'cover',
                                                                                                        borderRadius: 10,
                                                                                                    }}
                                                                                                />
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>)
                                                        }
                                                    </div>

                                                </div>
                                            )
                                        }
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default Events;