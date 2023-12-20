import React, { useEffect, useState } from "react";
import instance from "../axios";
import { Button, Card, Col, Input, Row, Select, Image, Carousel } from "antd";
import { CheckCircleFilled, CloseCircleFilled, DeleteFilled, EditOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import RichTextEditor from "../components/RichTextEditor";
import MediaSelectionModal1 from "../components/MediaSelectionModal1";

const Autogas = () => {
    const [loading, setLoading] = useState(false);
    const [autogasPages, setAutogasPages] = useState([]);
    const [updateResponse, setUpdateResponse] = useState(null);
    const [cards, setCards] = useState([]);
    const [media, setMedia] = useState([]);
    const [videos, setVideos] = useState([]);
    const [expandedAutogasPageId, setExpandedAutogasPageId] = useState(null);
    const [selectedPageId, setSelectedPageId] = useState(null);
    const [formData, setFormData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [createMode, setCreateMode] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;


    const fetchAutogasPages = async () => {
        try {
            setLoading(true);
            const response = await instance.get("/autogas");
            if (response.data) {
                setAutogasPages(response.data);
                setLoading(false);
                console.log("Page Data: ", response.data);
            } else {
                console.log("No data was returned");
                message.error("No data was returned");
            }
        } catch (error) {
            console.log(error);
            message.error(error);
        }
    }

    useEffect(() => {
        fetchAutogasPages();
    }, [setUpdateResponse]);

    // Fetch Cards
    const fetchCards = async () => {
        try {
            setLoading(true);
            const response = await instance.get("/cards");
            if (response.data) {
                setCards(response.data);
                setLoading(false);
                console.log("Cards Data: ", response.data);
            } else {
                console.log("No data was returned");
                message.error("No data was returned");
            }
        } catch (error) {
            console.log(error);
            message.error(error);
        }
    }

    useEffect(() => {
        fetchCards();
    }
        , []);

    // Fetch Media
    const fetchMedia = async () => {
        try {
            setLoading(true);
            const response = await instance.get("/media");
            if (response.data) {
                setMedia(response.data);
                setLoading(false);
                console.log("Media Data: ", response.data);
            } else {
                console.log("No data was returned");
                message.error("No data was returned");
            }
        } catch (error) {
            console.log(error);
            message.error(error);
        }
    }

    useEffect(() => {
        fetchMedia();
    }, []);



    // --------------- Page Operations --------------- //
    // Filter videos
    const video = media.filter((mediaItem) => mediaItem.file_type.startsWith('video'));

    useEffect(() => {
        setVideos(video);
    }, [media]);

    const handleExpand = (autogaspageId) => {
        if (expandedAutogasPageId === autogaspageId) {
            setExpandedAutogasPageId(null);
        } else {
            setExpandedAutogasPageId(autogaspageId);
        }
    };

    const handleEditPageClick = (pageId) => {
        setSelectedPageId(pageId);
        setEditMode(true);

        const selectedData = autogasPages.find((autogasPage) => autogasPage.id === pageId);
        setFormData({
            title_en: selectedData.title_en,
            title_bn: selectedData.title_bn,
            media_id: selectedData.media_id,
            title2_en: selectedData.title2_en,
            title2_bn: selectedData.title2_bn,
            description_en: selectedData.description_en,
            description_bn: selectedData.description_bn,
            title3_en: selectedData.title3_en,
            title3_bn: selectedData.title3_bn,
            cards_id: selectedData.cards_id,
            title4_en: selectedData.title4_en,
            title4_bn: selectedData.title4_bn,
            cards2_id: selectedData.cards2_id,
            title5_en: selectedData.title5_en,
            title5_bn: selectedData.title5_bn,
            cards3_id: selectedData.cards3_id,
            status: selectedData.status,
        });
    };

    // Delete Page
    const handleDeletePage = async (pageId) => {
        try {
            Modal.confirm({
                title: 'Confirm',
                content: 'Are you sure you want to delete this card?',
                okText: 'Yes',
                cancelText: 'No',
                onOk: () => {
                    instance.delete(`/about/${pageId}`).then((res) => {
                        // Refresh card data after deletion
                        instance.get('/about').then((res) => {
                            setAboutpages(res.data);
                        });
                    });
                }
            });
        } catch (error) {
            console.error('Error deleting page:', error);
        }
    };

    const handleFormChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    const handleSubmit = async () => {
        if (!selectedPageId || !formData) {
            return;
        }

        try {
            const response = await instance.put(`/autogas/${selectedPageId}`, formData);
            if (response?.status === 200) {
                setUpdateResponse(response);
            }
            fetchAutogasPages();
            setEditMode(false);
            setSelectedPageId(null);
        }
        catch (error) {
            console.error('Error updating page:', error);
        }
    };

    useEffect(() => {
        // Update formData when selectedMedia changes
        if (selectedMedia) {
            setFormData({
                ...formData,
                media_ids: selectedMedia,
            });
        }
    }, [selectedMedia]);

    const handleOk = () => {
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);

    };

    const handleOpenModal = () => {
        setModalVisible(true);
    }
    const handleModalCancel = () => {
        setModalVisible(false);
    };

    const handleMediaSelect = (media) => {
        setSelectedMedia(media);
        setModalVisible(false);
        setFormData({ ...formData, media_id: media.id });
    };

    // Slider arrows
    const CustomPrevArrow = ({ onClick }) => (
        <Button
            icon={<LeftOutlined />}
            onClick={onClick}
            size="large"
            style={{
                position: "absolute",
                top: "50%",
                left: 0,
                zIndex: "1",
                backgroundColor: "#bababa80",
                border: "none",
                color: "var(--black)",
                width: "100px",
                height: "60px",
                marginLeft: "20px",
            }}
        ></Button>
    );

    const CustomNextArrow = ({ onClick }) => (
        <Button
            icon={<RightOutlined />}
            onClick={onClick}
            size="large"
            style={{
                position: "absolute",
                top: "50%",
                right: 0,
                zIndex: "1",
                backgroundColor: "transparent",
                border: "none",
                backgroundColor: "#bababaac",
                border: "none",
                color: "var(--black)",
                width: "100px",
                height: "60px",
                marginRight: "20px",
            }}
        ></Button>
    );

    return (
        <div className="ViewContainer ViewContentContainer">
            <div className="PageHeader" style={{
                display: "flex",
                justifyContent: "space-between",
            }}>
                <h1>Autogas Page</h1>

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

            {/* Pages COntainer */}
            <div className="pageContainers">
                <div className="pageContainer">
                    {
                        createMode ? (
                            <>
                                <div className="createMode" style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    border: "3px solid var(--theme)",
                                    borderRadius: 10,
                                    backgroundColor: "#f0f0f0",
                                    padding: "4em 1em",
                                }}>
                                    <h1>Create Mode on</h1>
                                    <div className="createModeContainer" style={{
                                        padding: "2em 0",
                                    }}>
                                        {/* Content goes here */}
                                        <h1>New page forms</h1>
                                    </div>
                                </div>
                            </>
                        ) : null
                    }

                    {/* Page List */}
                    <Row gutter={[16, 16]}>
                        {
                            autogasPages?.map((autogasPage) => (
                                <Col key={autogasPage?.id} xs={24} sm={24}>
                                    <Card
                                        title={`Page ID: ${autogasPage?.id}`}
                                        extra={
                                            <Button onClick={() => handleExpand(autogasPage?.id)}>
                                                {expandedAutogasPageId === autogasPage.id ? 'Collapse' : 'Expand'}
                                            </Button>
                                        }
                                        style={{ marginBottom: "5em", marginTop: "3em", border: "1px solid var(--theme)", borderRadius: 10, }}
                                    >
                                        {
                                            expandedAutogasPageId === autogasPage?.id && (
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
                                                                                handleEditPageClick(autogasPage.id);
                                                                            }}>Edit Page</Button>
                                                                        <Button danger
                                                                            style={{
                                                                                borderRadius: "10px",
                                                                                fontSize: "1.2em",
                                                                                marginRight: "1em",
                                                                                paddingBottom: "1.8em",
                                                                            }}
                                                                            icon={<DeleteFilled />}
                                                                            onClick={() => {
                                                                                handleDeletePage(autogasPage.id);
                                                                            }}>Delete Page</Button>
                                                                    </>
                                                                )
                                                        }
                                                    </center>
                                                    <div className="pageContainer" style={{
                                                        padding: "2em 0",
                                                    }}>

                                                        {/* Content goes here */}
                                                        <h2 style={{
                                                            marginTop: "2em",
                                                            color: "var(--theme)",
                                                            textAlign: "center",
                                                        }}>Hero Section</h2>
                                                        {
                                                            editMode ? (
                                                                <>
                                                                    <Input placeholder="Title (English)" value={formData?.title_en} onChange={(e) => handleFormChange('title_en', e.target.value)} />
                                                                    <br /><br /><Input placeholder="Title (Bangla)" value={formData?.title_bn} onChange={(e) => handleFormChange('title_bn', e.target.value)} />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <h4>{autogasPage?.title_en}</h4>
                                                                    <br /><br /><h4>{autogasPage?.title_bn}</h4>
                                                                </>
                                                            )
                                                        }

                                                        {/* Hero Image */}
                                                        {
                                                            editMode ? (
                                                                <>
                                                                    <Button type="primary" onClick={handleOpenModal} style={{ marginTop: "1rem" }}>
                                                                        Change Image
                                                                    </Button>

                                                                    <MediaSelectionModal1
                                                                        mediaList={media}
                                                                        visible={modalVisible}
                                                                        onCancel={handleModalCancel}
                                                                        onSelect={handleMediaSelect}
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {
                                                                        autogasPage?.media_mave?.file_type.startsWith('image') ? (
                                                                            <Image
                                                                                src={`${MEDIA_URL}/${autogasPage?.media_mave?.file_path}`}
                                                                                alt="Hero Image"
                                                                                style={{
                                                                                    height: '200px',
                                                                                    width: '18vw',
                                                                                    objectFit: 'contain',
                                                                                    borderRadius: 10,
                                                                                }}
                                                                            />
                                                                        ) : autogasPage?.media_mave?.file_type.startsWith('video') ? (
                                                                            <video
                                                                                autoPlay
                                                                                muted
                                                                                width="30%"
                                                                                height="auto"
                                                                                objectFit="contain"
                                                                                src={`${MEDIA_URL}/${autogasPage?.media_mave?.file_path}`}
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


                                                        <h2 style={{
                                                            marginTop: "2em",
                                                            color: "var(--theme)",
                                                            textAlign: "center",
                                                        }}>Section 2</h2>
                                                        {
                                                            editMode ? (
                                                                <>
                                                                    <Input placeholder="Title (English)" value={formData?.title2_en} onChange={(e) => handleFormChange('title2_en', e.target.value)} />
                                                                    <br /><br /><Input placeholder="Title (Bangla)" value={formData?.title2_bn} onChange={(e) => handleFormChange('title2_bn', e.target.value)} />
                                                                    <br /><br /><RichTextEditor
                                                                        defaultValue={autogasPage.description_en}
                                                                        editMode={editMode}
                                                                        onChange={(value) => handleFormChange('description_en', value)}
                                                                        style={{
                                                                            textAlign: "left",
                                                                            fontSize: "1.1rem",
                                                                        }}
                                                                    />
                                                                    <br /><br /><RichTextEditor
                                                                        defaultValue={autogasPage.description_bn}
                                                                        editMode={editMode}
                                                                        onChange={(value) => handleFormChange('description_bn', value)}
                                                                        style={{
                                                                            textAlign: "left",
                                                                            fontSize: "1.1rem",
                                                                        }}
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <h4>{autogasPage?.title2_en}</h4>
                                                                    <br /><br /><h4>{autogasPage?.title2_bn}</h4>
                                                                    <br /><br /><div dangerouslySetInnerHTML={{ __html: autogasPage.description_en }}
                                                                        style={{
                                                                            textAlign: "left",
                                                                            fontSize: "1.1rem",
                                                                        }} />
                                                                    <br /><br />
                                                                    <br /><br /><div dangerouslySetInnerHTML={{ __html: autogasPage.description_bn }}
                                                                        style={{
                                                                            textAlign: "left",
                                                                            fontSize: "1.1rem",
                                                                        }} />
                                                                </>
                                                            )
                                                        }

                                                        <h2 style={{
                                                            marginTop: "2em",
                                                            color: "var(--theme)",
                                                            textAlign: "center",
                                                        }}>Section 4</h2>
                                                        {
                                                            editMode ? (
                                                                <>
                                                                    <Row gutter={[16, 16]} style={{
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                        alignItems: "center",
                                                                    }}>
                                                                        <Col xs={24} sm={24} md={8} lg={11}>
                                                                            <Input placeholder="Title (English)" value={formData?.title3_en} onChange={(e) => handleFormChange('title3_en', e.target.value)} />
                                                                            <br /><br />
                                                                            <Input placeholder="Title (Bangla)" value={formData?.title3_bn} onChange={(e) => handleFormChange('title3_bn', e.target.value)} />
                                                                            <br /><br />
                                                                        </Col>
                                                                        <Col xs={24} sm={24} md={8} lg={11}>
                                                                            <h3>Select Card</h3>
                                                                            <Select
                                                                                allowClear
                                                                                showSearch
                                                                                filterOption={(input, option) =>
                                                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                                }
                                                                                mode="multiple"
                                                                                placeholder="Select Card"
                                                                                value={formData?.cards_id}
                                                                                onChange={(value) => handleFormChange('cards_id', value)}
                                                                                style={{
                                                                                    width: "100%",
                                                                                    marginBottom: "2em",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    cards?.map((card) => (
                                                                                        <Select.Option key={card?.id} value={card?.id}>{card?.title_en}</Select.Option>
                                                                                    ))
                                                                                }
                                                                            </Select>
                                                                        </Col>
                                                                    </Row>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Row gutter={[16, 16]} style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                    }}>
                                                                        <Col xs={24} sm={24} md={8}>
                                                                            <h4>Title (English): {autogasPage?.title3_en}</h4>
                                                                            <h4>Title (Bangla): {autogasPage?.title3_bn}</h4>

                                                                            <Carousel
                                                                                arrows={true}
                                                                                next={<CustomPrevArrow />}
                                                                                prev={<CustomNextArrow />}
                                                                                autoplay
                                                                                slidesToShow={3}
                                                                                style={{
                                                                                    width: "50vw",
                                                                                }}
                                                                            >

                                                                                {autogasPage?.cards_mave?.map((card) => (
                                                                                    <div key={card?.id}>
                                                                                        <Card
                                                                                            title={card?.title_en}
                                                                                        >
                                                                                            <div className="cardContainer" style={{
                                                                                                display: "flex",
                                                                                                justifyContent: "space-between",
                                                                                            }}>
                                                                                                {card?.media_files?.file_type.startsWith('image') ? (
                                                                                                    <Image
                                                                                                        src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                                                                                                        alt="Card Media"
                                                                                                        style={{
                                                                                                            height: '200px',
                                                                                                            width: '18vw',
                                                                                                            objectFit: 'contain',
                                                                                                            borderRadius: 10,
                                                                                                        }}
                                                                                                    />
                                                                                                ) : autogasPage?.media_mave?.file_type.startsWith('video') ? (
                                                                                                    <video
                                                                                                        autoPlay
                                                                                                        muted
                                                                                                        width="100%"
                                                                                                        height="auto"
                                                                                                        objectFit="cover"
                                                                                                        src={`${MEDIA_URL}/${autogasPage?.media_mave?.file_path}`}
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
                                                                                                )}
                                                                                            </div>
                                                                                        </Card>
                                                                                    </div>
                                                                                ))}

                                                                            </Carousel>

                                                                        </Col>
                                                                    </Row>
                                                                </>
                                                            )
                                                        }

                                                        <h2 style={{
                                                            marginTop: "2em",
                                                            color: "var(--theme)",
                                                            textAlign: "center",
                                                        }}>Section 5</h2>
                                                        {
                                                            editMode ? (
                                                                <>
                                                                    <Row gutter={[16, 16]} style={{
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                        alignItems: "center",
                                                                    }}>
                                                                        <Col xs={24} sm={24} md={8} lg={11}>
                                                                            <Input placeholder="Title (English)"
                                                                                value={formData?.title4_en}
                                                                                onChange={(e) => handleFormChange('title4_en', e.target.value)} />
                                                                            <br /><br />
                                                                            <Input placeholder="Title (Bangla)"
                                                                                value={formData?.title4_bn}
                                                                                onChange={(e) => handleFormChange('title4_bn', e.target.value)} />
                                                                        </Col>
                                                                        <Col xs={24} sm={24} md={8} lg={11}>
                                                                            <h3>Select Card</h3>
                                                                            <Select
                                                                                allowClear
                                                                                showSearch
                                                                                filterOption={(input, option) =>
                                                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                                }
                                                                                mode="multiple"
                                                                                placeholder="Select Card"
                                                                                value={formData?.cards2_id}
                                                                                onChange={(value) => handleFormChange('cards2_id', value)}
                                                                                style={{
                                                                                    width: "100%",
                                                                                    marginBottom: "2em",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    cards?.map((card) => (
                                                                                        <Select.Option key={card?.id} value={card?.id}>{card?.title_en}</Select.Option>
                                                                                    ))
                                                                                }
                                                                            </Select>
                                                                        </Col>
                                                                    </Row>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Row gutter={[16, 16]} style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                    }}>
                                                                        <Col xs={24} sm={24} md={8}>
                                                                            <h4>Title (English): {autogasPage?.title4_en}</h4>
                                                                            <h4>Title (Bangla): {autogasPage?.title4_bn}</h4>

                                                                            <Carousel
                                                                                arrows={true}
                                                                                next={<CustomPrevArrow />}
                                                                                prev={<CustomNextArrow />}
                                                                                autoplay
                                                                                slidesToShow={3}
                                                                                style={{
                                                                                    width: "50vw",
                                                                                }}
                                                                            >
                                                                                {autogasPage?.cards2_mave?.map((card) => (
                                                                                    <div key={card?.id}>
                                                                                        <Card
                                                                                            title={card?.title_en}
                                                                                        >
                                                                                            <div className="cardContainer" style={{
                                                                                                display: "flex",
                                                                                                justifyContent: "space-between",
                                                                                            }}>
                                                                                                {card?.media_files?.file_type.startsWith('image') ? (
                                                                                                    <Image
                                                                                                        src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                                                                                                        alt="Card Media"
                                                                                                        style={{
                                                                                                            height: '200px',
                                                                                                            width: '18vw',
                                                                                                            objectFit: 'contain',
                                                                                                            borderRadius: 10,
                                                                                                        }}
                                                                                                    />
                                                                                                ) : autogasPage?.media_mave?.file_type.startsWith('video') ? (
                                                                                                    <video
                                                                                                        autoPlay
                                                                                                        muted
                                                                                                        width="100%"
                                                                                                        height="auto"
                                                                                                        objectFit="cover"
                                                                                                        src={`${MEDIA_URL}/${autogasPage?.media_mave?.file_path}`}
                                                                                                    >
                                                                                                        Your browser does not support the video tag.
                                                                                                    </video>
                                                                                                ) : (
                                                                                                    <Image
                                                                                                        src="/images/Image_Placeholder.png"
                                                                                                        style={{
                                                                                                            height: "200px",
                                                                                                            width: "18vw",
                                                                                                            objectFit: 'cover',
                                                                                                            borderRadius: 10,
                                                                                                        }}
                                                                                                    />
                                                                                                )}
                                                                                            </div>
                                                                                        </Card>
                                                                                    </div>
                                                                                ))}
                                                                            </Carousel>
                                                                        </Col>
                                                                    </Row>
                                                                </>
                                                            )
                                                        }


                                                        <h2 style={{
                                                            marginTop: "2em",
                                                            color: "var(--theme)",
                                                            textAlign: "center",
                                                        }}>Section 6</h2>
                                                        {
                                                            editMode ? (
                                                                <>
                                                                    <Row gutter={[16, 16]} style={{
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                        alignItems: "center",
                                                                    }}>
                                                                        <Col xs={24} sm={24} md={8} lg={11}>
                                                                            <Input placeholder="Title (English)"
                                                                                value={formData?.title5_en}
                                                                                onChange={(e) => handleFormChange('title5_en', e.target.value)} />
                                                                            <br /><br />
                                                                            <Input placeholder="Title (Bangla)"
                                                                                value={formData?.title5_bn}
                                                                                onChange={(e) => handleFormChange('title5_bn', e.target.value)} />
                                                                        </Col>
                                                                        <Col xs={24} sm={24} md={8} lg={11}>
                                                                            <h3>Select Card</h3>
                                                                            <Select
                                                                                allowClear
                                                                                showSearch
                                                                                filterOption={(input, option) =>
                                                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                                }
                                                                                mode="multiple"
                                                                                placeholder="Select Card"
                                                                                value={formData?.cards3_id}
                                                                                onChange={(value) => handleFormChange('cards3_id', value)}
                                                                                style={{
                                                                                    width: "100%",
                                                                                    marginBottom: "2em",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    cards?.map((card) => (
                                                                                        <Select.Option key={card?.id} value={card?.id}>{card?.title_en}</Select.Option>
                                                                                    ))
                                                                                }
                                                                            </Select>
                                                                        </Col>
                                                                    </Row>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Row gutter={[16, 16]} style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                    }}>
                                                                        <Col xs={24} sm={24} md={8}>
                                                                            <h4>Title (English): {autogasPage?.title5_en}</h4>
                                                                            <h4>Title (Bangla) {autogasPage?.title5_bn}</h4>

                                                                            <Carousel
                                                                                arrows={true}
                                                                                next={<CustomPrevArrow />}
                                                                                prev={<CustomNextArrow />}
                                                                                autoplay
                                                                                slidesToShow={3}
                                                                                style={{
                                                                                    width: "50vw",
                                                                                }}
                                                                            >
                                                                                {autogasPage?.cards3_mave?.map((card) => (
                                                                                    <div key={card?.id}>
                                                                                        <Card title={card?.title_en}>
                                                                                            <div className="cardContainer" style={{
                                                                                                display: "flex",
                                                                                                justifyContent: "space-between",
                                                                                            }}>
                                                                                                {card?.media_files?.file_type.startsWith('image') ? (
                                                                                                    <Image
                                                                                                        src={`${MEDIA_URL}/${card.media_files.file_path}`}
                                                                                                        alt={card?.media_files.file_name}
                                                                                                        style={{
                                                                                                            height: '200px',
                                                                                                            width: '18vw',
                                                                                                            objectFit: 'contain',
                                                                                                            borderRadius: 10,
                                                                                                        }}
                                                                                                    />
                                                                                                ) : card?.media_files?.file_type.startsWith('video') ? (
                                                                                                    <video
                                                                                                        autoPlay
                                                                                                        muted
                                                                                                        src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                                                                                                        style={{
                                                                                                            height: '200px',
                                                                                                            width: '18vw',
                                                                                                            objectFit: 'contain',
                                                                                                        }}
                                                                                                    >
                                                                                                        Your browser does not support the video tag.
                                                                                                    </video>
                                                                                                ) : (
                                                                                                    <Image
                                                                                                        src="/images/Image_Placeholder.png"
                                                                                                        style={{
                                                                                                            height: "200px",
                                                                                                            width: "18vw",
                                                                                                            objectFit: 'cover',
                                                                                                            borderRadius: 10,
                                                                                                        }}
                                                                                                    />
                                                                                                )}
                                                                                            </div>
                                                                                        </Card>
                                                                                    </div>
                                                                                ))}
                                                                            </Carousel>
                                                                        </Col>
                                                                    </Row>
                                                                </>
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
    )
}

export default Autogas;