import React, { Component } from "react";
import { Modal, Button } from "antd";
import PostAddForm from "./PostAddForm/PostAddForm";

class PostAddModal extends Component {
  render() {
    const { visible, closeModal, modalDataLoading, createPost } = this.props;
    return (
      <>
        <Modal
          title="Create Post"
          visible={visible}
          onCancel={closeModal}
          centered="true"
          footer={[
            <Button key="back" onClick={closeModal}>
              Cancel
            </Button>,
            <Button form="form" htmlType="submit" key="submit" type="primary">
              Save
            </Button>,
          ]}
        >
          <PostAddForm
            createPost={createPost}
            modalDataLoading={modalDataLoading}
          />
        </Modal>
      </>
    );
  }
}

export default PostAddModal;
