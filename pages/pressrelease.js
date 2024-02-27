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
    message
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
    RestOutlined
} from '@ant-design/icons';
import Loader from '../components/Loader';
import SingleMediaSelect from '../components/SingleMediaSelect';
import CreateCardForm from '../components/CreateCardForm';
import { setPageTitle } from '../global/constants/pageTitle';
import Link from 'next/link';
import RichTextEditor from '../components/RichTextEditor';

const PressRelease = () => {

    const [loading, setLoading] = useState(false);
    const [pressReleases, setPressReleases] = useState(null);
    const [updateResponse, setUpdateResponse] = useState(null);
    const [cards, setCards] = useState([]);
    const [media, setMedia] = useState([]);
    const [videos, setVideos] = useState([]);
    const [expandedPressRelease, setExpandedPressRelease] = useState(null);
    const [selectedPressReleaseId, setSelectedPressReleaseId] = useState(null);
    const [formData, setFormData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [createMode, setCreateMode] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

    const fetchPressReleases = async () => {
        try {
            setLoading(true);
            const response = await instance.get('/press_release');
            if (response && response.data) {
                setPressReleases(response.data);
                // console.log("Press Releases", response.data);
                message.success("Press Releases fetched successfully");
                setLoading(false);
            } else {
                message.error("Press Releases couldn't be fetched");
            }
        } catch (error) {
            message.error("Press Releases couldn't be fetched");
        }
    }

    useEffect(() => {
        fetchPressReleases();
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

    // get media id and render media
    const renderMedia = (mediaId) => {
        const selectedMedia = media.find(media => media.id === parseInt(mediaId));
        if (selectedMedia) {
            return (
                <div>
                    {
                        selectedMedia.file_type.startsWith('image') ? (
                            <Image
                                width={200}
                                height={200}
                                src={`${MEDIA_URL}/${selectedMedia.file_path}`} />
                        ) :
                            selectedMedia.file_type.startsWith('video') ?
                                (
                                    <video width="320" height="240" autoPlay loop muted>
                                        <source src={`${MEDIA_URL}/${selectedMedia.file_path}`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )
                                : null
                    }
                </div>
            );
        }
    }


    const handleExpand = (pressReleaseId) => {
        if (expandedPressRelease === pressReleaseId) {
            setExpandedPressRelease(null);
        } else {
            setExpandedPressRelease(pressReleaseId);
        }
    }

    const handleEditPageClick = (pressReleaseId) => {
        setSelectedPressReleaseId(pressReleaseId);
        setEditMode(true);
        setCreateMode(false);

        const selectedPressRelease = pressReleases.find(pressRelease => pressRelease.id === pressReleaseId);

        if (selectedPressRelease) {
            setFormData({
                card_ids: selectedPressRelease?.card_ids,
            });
        }
    }

    // Delete Page
    const handleDeletePage = async (pressReleaseId) => {
        try {
            Modal.confirm({
                title: 'Are you sure you want to delete this press release?',
                icon: <DeleteOutlined />,
                content: 'This action cannot be undone',
                okText: 'Delete',
                okType: 'danger',
                cancelText: 'Cancel',
                onOk: async () => {
                    const response = await instance.delete(`/press_release/${pressReleaseId}`);
                    if (response && response.data) {
                        setUpdateResponse(response.data);
                        fetchPressReleases();
                    }

                }
            });
        } catch (error) {
            message.error(error.message);
            // console.log("Error deleting press release", error);
        }
    };

    const handleFormChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value
        });
    }

    const handleSubmit = async () => {
        if (!selectedPressReleaseId || !formData) {
            return;
        }

        try {
            const response = await instance.put(`/press_release/${selectedPressReleaseId}`, formData);
            if (response?.status === 200) {
                setUpdateResponse(response.data);
                fetchPressReleases();
            }
            setEditMode(false);
            setCreateMode(false);
            setFormData(null);
        } catch (error) {
            message.error(error.message);
            // console.log("Error updating press release", error);
        }
    }

    const handleCreatePressRelease = async () => {
        if (!formData) {
            return;
        }

        try {
            const response = await instance.post('/press_release', formData);
            if (response?.status === 200) {
                setUpdateResponse(response.data);
                fetchPressReleases();
            }
            setEditMode(false);
            setCreateMode(false);
            setFormData(null);
            fetchPressReleases();
        } catch (error) {
            message.error(error.message);
            // console.log("Error creating press release", error);
        }
    }



    return (
        <div className="ViewContainer">
            <div className="ViewContentContainer">
                <div className="PageHeader" style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <h1>Press Releases</h1>

                    {
                        createMode ? (
                            <Button danger
                                style={{
                                    borderRadius: "10px",
                                    fontSize: "1.2em",
                                    marginRight: "1em",
                                    paddingBottom: "1.8em",
                                }} icon={<CloseCircleFilled />}
                                onClick={() => setCreateMode(false)}>Cancel Create</Button>
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
                                    <h2>Create New Press Release</h2>
                                    <div className="formGroup">
                                        <label>Card IDs</label>
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            style={{ width: '100%' }}
                                            placeholder="Select Cards"
                                            value={formData?.card_ids}
                                            onChange={(value) => handleFormChange('card_ids', value)}
                                        >
                                            {
                                                cards?.map((card) => (
                                                    <Select.Option key={card.id} value={card.id}>
                                                        {card.title_en}
                                                    </Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </div>
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
                                        onClick={handleCreatePressRelease}
                                    >
                                        Create
                                    </Button>
                                </div>
                            </div>
                        ) : null
                    }

                    <Row gutter={[16, 16]}>
                        {
                            pressReleases?.map((pressRelease) => (
                                <Col key={pressRelease.id} xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Card
                                        title={`Press Release ID: ${pressRelease.id}`}
                                        extra={
                                            <div>
                                                <Button onClick={() => handleExpand(pressRelease?.id)}>
                                                    {expandedPressRelease === pressRelease.id ? 'Collapse' : 'Expand'}
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
                                            expandedPressRelease === pressRelease?.id && (
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
                                                                            onClick={handleSubmit}
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
                                                                                handleEditPageClick(pressRelease.id);
                                                                            }}>Edit Press Release</Button>
                                                                        <Button danger
                                                                            style={{
                                                                                borderRadius: "10px",
                                                                                fontSize: "1.2em",
                                                                                marginRight: "1em",
                                                                                paddingBottom: "1.8em",
                                                                            }}
                                                                            icon={<DeleteFilled />}
                                                                            onClick={() => {
                                                                                handleDeletePage(pressRelease.id);
                                                                            }}>Delete Press Release</Button>
                                                                    </>
                                                                )
                                                        }
                                                    </center>
                                                    <div className="pageContainer">
                                                        {
                                                            editMode ? (<>
                                                                <div>
                                                                    <h3>Card IDs</h3>
                                                                    <Select
                                                                        mode="multiple"
                                                                        allowClear
                                                                        showSearch
                                                                        filterOption={(input, option) =>
                                                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                        }
                                                                        style={{
                                                                            width: '100%',
                                                                            borderRadius: 10,
                                                                        }}
                                                                        placeholder="Select Tabs"
                                                                        defaultValue={formData?.card_ids}
                                                                        value={formData?.card_ids}
                                                                        onChange={(value) => handleFormChange('card_ids', value)}
                                                                    >
                                                                        {
                                                                            cards?.map((card) => (
                                                                                <Select.Option key={card.id} value={card.id}>
                                                                                    {card.title_en}
                                                                                </Select.Option>
                                                                            ))
                                                                        }
                                                                    </Select>
                                                                </div>

                                                            </>) : (
                                                                <div style={{
                                                                    display: "grid",
                                                                    gridTemplateColumns: "1fr 1fr",
                                                                    gridGap: "1em",
                                                                    marginTop: "1em",
                                                                }}>
                                                                    {
                                                                        pressRelease?.cards_mave?.map((card) => (
                                                                            <div key={card.id} style={{
                                                                                padding: "1em 0.5em",
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                                alignItems: "center",
                                                                                border: "1px solid var(--theme)",
                                                                                borderRadius: 10,
                                                                            }}>
                                                                                <div>
                                                                                    <h3>{card.title_en}</h3>
                                                                                    <h3>{card.title_bn}</h3>
                                                                                    {/* Read more button open modal */}
                                                                                    <Button type="primary" style={{
                                                                                        backgroundColor: "transparent",
                                                                                        borderColor: "transparent",
                                                                                        color: "var(--theme)",
                                                                                        borderRadius: "10px",
                                                                                        fontSize: "1.2em",
                                                                                        margin: "2em 0",
                                                                                        paddingBottom: "1.8em",
                                                                                    }} icon={<ArrowRightOutlined />}
                                                                                    >
                                                                                        Read More
                                                                                    </Button>
                                                                                </div>
                                                                                {
                                                                                    typeof card.media_ids === 'string' ?
                                                                                        renderMedia(card.media_ids)
                                                                                        :
                                                                                        (
                                                                                            <>
                                                                                                {
                                                                                                    card?.media_mave?.file_type.startsWith('image') ? (
                                                                                                        <Image
                                                                                                            src={`${MEDIA_URL}/${card?.media_mave?.file_path}`}
                                                                                                            alt="Hero Image"
                                                                                                            style={{
                                                                                                                height: '200px',
                                                                                                                width: '18vw',
                                                                                                                objectFit: 'contain',
                                                                                                                borderRadius: 10,
                                                                                                            }}
                                                                                                        />
                                                                                                    ) : card?.media_mave?.file_type.startsWith('video') ? (
                                                                                                        <video
                                                                                                            autoPlay
                                                                                                            muted
                                                                                                            width="30%"
                                                                                                            height="auto"
                                                                                                            objectFit="contain"
                                                                                                            src={`${MEDIA_URL}/${card?.media_mave?.file_path}`}
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
                                                                                            </>
                                                                                        )

                                                                                }
                                                                            </div>))
                                                                    }
                                                                </div>
                                                            )
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

export default PressRelease;