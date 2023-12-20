import { Button, Checkbox, Col, Image, Modal, Radio, Row } from 'antd'
import React, { useState } from 'react'
import instance from '../axios';
const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
const SelectLogo = ({ open, setOpen, logo }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const handleRadioChange = (e) => {
        setSelectedImage(e.target.value);
    };
    const UpdateLogo = async () => {
        let item = { logo_id: selectedImage, menu_id: 1, }
        // setNews(item)

        const Update = await instance.put(`/navbars/${selectedImage}`,
            item
        )
    }
    return (
        <div>
            <Modal open={open} onOk={setOpen} onCancel={() => setOpen(false)} width={800} cancelButtonProps={{ style: { display: 'none' } }} okButtonProps={{ style: { display: 'none' } }}>
                <div className="modalContiner">
                    <h3 style={{ textAlign: "center" }}>Update</h3>
                    <hr />
                    <Radio.Group style={{ marginTop: "1rem" }} onChange={handleRadioChange} value={selectedImage}>
                        {logo?.slice(0, 10)?.map((image) => (
                            <Radio key={image.id} value={image.id}>
                                <Image width={200} src={`${MEDIA_URL}/${image?.file_path}`} preview={false} />
                                {/* <div>{image.label}</div> */}
                            </Radio>
                        ))}
                    </Radio.Group>
                    <Button block style={{ marginTop: "1rem" }} onClick={() => UpdateLogo()}>Update</Button>
                </div>
            </Modal>
        </div>
    )
}

export default SelectLogo
