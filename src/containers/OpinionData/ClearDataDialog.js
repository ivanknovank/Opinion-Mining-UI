import React from 'react';
import { Button, Modal, ModalFooter, ModalHeader } from 'reactstrap';

export default function ClearDataDialog({ modal, setModal, submit, className }) {
  const toggle = () => setModal(!modal);
  const handleSubmit = () => {
    submit();
    toggle();
  }
  return (
    <Modal isOpen={modal} toggle={toggle}  className={className}>
        <ModalHeader toggle={toggle}>Clear all data</ModalHeader>
        <ModalFooter className="">
          <div>
            <Button color="secondary mr-auto" onClick={toggle}>Cancel</Button>
            <Button color="primary" onClick={handleSubmit} >Yes</Button>
          </div>
        </ModalFooter>
      </Modal>
	);
}
