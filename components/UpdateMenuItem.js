import { Button, Input, Modal } from 'antd'
import React from 'react'

const UpdateMenuItem = ({ open, setOpen, value, UpdateUser, setUpdateNavList }) => {
    return (
        <> <Modal open={open} onOk={setOpen} onCancel={() => setOpen(false)} width={600} cancelButtonProps={{ style: { display: 'none' } }} okButtonProps={{ style: { display: 'none' } }}>
            <div className="div" style={{ marginTop: "1rem" }}>
                <h3 style={{ textAlign: "center" }}>Update Menu Item</h3>
                <hr />
                <Input type="text" style={{ marginTop: "1rem" }} value={value} onChange={(e) => setUpdateNavList(e.target.value)} name="" id="" />
                <Button block style={{ marginTop: "1rem" }} onClick={UpdateUser}>Update</Button>
            </div>
        </Modal>

        </>
    )
}

export default UpdateMenuItem
