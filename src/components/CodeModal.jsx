import React from 'react';
import hljs from 'highlight.js';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';

export default function(props) {
  if (props.code.dump_id === null) return (<div> </div>);

  let title = props.code.operation + ' ';
  if (props.code.tag.startsWith(props.code.desc)) {
    if (props.code.namespace !== '') {
      title = title + props.code.namespace + '.' + props.code.tag;
    } else {
      title = title + props.code.tag;
    }
  } else {
    if (props.code.namespace !== '') {
      title = title + props.code.desc + ' ' + props.code.namespace + '.' + props.code.tag;
    } else {
      title = title + props.code.desc + ' ' + props.code.tag;
    }
  }

  return (
    <Modal autoFocus={true}
           centered={true}
           fade={false}
           isOpen={true}
           scrollable={true}
           size='lg'
           toggle={props.clearCode}>
      <ModalHeader toggle={props.clearCode}>{title}</ModalHeader>
      <ModalBody>
        <div className='card'>
          <div className='card-body'
               dangerouslySetInnerHTML={{__html: hljs.highlight('sql', props.code.sql).value}}>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
