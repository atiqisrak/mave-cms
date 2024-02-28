import React, { useState } from 'react';

const PageNameEditor = ({ page, onSave }) => {
    const [editedPageNameEn, setEditedPageNameEn] = useState(page.page_name_en);
    const [editedPageNameBn, setEditedPageNameBn] = useState(page.page_name_bn);

    const handleSave = () => {
        onSave({
            page_name_en: editedPageNameEn,
            page_name_bn: editedPageNameBn,
        });
    };

    return (
        <div className="pageContainer" style={{ padding: '2em 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2em' }}>
                <input
                    type="text"
                    value={editedPageNameEn}
                    onChange={(e) => setEditedPageNameEn(e.target.value)}
                    placeholder="Enter English Page Name"
                />
                <button onClick={handleSave}>Save</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2em' }}>
                <input
                    type="text"
                    value={editedPageNameBn}
                    onChange={(e) => setEditedPageNameBn(e.target.value)}
                    placeholder="বাংলা পেইজের নাম লিখুন"
                />
                <button onClick={handleSave}>সংরক্ষণ</button>
            </div>
        </div>
    );
};

export default PageNameEditor;
