import React from 'react';
import { Modal } from 'antd';
import { IUsers } from '@/redux/api/users/types';

interface DeleteModalProps {
    visible: boolean;
    user: IUsers | null;
    onDelete: (id: number) => Promise<void>;
    onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ visible, user, onDelete, onCancel }) => {
    return (
        <Modal
            title="Delete"
            open={visible}
            onOk={() => user && onDelete(user.id)}
            onCancel={onCancel}
            okText="Delete"
            centered
        >
            <h3>Are you sure to delete {user ? user.firstName : ''}?</h3>
        </Modal>
    );
};

export default DeleteModal;
