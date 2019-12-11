import React from 'react'

import {default as TBody} from './TBody';

const marginTop = {
  marginTop: '1em'
};

export default function(props) {

  return (
    <div className='container-fluid' style={marginTop}>
      <table className='table table-striped table-hover table-sm'>
        <thead>
          <tr>
            <th scope='col' className='text-center'>id</th>
            <th scope='col'>desc</th>
            <th scope='col'>namespace</th>
            <th scope='col'>tag</th>
            <th scope='col' className='text-center'>defn</th>
            <th scope='col' className='text-center'>copy</th>
            <th scope='col' className='text-center'>drop</th>
            <th scope='col'>owner</th>
            <th scope='col'>tablespace</th>
            <th scope='col'>tableam</th>
            <th scope='col' className='text-center'>oid</th>
            <th scope='col' className='text-center'>table_oid</th>
            <th scope='col' className='text-center'>dependencies</th>
          </tr>
        </thead>
        <TBody rows={props.entries} setCode={props.setCode} />
      </table>
    </div>
  );
};
