import React, { useState, useEffect } from "react";
import instance from "../axios";
import { Button, Card, Col, Input, Row, Select, Image, Carousel, message } from "antd";
import { CheckCircleFilled, CloseCircleFilled, DeleteFilled, EditOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import RichTextEditor from "../components/RichTextEditor";
import SingleMediaSelect from "../components/SingleMediaSelect";

const CylinderGas = () => {
    const [loading, setLoading] = useState(false);
    const [cylindergasPages, setCylindergasPages] = useState([]);
    const [updateResponse, setUpdateResponse] = useState(null);
    const [cards, setCards] = useState([]);
    const [media, setMedia] = useState([]);
    const [videos, setVideos] = useState([]);
    const [expandedCylindergasPageId, setExpandedCylindergasPageId] = useState(null);
    const [selectedPageId, setSelectedPageId] = useState(null);
    const [formData, setFormData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [createMode, setCreateMode] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

    const fetchCylindergasPages = async () => {
        try {
            setLoading(true);
            const response = await instance.get("/cylindergas");
            if (response.data) {
                setCylindergasPages(response.data);
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
        fetchCylindergasPages();
    }, [setUpdateResponse]);

    // Fetch Cards
    const fetchCards = async () => {
        try {
            setLoading(true);
            const response = await instance.get("/cards");
            if (response.data) {
                setCards(response.data);
                setLoading(false);
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

    const handleExpand = (cylindergaspageId) => {
        if (expandedCylindergasPageId === cylindergaspageId) {
            setExpandedCylindergasPageId(null);
        } else {
            setExpandedCylindergasPageId(cylindergaspageId);
        }
    };

    const handleEditPageClick = (pageId) => {
        setSelectedPageId(pageId);
        setEditMode(true);

        const selectedData = cylindergasPages.find((cylindergasPage) => cylindergasPage.id === pageId);
        setFormData({
            title1_en: selectedData.title1_en,
            title1_bn: selectedData.title1_bn,
            title2_en: selectedData.title2_en,
            title2_bn: selectedData.title2_bn,
            title3_en: selectedData.title3_en,
            title3_bn: selectedData.title3_bn,
            description2_en: selectedData.description2_en,
            description2_bn: selectedData.description2_bn,
            description3_en: selectedData.description3_en,
            description3_bn: selectedData.description3_bn,
            tabs: selectedData.tabs,
            media1_id: selectedData.media1_id,
            section2_card: selectedData.section2_card,
            section3_card: selectedData.section3_card,
            section4_cards: selectedData.section4_cards,
            section5_cards: selectedData.section5_cards,
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
                    instance.delete(`/cylindergas/${pageId}`).then((res) => {
                        // Refresh card data after deletion
                        instance.get('/cylindergas').then((res) => {
                            setCylindergasPages(res.data);
                        });
                    });
                }
            });
        } catch (error) {
            console.error('Error deleting page:', error);
        }
    };
    const handleFormChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };


    const handleSubmit = async () => {
        if (!selectedPageId || !formData) {
            return;
        }

        try {
            const response = await instance.put(`/cylindergas/${selectedPageId}`, formData);
            if (response?.status === 200) {
                setUpdateResponse(response);
            }
            setFormData(null);
            fetchCylindergasPages();
            setEditMode(false);
            setSelectedPageId(null);
        }
        catch (error) {
            console.error('Error updating page:', error);
        }
    };

    useEffect(() => {
        if (selectedMedia) {
            setFormData({
                ...formData,
                media1_id: selectedMedia,
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
        setFormData({ ...formData, media1_id: media.id });
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
        <>
            <div className="ViewContainer ViewContentContainer">
                <div className="PageHeader" style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <h1>Cylindergas Page</h1>

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

                {
                    createMode ? (
                        <h3>Create mode on</h3>
                    ) : null
                }

                <Row gutter={[16, 16]}>
                    {
                        cylindergasPages?.map((cylindergasPage) => (
                            <Col key={cylindergasPage?.id} xs={24} sm={24}>
                                <Card
                                    title={`Page ID: ${cylindergasPage?.id}`}
                                    extra={
                                        <Button onClick={() => handleExpand(cylindergasPage?.id)}>
                                            {expandedCylindergasPageId === cylindergasPage.id ? 'Collapse' : 'Expand'}
                                        </Button>
                                    }
                                    style={{ marginBottom: "5em", marginTop: "3em", border: "1px solid var(--theme)", borderRadius: 10, }}
                                >
                                    {
                                        expandedCylindergasPageId === cylindergasPage?.id && (
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
                                                                            handleEditPageClick(cylindergasPage.id);
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
                                                                            handleDeletePage(cylindergasPage.id);
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
                                                                <Input
                                                                    defaultValue={cylindergasPage?.title1_en}
                                                                    value={formData?.title1_en}
                                                                    onChange={(e) => handleFormChange('title1_en', e.target.value)} />
                                                                <br /><br />
                                                                <Input
                                                                    defaultValue={cylindergasPage?.title1_bn}
                                                                    value={formData?.title1_bn}
                                                                    onChange={(e) => handleFormChange('title1_bn', e.target.value)} />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <h4>{cylindergasPage?.title1_en}</h4>
                                                                <br /><br /><h4>{cylindergasPage?.title1_bn}</h4>
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

                                                                <SingleMediaSelect
                                                                    visible={modalVisible}
                                                                    onCancel={handleModalCancel}
                                                                    onMediaSelect={handleMediaSelect}
                                                                    media={media}
                                                                />

                                                            </>
                                                        ) : (
                                                            <>
                                                                {
                                                                    cylindergasPage?.media1_mave?.file_type.startsWith('image') ? (
                                                                        <Image
                                                                            src={`${MEDIA_URL}/${cylindergasPage?.media1_mave?.file_path}`}
                                                                            alt="Hero Image"
                                                                            style={{
                                                                                height: '200px',
                                                                                width: '18vw',
                                                                                objectFit: 'contain',
                                                                                borderRadius: 10,
                                                                            }}
                                                                        />
                                                                    ) : cylindergasPage?.media1_mave?.file_type.startsWith('video') ? (
                                                                        <video
                                                                            autoPlay
                                                                            muted
                                                                            width="30%"
                                                                            height="auto"
                                                                            objectFit="contain"
                                                                            src={`${MEDIA_URL}/${cylindergasPage?.media1_mave?.file_path}`}
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

                                                    {/* Tab1 Section 1 */}
                                                    {
                                                        editMode ? (
                                                            <>
                                                                {
                                                                    formData?.tabs && (
                                                                        <div>
                                                                            {/* <h2 style={{
                                                                                marginTop: "2em",
                                                                                color: "var(--theme)",
                                                                                textAlign: "center",
                                                                            }}>Tabs</h2>
                                                                            <div className="tabsContainer" style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-around",
                                                                                alignItems: "center",
                                                                            }}>
                                                                                {
                                                                                    formData?.tabs?.map((tab) => (
                                                                                        <>
                                                                                            {
                                                                                                <div className="tab" style={{
                                                                                                    textAlign: "center",
                                                                                                }}>
                                                                                                    <h3>{tab.title_en}</h3>
                                                                                                    <h3>{tab.title_bn}</h3>
                                                                                                </div>
                                                                                            }
                                                                                        </>
                                                                                    ))
                                                                                }
                                                                            </div> */}
                                                                            <h2 style={{
                                                                                marginTop: "2em",
                                                                                color: "var(--theme)",
                                                                                textAlign: "center",
                                                                            }}>
                                                                                {formData?.tabs[0]?.title_en} Tab content
                                                                            </h2>
                                                                            {/* Section 1 */}
                                                                            <h3>Section 1 Card</h3>
                                                                            <Select
                                                                                allowClear
                                                                                showSearch
                                                                                filterOption={(input, option) =>
                                                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                                }
                                                                                placeholder="Select Cards"
                                                                                value={formData?.section2_card}
                                                                                onChange={(value) => handleFormChange('section2_card', value)}
                                                                                style={{ width: '100%', marginBottom: "2em", marginTop: "2em" }}>
                                                                                {
                                                                                    cards?.map((card) => (
                                                                                        <Select.Option key={card.id} value={card.id}>
                                                                                            {card.title_en}
                                                                                        </Select.Option>
                                                                                    ))
                                                                                }
                                                                            </Select>

                                                                            {/* Section 2 */}
                                                                            <h3>Section 2 Card</h3>
                                                                            <Select
                                                                                allowClear
                                                                                showSearch
                                                                                filterOption={(input, option) =>
                                                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                                }
                                                                                placeholder="Select Cards"
                                                                                value={formData?.section3_card}
                                                                                onChange={(value) => handleFormChange('section3_card', value)}
                                                                                style={{ width: '100%', marginBottom: "2em", marginTop: "2em" }}>
                                                                                {
                                                                                    cards?.map((card) => (
                                                                                        <Select.Option key={card.id} value={card.id}>
                                                                                            {card.title_en}
                                                                                        </Select.Option>
                                                                                    ))
                                                                                }
                                                                            </Select>

                                                                            {/* Section 3 */}
                                                                            <h3>Section 3</h3>
                                                                            <Input placeholder="Title (English)" value={formData?.title2_en} onChange={(e) => handleFormChange('title2_en', e.target.value)} />
                                                                            <Input placeholder="Title (Bangla)" value={formData?.title2_bn} onChange={(e) => handleFormChange('title2_bn', e.target.value)} />
                                                                            <RichTextEditor
                                                                                value={formData?.description2_en}
                                                                                editMode={true}
                                                                                defaultValue={cylindergasPage?.description2_en}
                                                                                onChange={(value) => handleFormChange('description2_en', value)}
                                                                            />
                                                                            <RichTextEditor
                                                                                value={formData?.description2_bn}
                                                                                editMode={true}
                                                                                defaultValue={cylindergasPage?.description2_bn}
                                                                                onChange={(value) => handleFormChange('description2_bn', value)}
                                                                            />

                                                                            <h3>Section Cards</h3>
                                                                            <Select
                                                                                mode="multiple"
                                                                                allowClear
                                                                                showSearch
                                                                                filterOption={(input, option) =>
                                                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                                }
                                                                                placeholder="Select Cards"
                                                                                value={formData?.section4_cards}
                                                                                onChange={(value) => handleFormChange('section4_cards', value)}
                                                                                style={{ width: '100%', marginBottom: "2em", marginTop: "2em" }}>
                                                                                {
                                                                                    cards?.map((card) => (
                                                                                        <Select.Option key={card.id} value={card.id}>
                                                                                            {card.title_en}
                                                                                        </Select.Option>
                                                                                    ))
                                                                                }
                                                                            </Select>

                                                                            {/* Section 3 */}
                                                                            <h3>Section 3</h3>
                                                                            <Input placeholder="Title (English)" value={formData?.title3_en} onChange={(e) => handleFormChange('title3_en', e.target.value)} />
                                                                            <Input placeholder="Title (Bangla)" value={formData?.title3_bn} onChange={(e) => handleFormChange('title3_bn', e.target.value)} />
                                                                            <RichTextEditor
                                                                                value={formData?.description3_en}
                                                                                editMode={true}
                                                                                defaultValue={cylindergasPage?.description3_en}
                                                                                onChange={(value) => handleFormChange('description3_en', value)}
                                                                            />
                                                                            <RichTextEditor
                                                                                value={formData?.description3_bn}
                                                                                editMode={true}
                                                                                defaultValue={cylindergasPage?.description3_bn}
                                                                                onChange={(value) => handleFormChange('description3_bn', value)}
                                                                            />

                                                                            <h3>Section Cards</h3>
                                                                            <Select
                                                                                mode="multiple"
                                                                                allowClear
                                                                                showSearch
                                                                                filterOption={(input, option) =>
                                                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                                }
                                                                                placeholder="Select Cards"
                                                                                value={formData?.section5_cards}
                                                                                onChange={(value) => handleFormChange('section5_cards', value)}
                                                                                style={{ width: '100%', marginBottom: "2em", marginTop: "2em" }}>
                                                                                {
                                                                                    cards?.map((card) => (
                                                                                        <Select.Option key={card.id} value={card.id}>
                                                                                            {card.title_en}
                                                                                        </Select.Option>
                                                                                    ))
                                                                                }
                                                                            </Select>
                                                                        </div>
                                                                    )
                                                                }
                                                            </>
                                                        ) : (
                                                            <>
                                                                {/* Tabs */}
                                                                <div style={{
                                                                    padding: "2em 0",
                                                                    borderBottom: "1px solid var(--theme)",
                                                                    borderTop: "1px solid var(--theme)",
                                                                    marginBottom: "2em",
                                                                }}>

                                                                    <h2 style={{
                                                                        color: "var(--theme)",
                                                                        textAlign: "center",
                                                                    }}>Tabs</h2>

                                                                    <div className="tabsContainer" style={{
                                                                        display: "flex",
                                                                        justifyContent: "space-around",
                                                                        alignItems: "center",
                                                                        textAlign: "center",
                                                                    }}>
                                                                        {
                                                                            cylindergasPage?.tabs?.map((tab) => (
                                                                                <>
                                                                                    {
                                                                                        <div className="tab">
                                                                                            <h3>{tab.title_en}</h3>
                                                                                            <h3>{tab.title_bn}</h3>
                                                                                        </div>
                                                                                    }
                                                                                </>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>

                                                                {/* Second section */}
                                                                <h2 style={{
                                                                    color: "var(--theme)",
                                                                    textAlign: "center",
                                                                }}>
                                                                    {cylindergasPage?.tabs[0]?.title_en} Tab content
                                                                </h2>

                                                                {/* Section 2 Card */}
                                                                <div className="section2Card">
                                                                    {
                                                                        <Card
                                                                            title={cylindergasPage?.section2_card_mave?.title_en}
                                                                        >
                                                                            <div className="cardContainer" style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}>
                                                                                {cylindergasPage?.section2_card_mave?.media_files?.file_type.startsWith("image") ? (
                                                                                    <Image
                                                                                        preview={false}
                                                                                        src={`${MEDIA_URL}/${cylindergasPage?.section2_card_mave.media_files.file_path}`}
                                                                                        alt={cylindergasPage?.section2_card_mave.media_files.file_name}
                                                                                        style={{
                                                                                            width: "45vw",
                                                                                            height: "100%",
                                                                                            objectFit: "cover",
                                                                                            borderRadius: 10,
                                                                                        }}
                                                                                    />
                                                                                ) : cylindergasPage?.section2_card_mave?.media_files?.file_type.startsWith("video") ? (
                                                                                    <video
                                                                                        autoPlay
                                                                                        loop
                                                                                        muted
                                                                                        width="45vw"
                                                                                        height="100%"
                                                                                        objectFit="cover"
                                                                                        src={`${MEDIA_URL}/${cylindergasPage?.section2_card_mave.media_files.file_path}`}
                                                                                    >
                                                                                        Your browser does not support the video tag.
                                                                                    </video>
                                                                                ) : (
                                                                                    <Image
                                                                                        src="/images/Image_Placeholder.png"
                                                                                        style={{
                                                                                            height: "200px",
                                                                                            width: "18vw",
                                                                                            objectFit: "cover",
                                                                                            borderRadius: 10,
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                                <div style={{
                                                                                    width: "35%",
                                                                                    display: "flex",
                                                                                    flexDirection: "column",
                                                                                    justifyContent: "center",
                                                                                    alignItems: "center",
                                                                                    padding: "1em",
                                                                                    backgroundColor: "var(--themes)",
                                                                                    color: "white",
                                                                                }}>
                                                                                    <h3 style={{
                                                                                        fontSize: "1.5em",
                                                                                        paddingBottom: "1em",
                                                                                    }}>{cylindergasPage?.section2_card_mave?.title_en}</h3>

                                                                                    <div dangerouslySetInnerHTML={{ __html: cylindergasPage?.section2_card_mave?.description_en }}
                                                                                        style={{
                                                                                            textAlign: "left",
                                                                                            fontSize: "1em",
                                                                                        }} />
                                                                                </div>
                                                                            </div>
                                                                        </Card>
                                                                    }
                                                                </div>


                                                                {/* Section 3 Card */}
                                                                <div className="section2Card">
                                                                    {
                                                                        <Card
                                                                            title={cylindergasPage?.section3_card_mave?.title_en}
                                                                        >
                                                                            <div className="cardContainer" style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}>
                                                                                {cylindergasPage?.section3_card_mave?.media_files?.file_type.startsWith("image") ? (
                                                                                    <Image
                                                                                        preview={false}
                                                                                        src={`${MEDIA_URL}/${cylindergasPage?.section3_card_mave.media_files.file_path}`}
                                                                                        alt={cylindergasPage?.section3_card_mave.media_files.file_name}
                                                                                        style={{
                                                                                            width: "45vw",
                                                                                            height: "100%",
                                                                                            objectFit: "cover",
                                                                                            borderRadius: 10,
                                                                                        }}
                                                                                    />
                                                                                ) : cylindergasPage?.section3_card_mave?.media_files?.file_type.startsWith("video") ? (
                                                                                    <video
                                                                                        autoPlay
                                                                                        loop
                                                                                        muted
                                                                                        width="45vw"
                                                                                        height="100%"
                                                                                        objectFit="cover"
                                                                                        src={`${MEDIA_URL}/${cylindergasPage?.section3_card_mave.media_files.file_path}`}
                                                                                    >
                                                                                        Your browser does not support the video tag.
                                                                                    </video>
                                                                                ) : (
                                                                                    <Image
                                                                                        src="/images/Image_Placeholder.png"
                                                                                        style={{
                                                                                            height: "200px",
                                                                                            width: "18vw",
                                                                                            objectFit: "cover",
                                                                                            borderRadius: 10,
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                                <div style={{
                                                                                    width: "35%",
                                                                                    display: "flex",
                                                                                    flexDirection: "column",
                                                                                    justifyContent: "center",
                                                                                    alignItems: "center",
                                                                                    padding: "1em",
                                                                                    backgroundColor: "var(--themes)",
                                                                                    color: "white",
                                                                                }}>
                                                                                    <h3 style={{
                                                                                        fontSize: "1.5em",
                                                                                        paddingBottom: "1em",
                                                                                    }}>{cylindergasPage?.section3_card_mave?.title_en}</h3>

                                                                                    <div dangerouslySetInnerHTML={{ __html: cylindergasPage?.section3_card_mave?.description_en }}
                                                                                        style={{
                                                                                            textAlign: "left",
                                                                                            fontSize: "1em",
                                                                                        }} />
                                                                                </div>
                                                                            </div>
                                                                        </Card>
                                                                    }

                                                                    {/* Third Section */}
                                                                    <h2 style={{
                                                                        color: "var(--theme)",
                                                                        textAlign: "center",
                                                                    }}>
                                                                        Title: {cylindergasPage?.title2_en}
                                                                    </h2>
                                                                    <h2 style={{
                                                                        color: "var(--theme)",
                                                                        textAlign: "center",
                                                                    }}>
                                                                        Title BN: {cylindergasPage?.title2_bn}
                                                                    </h2>
                                                                    <div dangerouslySetInnerHTML={{ __html: cylindergasPage?.description2_en }}
                                                                        style={{
                                                                            textAlign: "left",
                                                                            fontSize: "1em",
                                                                        }} />
                                                                    <br /> <br />
                                                                    <div dangerouslySetInnerHTML={{ __html: cylindergasPage?.description2_bn }}
                                                                        style={{
                                                                            textAlign: "left",
                                                                            fontSize: "1em",
                                                                        }} />
                                                                </div>
                                                                <div className="WhyChooseSectionCards" style={{
                                                                    width: "100%",
                                                                    display: "grid",
                                                                    gridTemplateColumns: "repeat(2, 1fr)",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    gap: "1em",
                                                                }}>
                                                                    {cylindergasPage?.section4_cards_mave?.map((card) => (
                                                                        <div key={card.id}>
                                                                            <Card
                                                                                title={card.title_en}
                                                                            >
                                                                                <div className="cardContainer" style={{
                                                                                    display: "flex",
                                                                                    flexDirection: "column",
                                                                                    justifyContent: "center",
                                                                                    gap: "1em",
                                                                                }}>
                                                                                    {card?.media_files?.file_type.startsWith("image") ? (
                                                                                        <Image
                                                                                            preview={false}
                                                                                            src={`${MEDIA_URL}/${card.media_files.file_path}`}
                                                                                            alt={card.media_files.file_name}
                                                                                            style={{
                                                                                                width: "100%",
                                                                                                height: "15vh",
                                                                                                objectFit: "cover",
                                                                                                borderRadius: 10,
                                                                                            }}
                                                                                        />
                                                                                    ) : card?.media_files?.file_type.startsWith("video") ? (
                                                                                        <video
                                                                                            autoPlay
                                                                                            loop
                                                                                            muted
                                                                                            width="20vw"
                                                                                            height="15vh"
                                                                                            objectFit="cover"
                                                                                            src={`${MEDIA_URL}/${card.media_files.file_path}`}
                                                                                        >
                                                                                            Your browser does not support the video tag.
                                                                                        </video>
                                                                                    ) : (
                                                                                        <Image
                                                                                            src="/images/Image_Placeholder.png"
                                                                                            style={{
                                                                                                height: "200px",
                                                                                                width: "18vw",
                                                                                                objectFit: "cover",
                                                                                                borderRadius: 10,
                                                                                            }}
                                                                                        />
                                                                                    )}
                                                                                    <div style={{
                                                                                        display: "flex",
                                                                                        flexDirection: "column",
                                                                                        justifyContent: "center",
                                                                                        alignItems: "center",
                                                                                        padding: "1em",
                                                                                        backgroundColor: "var(--themes)",
                                                                                        color: "white",
                                                                                    }}>
                                                                                        <h3 style={{
                                                                                            fontSize: "1.5em",
                                                                                            paddingBottom: "1em",
                                                                                        }}>{card.title_en}</h3>

                                                                                        <div dangerouslySetInnerHTML={{ __html: card.description_en }}
                                                                                            style={{
                                                                                                textAlign: "left",
                                                                                                fontSize: "1em",
                                                                                                textOverflow: "ellipsis",
                                                                                                height: "100px",
                                                                                            }} />
                                                                                    </div>
                                                                                </div>
                                                                            </Card>
                                                                        </div>
                                                                    ))}
                                                                </div>

                                                                {/* Fourth Section */}
                                                                <h2 style={{
                                                                    color: "var(--theme)",
                                                                    textAlign: "center",
                                                                    paddingTop: "4em",
                                                                }}>
                                                                    Title: {cylindergasPage?.title3_en}
                                                                </h2>
                                                                <h2 style={{
                                                                    color: "var(--theme)",
                                                                    textAlign: "center",
                                                                }}>
                                                                    Title BN: {cylindergasPage?.title3_bn}
                                                                </h2>
                                                                <div dangerouslySetInnerHTML={{ __html: cylindergasPage?.description3_en }}
                                                                    style={{
                                                                        textAlign: "left",
                                                                        fontSize: "1em",
                                                                    }} />
                                                                <br /> <br />
                                                                <div dangerouslySetInnerHTML={{ __html: cylindergasPage?.description3_bn }}
                                                                    style={{
                                                                        textAlign: "left",
                                                                        fontSize: "1em",
                                                                    }} />

                                                                <div className="" style={{
                                                                    width: "100%",
                                                                    display: "grid",
                                                                    gridTemplateColumns: "repeat(3, 1fr)",
                                                                    gap: "1em",
                                                                }}>
                                                                    {cylindergasPage?.section5_cards_mave?.map((card) => (
                                                                        <div key={card.id}>
                                                                            <Card
                                                                                title={card.title_en}
                                                                            >
                                                                                <div className="cardContainer" style={{
                                                                                    display: "flex",
                                                                                    flexDirection: "column",
                                                                                    justifyContent: "center",
                                                                                    gap: "1em",
                                                                                }}>
                                                                                    {card?.media_files?.file_type.startsWith("image") ? (
                                                                                        <Image
                                                                                            preview={false}
                                                                                            src={`${MEDIA_URL}/${card.media_files.file_path}`}
                                                                                            alt={card.media_files.file_name}
                                                                                            style={{
                                                                                                width: "100%",
                                                                                                height: "15vh",
                                                                                                objectFit: "cover",
                                                                                                borderRadius: 10,
                                                                                            }}
                                                                                        />
                                                                                    ) : card?.media_files?.file_type.startsWith("video") ? (
                                                                                        <video
                                                                                            autoPlay
                                                                                            loop
                                                                                            muted
                                                                                            width="20vw"
                                                                                            height="15vh"
                                                                                            objectFit="cover"
                                                                                            src={`${MEDIA_URL}/${card.media_files.file_path}`}
                                                                                        >
                                                                                            Your browser does not support the video tag.
                                                                                        </video>
                                                                                    ) : (
                                                                                        <Image
                                                                                            src="/images/Image_Placeholder.png"
                                                                                            style={{
                                                                                                height: "200px",
                                                                                                width: "18vw",
                                                                                                objectFit: "cover",
                                                                                                borderRadius: 10,
                                                                                            }}
                                                                                        />
                                                                                    )}
                                                                                    <div style={{
                                                                                        display: "flex",
                                                                                        flexDirection: "column",
                                                                                        justifyContent: "center",
                                                                                        alignItems: "center",
                                                                                        padding: "1em",
                                                                                        backgroundColor: "var(--themes)",
                                                                                        color: "white",
                                                                                    }}>
                                                                                        <h3 style={{
                                                                                            fontSize: "1.5em",
                                                                                            paddingBottom: "1em",
                                                                                        }}>{card.title_en}</h3>

                                                                                        <div dangerouslySetInnerHTML={{ __html: card.description_en }}
                                                                                            style={{
                                                                                                textAlign: "left",
                                                                                                fontSize: "1em",
                                                                                                textOverflow: "ellipsis",
                                                                                                height: "100px",
                                                                                            }} />
                                                                                    </div>
                                                                                </div>
                                                                            </Card>
                                                                        </div>
                                                                    ))}
                                                                </div>
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
        </>
    )
};

export default CylinderGas;