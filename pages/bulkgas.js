import React, { useEffect, useState } from "react";
import instance from "../axios";
import { Button, Card, Col, Input, Row, Select, Image, Carousel, message, Modal } from "antd";
import { CheckCircleFilled, CloseCircleFilled, DeleteFilled, EditOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import RichTextEditor from "../components/RichTextEditor";
import MediaSelectionModal1 from "../components/MediaSelectionModal1";
import SingleMediaSelect from "../components/SingleMediaSelect";

const Bulkgas = () => {
    const [loading, setLoading] = useState(false);
    const [bulkgasPages, setBulkgasPages] = useState([]);
    const [updateResponse, setUpdateResponse] = useState(null);
    const [cards, setCards] = useState([]);
    const [media, setMedia] = useState([]);
    const [videos, setVideos] = useState([]);
    const [expandedBulkgasPageId, setExpandedBulkgasPageId] = useState(null);
    const [selectedPageId, setSelectedPageId] = useState(null);
    const [formData, setFormData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [createMode, setCreateMode] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

    const fetchBulkgasPages = async () => {
        try {
            setLoading(true);
            const response = await instance.get("/bulkgas");
            if (response.data) {
                setBulkgasPages(response.data);
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
        fetchBulkgasPages();
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

    const handleExpand = (bulkgaspageId) => {
        if (expandedBulkgasPageId === bulkgaspageId) {
            setExpandedBulkgasPageId(null);
        } else {
            setExpandedBulkgasPageId(bulkgaspageId);
        }
    };

    const handleEditPageClick = (pageId) => {
        setSelectedPageId(pageId);
        setEditMode(true);

        const selectedData = bulkgasPages.find((bulkgasPage) => bulkgasPage.id === pageId);
        setFormData({
            title_en: selectedData.title_en,
            title_bn: selectedData.title_bn,
            media_id: selectedData.media_id,
            cards_id: selectedData.cards_id,
            tabs: selectedData.tabs,
            title2_en: selectedData.title2_en,
            title2_bn: selectedData.title2_bn,
            description2_en: selectedData.description2_en,
            description2_bn: selectedData.description2_bn,
            cards2_id: selectedData.cards2_id,
            title3_en: selectedData.title3_en,
            title3_bn: selectedData.title3_bn,
            cards3_id: selectedData.cards3_id,
            title4_en: selectedData.title4_en,
            title4_bn: selectedData.title4_bn,
            cards4_id: selectedData.cards4_id,
            additionals: selectedData.additionals,
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
                    instance.delete(`/bulkgas/${pageId}`).then((res) => {
                        // Refresh card data after deletion
                        instance.get('/bulkgas').then((res) => {
                            setBulkgasPages(res.data);
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
            const response = await instance.put(`/bulkgas/${selectedPageId}`, formData);
            if (response?.status === 200) {
                setUpdateResponse(response);
            }
            setFormData(null);
            fetchBulkgasPages();
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
                media_id: selectedMedia,
            });
        }
    }, [selectedMedia]);

    const handleModalCancel = () => {
        setModalVisible(false);
    };

    const handleMediaSelect = (media) => {
        setSelectedMedia(media);
        setModalVisible(false);
        setFormData({ ...formData, media_id: media.id });
    };

    const handleOpenModal = () => {
        setModalVisible(true);
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
                <h1>Bulkgas Page</h1>

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
                            bulkgasPages?.map((bulkgasPage) => (
                                <Col key={bulkgasPage?.id} xs={24} sm={24}>
                                    <Card
                                        title={`Page ID: ${bulkgasPage?.id}`}
                                        extra={
                                            <Button onClick={() => handleExpand(bulkgasPage?.id)}>
                                                {expandedBulkgasPageId === bulkgasPage.id ? 'Collapse' : 'Expand'}
                                            </Button>
                                        }
                                        style={{ marginBottom: "5em", marginTop: "3em", border: "1px solid var(--theme)", borderRadius: 10, }}
                                    >
                                        {
                                            expandedBulkgasPageId === bulkgasPage?.id && (
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
                                                                                handleEditPageClick(bulkgasPage.id);
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
                                                                                handleDeletePage(bulkgasPage.id);
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
                                                                        placeholder="Title (English)"
                                                                        value={formData?.title_en}
                                                                        onChange={(e) => handleFormChange('title_en', e.target.value)} />
                                                                    <br /><br />
                                                                    <Input
                                                                        placeholder="Title (Bangla)"
                                                                        value={formData?.title_bn}
                                                                        onChange={(e) => handleFormChange('title_bn', e.target.value)} />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <h4>{bulkgasPage?.title_en}</h4>
                                                                    <br /><br /><h4>{bulkgasPage?.title_bn}</h4>
                                                                </>
                                                            )
                                                        }

                                                        {/* Hero Image */}
                                                        {
                                                            editMode ? (
                                                                <>
                                                                    <Button type="primary"
                                                                        onClick={handleOpenModal}
                                                                        style={{ marginTop: "1rem" }}>
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
                                                                        bulkgasPage?.media_mave?.file_type.startsWith('image') ? (
                                                                            <Image
                                                                                src={`${MEDIA_URL}/${bulkgasPage?.media_mave?.file_path}`}
                                                                                alt="Hero Image"
                                                                                style={{
                                                                                    height: '200px',
                                                                                    width: '18vw',
                                                                                    objectFit: 'contain',
                                                                                    borderRadius: 10,
                                                                                }}
                                                                            />
                                                                        ) : bulkgasPage?.media_mave?.file_type.startsWith('video') ? (
                                                                            <video
                                                                                autoPlay
                                                                                muted
                                                                                width="30%"
                                                                                height="auto"
                                                                                objectFit="contain"
                                                                                src={`${MEDIA_URL}/${bulkgasPage?.media_mave?.file_path}`}
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
                                                                    <h2>Section 1 Title</h2>
                                                                    <Input
                                                                        placeholder="Title (English)"
                                                                        value={formData?.title2_en}
                                                                        onChange={(e) => handleFormChange('title2_en', e.target.value)} />
                                                                    <br /><br />
                                                                    <Input
                                                                        placeholder="Title (Bangla)"
                                                                        value={formData?.title2_bn}
                                                                        onChange={(e) => handleFormChange('title2_bn', e.target.value)} />
                                                                    <br /><br />

                                                                    <h2>Section 1 Description</h2>
                                                                    <RichTextEditor
                                                                        editMode={editMode}
                                                                        defaultValue={formData?.description2_en}
                                                                        value={formData?.description2_en}
                                                                        onChange={(value) => handleFormChange('description2_en', value)}
                                                                    />
                                                                    <br /><br />
                                                                    <RichTextEditor
                                                                        editMode={editMode}
                                                                        defaultValue={formData?.description2_bn}
                                                                        value={formData?.description2_bn}
                                                                        onChange={(value) => handleFormChange('description2_bn', value)}
                                                                    />
                                                                    <br /><br />

                                                                    <h2>Section 1 Cards</h2>
                                                                    <Select
                                                                        mode="multiple"
                                                                        allowClear
                                                                        showSearch
                                                                        filterOption={(input, option) =>
                                                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                        }
                                                                        style={{ width: '100%' }}
                                                                        placeholder="Select Tabs"
                                                                        value={formData?.cards_id}
                                                                        onChange={(value) => handleFormChange('cards_id', value)}
                                                                    >
                                                                        {
                                                                            cards?.map((card) => (
                                                                                <Select.Option key={card.id} value={card.id}>
                                                                                    {card.title_en}
                                                                                </Select.Option>
                                                                            ))
                                                                        }
                                                                    </Select>
                                                                    <br /><br />

                                                                    <h2>Section 2 Cards</h2>
                                                                    <Select
                                                                        mode="multiple"
                                                                        allowClear
                                                                        showSearch
                                                                        filterOption={(input, option) =>
                                                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                        }
                                                                        style={{ width: '100%' }}
                                                                        placeholder="Select Tabs"
                                                                        value={formData?.cards2_id}
                                                                        onChange={(value) => handleFormChange('cards2_id', value)}
                                                                    >
                                                                        {
                                                                            cards?.map((card) => (
                                                                                <Select.Option key={card.id} value={card.id}>
                                                                                    {card.title_en}
                                                                                </Select.Option>
                                                                            ))
                                                                        }
                                                                    </Select>
                                                                    <br /><br />

                                                                    {/* Section 3 */}
                                                                    <h2>Section 3 Title</h2>
                                                                    <Input
                                                                        placeholder="Title (English)"
                                                                        value={formData?.title3_en}
                                                                        onChange={(e) => handleFormChange('title3_en', e.target.value)} />
                                                                    <br /><br />
                                                                    <Input
                                                                        placeholder="Title (Bangla)"
                                                                        value={formData?.title3_bn}
                                                                        onChange={(e) => handleFormChange('title3_bn', e.target.value)} />
                                                                    <br /><br />
                                                                    <h2>Section 3 Cards</h2>
                                                                    <Select
                                                                        mode="multiple"
                                                                        allowClear
                                                                        showSearch
                                                                        filterOption={(input, option) =>
                                                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                        }
                                                                        style={{ width: '100%' }}
                                                                        placeholder="Select Tabs"
                                                                        value={formData?.cards3_id}
                                                                        onChange={(value) => handleFormChange('cards3_id', value)}
                                                                    >
                                                                        {
                                                                            cards?.map((card) => (
                                                                                <Select.Option key={card.id} value={card.id}>
                                                                                    {card.title_en}
                                                                                </Select.Option>
                                                                            ))
                                                                        }
                                                                    </Select>
                                                                    <br /><br />

                                                                    {/* Section 4 */}
                                                                    <h2>Section 4 Title</h2>
                                                                    <Input
                                                                        placeholder="Title (English)"
                                                                        value={formData?.title4_en}
                                                                        onChange={(e) => handleFormChange('title4_en', e.target.value)} />
                                                                    <br /><br />
                                                                    <Input
                                                                        placeholder="Title (Bangla)"
                                                                        value={formData?.title4_bn}
                                                                        onChange={(e) => handleFormChange('title4_bn', e.target.value)} />
                                                                    <br /><br />
                                                                    <h2>Section 4 Cards</h2>
                                                                    <Select
                                                                        mode="multiple"
                                                                        allowClear
                                                                        showSearch
                                                                        filterOption={(input, option) =>
                                                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                        }
                                                                        style={{ width: '100%' }}
                                                                        placeholder="Select Tabs"
                                                                        value={formData?.cards4_id}
                                                                        onChange={(value) => handleFormChange('cards4_id', value)}
                                                                    >
                                                                        {
                                                                            cards?.map((card) => (
                                                                                <Select.Option key={card.id} value={card.id}>
                                                                                    {card.title_en}
                                                                                </Select.Option>
                                                                            ))
                                                                        }
                                                                    </Select>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <h2>{bulkgasPage?.title2_en}</h2>
                                                                    <br /><br />
                                                                    <h2>{bulkgasPage?.title2_bn}</h2>
                                                                    <br /><br />
                                                                    <div dangerouslySetInnerHTML={{ __html: bulkgasPage?.description2_en }} />
                                                                    <br /><br />
                                                                    <div dangerouslySetInnerHTML={{ __html: bulkgasPage?.description2_bn }} />
                                                                    <br /><br />
                                                                    <div style={{
                                                                        display: "grid",
                                                                        gridTemplateColumns: "repeat(3, 1fr)",
                                                                    }}>
                                                                        {
                                                                            bulkgasPage?.cards_mave?.map((card) => (
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
                                                                            ))
                                                                        }
                                                                    </div>

                                                                    {/* Section 2 */}
                                                                    <h2>
                                                                        Section 2 Cards
                                                                    </h2>
                                                                    <div style={{
                                                                        display: "grid",
                                                                        gridTemplateColumns: "repeat(3, 1fr)",
                                                                    }}>
                                                                        {
                                                                            bulkgasPage?.cards2_mave?.map((card) => (
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
                                                                            ))
                                                                        }
                                                                    </div>


                                                                    {/* Section 3 */}
                                                                    <h2>Section 3 Title: {bulkgasPage?.title2_en}</h2>
                                                                    <br /><br />
                                                                    <h2>Section 3 Title: {bulkgasPage?.title2_bn}</h2>
                                                                    <br /><br />
                                                                    <div style={{
                                                                        display: "grid",
                                                                        gridTemplateColumns: "repeat(3, 1fr)",
                                                                    }}>
                                                                        {
                                                                            bulkgasPage?.cards3_mave?.map((card) => (
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
                                                                            ))
                                                                        }
                                                                    </div>



                                                                    {/* Section 4 */}
                                                                    <h2>Section 4 Title: {bulkgasPage?.title3_en}</h2>
                                                                    <br /><br />
                                                                    <h2>Section 4 Title: {bulkgasPage?.title3_bn}</h2>
                                                                    <br /><br />
                                                                    <div style={{
                                                                        display: "grid",
                                                                        gridTemplateColumns: "repeat(3, 1fr)",
                                                                    }}>
                                                                        {
                                                                            bulkgasPage?.cards4_mave?.map((card) => (
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
                                                                                                        width: "5vw",
                                                                                                        height: "30%",
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
                                                                            ))
                                                                        }
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
            </div>
        </div>
    )
}

export default Bulkgas;