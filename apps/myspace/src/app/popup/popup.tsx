import Modal from 'react-bootstrap/Modal';
import React, { SetStateAction, Dispatch } from 'react';

/* eslint-disable-next-line */
export interface PopupProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setValues?: Dispatch<SetStateAction<string>>;
  title: string;
  body: React.ReactNode | string;
  popupAction: React.ReactNode;
}

export function Popup(props: PopupProps) {
  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      className="emp_modal"
    >
      <Modal.Header>
        <div className="modal-header d-flex w-100">
          <div>
            <h4 className="mb-0">{props.title}</h4>
          </div>
          <div>
            <button
              type="button"
              className="btn-close p-3 px-3"
              onClick={() => props.setShow(false)}
            ></button>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body">{props.body}</div>
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary p-3 px-3"
            onClick={() => {
              props.setShow(false);
              props.setValues && props.setValues('');
            }}
          >
            Close
          </button>
          {/* <button
            type="button"
            className="btn btn-success"
            data-bs-dismiss="modal"
          >
            Submit
          </button> */}
          {props.popupAction}
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default Popup;
