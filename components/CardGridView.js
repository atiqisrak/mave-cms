import { Button, Col, Image, Input, Modal, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import MediaRenderEngine from "./MediaRenderEngine";
import { ArrowRightOutlined, CheckCircleFilled, CloseCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import SingleMediaSelect from "./SingleMediaSelect";
import RichTextEditor from "./RichTextEditor";
import instance from "../axios";

const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

const CardGridView = ({
    cardData,
    media,
    fetchCards,
}) => {
    // View card details in modal
    const [viewDetails, setViewDetails] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCardDetails = (card) => {
        setSelectedCard(card);
        setViewDetails(true);
    }

    // Media Select Modal
    const [mediaSelectionVisible, setMediaSelectionVisible] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [editedCardId, setEditedCardId] = useState(null);
    const [selectedMediaId, setSelectedMediaId] = useState(null);

    const handleOpenMediaSelectionModal = (cardId) => {
        setSelectedCardId(cardId);
        setMediaSelectionVisible(true);
    };

    // fetch updated card data
    const fetchUpdatedCardData = async () => {
        try {
            const res = await instance.get(`/cards/${selectedCard.id}`);
            setSelectedCard(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Card edit form
    const updateCard = async () => {
        try {
            setLoading(true);
            const requestedData = {
                title_en: selectedCard.title_en,
                title_bn: selectedCard.title_bn,
                description_en: selectedCard.description_en,
                description_bn: selectedCard.description_bn,
            };

            if (selectedMediaId !== null) {
                requestedData.media_ids = selectedMediaId;
            } else {
                requestedData.media_ids = selectedCard.media_files?.id;
            }

            const res = await instance.put(`/cards/${selectedCard.id}`, requestedData);

            console.log("Card updated: ", res.data);
            setLoading(false);
            message.success("Card updated successfully");
            fetchUpdatedCardData();
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };


    // Delete Card
    const handleDeleteCard = async (id) => {
        try {
            setLoading(true);
            try {
                Modal.confirm({
                    title: "Delete Card",
                    content: "Are you sure you want to delete this card?",
                    okText: "Yes",
                    cancelText: "No",
                    onOk: async () => {
                        const response = await instance.delete(`/cards/${id}`);
                        if (response.status === 200) {
                            message.success("Card deleted successfully");
                            fetchCards();
                        }
                        else {
                            message.error("Failed to delete card");
                        }
                    },
                });
            }
            catch (error) {
                message.error("Failed to delete card");
            }
        }
        catch (error) {
            message.error("Failed to delete card");
        }
        setLoading(false);
    }

    // Media id to media object
    const mediaIdToMedia = (id) => {
        const selectedMedia = {
            id: id,
            file_path: media.find((item) => item.id === id)?.file_path,
            file_type: media.find((item) => item.id === id)?.file_type,
        };
        return selectedMedia;
    }


    return (
        <div>
            <Row gutter={[16, 16]}>
                {cardData?.map((card) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={card.id}>
                        <div style={{
                            textAlign: 'center',
                            border: "1px solid var(--themes-light)",
                            borderRadius: "10px",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                            padding: "10px"
                        }}>
                            {card?.media_files ? (
                                <MediaRenderEngine item={card?.media_files} />
                                // <Image
                                //     preview={false}
                                //     src="/images/Image_Placeholder.png"
                                //     alt={card.title_en}
                                //     width={200}
                                //     height={200}
                                // />
                            ) : (
                                <Image
                                    preview={false}
                                    src="/images/Image_Placeholder.png"
                                    alt={card.title_en}
                                    width={200}
                                    height={200}
                                />
                            )
                            }
                            <div style={{
                                padding: "10px 0",
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px"
                            }}>
                                <h2 style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: 'vertical',
                                }}>
                                    {card.title_en}
                                </h2>

                                <p
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: card?.description_en,
                                    }}
                                /></div>

                            {/* View Action Buttons (View Details, Edit, Delete) on card hover */}
                            <div style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                gap: "10px",
                                padding: "10px 0"
                            }}>
                                <Button
                                    icon={<EyeOutlined />}
                                    style={{
                                        backgroundColor: "var(--themes-light)",
                                        color: "var(--themes)",
                                        border: "1px solid transparent",
                                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
                                    }}
                                    onClick={() => handleCardDetails(card)}
                                />
                                <Button
                                    icon={<DeleteOutlined />}
                                    style={{
                                        backgroundColor: "var(--themes-light)",
                                        color: "var(--themes)",
                                        border: "1px solid transparent",
                                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
                                    }}
                                    onClick={() => handleDeleteCard(card.id)}
                                />
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* View Card Details Modal */}
            <Modal
                width={800}
                title="Card Details"
                open={viewDetails}
                onCancel={() => setViewDetails(false)}
                footer={[
                    // edit and close button
                    <Button
                        key="edit"
                        style={{
                            backgroundColor: "var(--theme)",
                            color: "white"
                        }}
                        icon={editMode ? <CheckCircleFilled /> : <EditOutlined />}
                        onClick={() => {
                            if (editMode) {
                                updateCard();
                            }
                            setEditMode(!editMode);
                        }
                        }
                    />,
                    <Button
                        key="close"
                        style={{
                            backgroundColor: "var(--themes)",
                            color: "white"
                        }}
                        icon={<CloseCircleOutlined />}
                        onClick={() => setViewDetails(false)}
                    />,
                ]}>
                {
                    editMode ? (
                        <>
                            <div>
                                <Button
                                    type="primary"
                                    style={{
                                        marginRight: "1rem",
                                        backgroundColor: "var(--theme)",
                                        display:
                                            editMode && editedCardId === cardData.id
                                                ? "inline-block"
                                                : "none",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginBottom: "1rem",
                                    }}
                                    onClick={() =>
                                        handleOpenMediaSelectionModal(cardData.id)
                                    }
                                >
                                    Change Media
                                </Button>
                                <SingleMediaSelect
                                    visible={mediaSelectionVisible}
                                    setVisible={setMediaSelectionVisible}
                                    media={media}
                                    cardId={selectedCardId}
                                    setEditedCardId={setEditedCardId}
                                    onCancel={() => setMediaSelectionVisible(false)}
                                    onMediaSelect={(mediaId) => { setSelectedMediaId(mediaId) }}
                                />
                            </div>
                            {/* Current image and selected image */}
                            <div className="flexed-between" style={{
                                marginBottom: "2rem"
                            }}>
                                <div>
                                    <strong>Current Media</strong>
                                    <MediaRenderEngine item={selectedCard?.media_files} />
                                </div>
                                <ArrowRightOutlined style={{
                                    fontSize: "2rem",
                                    margin: "0 2rem"
                                }} />
                                <div>
                                    <strong>Selected Media</strong>
                                    {
                                        selectedMediaId && (
                                            <MediaRenderEngine item={mediaIdToMedia(selectedMediaId)} />
                                        )
                                    }
                                </div>
                            </div>
                        </>
                    ) : (<MediaRenderEngine item={selectedCard?.media_files} />)
                }

                {
                    editMode ? (
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px"
                        }}>
                            <strong>Title</strong>
                            <Input
                                value={selectedCard?.title_en}
                                onChange={(e) => {
                                    setSelectedCard({
                                        ...selectedCard,
                                        title_en: e.target.value,
                                    });
                                }}
                            />
                            <strong>Title Bangla</strong>
                            <Input
                                value={selectedCard?.title_bn}
                                onChange={(e) => {
                                    setSelectedCard({
                                        ...selectedCard,
                                        title_bn: e.target.value,
                                    });
                                }}
                            />
                            <strong>Description</strong>
                            <RichTextEditor
                                value={selectedCard?.description_en}
                                defaultValue={selectedCard?.description_en}
                                editMode={editMode}
                                onChange={(value) => {
                                    setSelectedCard({
                                        ...selectedCard,
                                        description_en: value,
                                    });
                                }}
                            />
                            <strong>Description Bangla</strong>
                            <RichTextEditor
                                value={selectedCard?.description_bn}
                                defaultValue={selectedCard?.description_bn}
                                editMode={editMode}
                                onChange={(value) => {
                                    setSelectedCard({
                                        ...selectedCard,
                                        description_bn: value,
                                    });
                                }}
                            />
                        </div>
                    ) : (
                        <div>
                            <h2>{selectedCard?.title_en}</h2>
                            {
                                selectedCard?.title_bn && (
                                    <h2>{selectedCard?.title_bn}</h2>
                                )
                            }
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: selectedCard?.description_en,
                                }}
                            />
                            {
                                selectedCard?.description_bn && (
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: selectedCard?.description_bn,
                                        }}
                                    />
                                )
                            }
                        </div>
                    )
                }
            </Modal>
        </div>
    );
};

export default CardGridView;
