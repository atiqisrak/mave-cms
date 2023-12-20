import React, { useState } from 'react';
import { Modal, List, Image, Row, Col } from 'antd';
const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
function MediaSelectionModal1({ mediaList, visible, onCancel, onSelect }) {
  return (
    <Modal

      title="Select a Media Item"
      open={visible}
      onCancel={onCancel}
      footer={null}
      className="uploadMediaModal"
      width={600}


    >
       <div style={{maxHeight: '600px', overflowY: 'auto', overflowX: 'hidden' }}>
   
      <Row gutter={16}>
        {mediaList?.map((media) => (
          <Col span={8} key={media.id} style={{ marginTop: ".5rem" }}>
            <div
              onClick={() => onSelect(media)}
              style={{ cursor: 'pointer' }}
            >
              <Image
                preview={false}
                src={`${MEDIA_URL}/${media.file_path}`}
                alt={media.file_name}
                width={"100%"}
                style={{ objectFit: 'cover', borderRadius: 10 }}
              />
            </div>
          </Col>
        ))}
      </Row>
      </div>
    </Modal>
  );
}

export default MediaSelectionModal1;