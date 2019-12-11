import React from 'react'

const numberStyle = {
  fontFamily: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
  textAlign: 'center'
};

function Row(props) {

  function showCode(e) {
    e.preventDefault();
    props.setCode({
      desc: props.desc,
      dump_id: props.dump_id,
      namespace: props.namespace,
      operation: e.target.dataset.operation,
      sql: e.target.dataset.sql,
      tag: props.tag})
  }

  return (<tr>
    <td style={numberStyle}>{props.dump_id}</td>
    <td>{props.desc}</td>
    <td>{props.namespace}</td>
    <td>{props.tag}</td>
    <td className='text-center'>
      {props.defn && (
        <a href="#" onClick={showCode}>
          <i className="fas fa-external-link-alt" data-operation="Define" data-sql={props.defn} />
        </a>)}
    </td>
    <td className='text-center'>
      {props.copy_stmt && (
        <a href="#" onClick={showCode}>
          <i className="fas fa-external-link-alt" data-operation="Copy" data-sql={props.copy_stmt} />
        </a>)}
    </td>
    <td className='text-center'>
      {props.drop_stmt && (
        <a href="#" onClick={showCode}>
          <i className="fas fa-external-link-alt" data-operation="Drop" data-sql={props.drop_stmt} />
        </a>)}
    </td>
    <td>{props.owner}</td>
    <td>{props.tablespace}</td>
    <td>{props.tableam}</td>
    <td style={numberStyle}>{props.oid}</td>
    <td style={numberStyle}>{props.tableOid}</td>
    <td style={numberStyle}>{props.dependencies.join(', ')}</td>
  </tr>);
}

export default function(props) {
  return (
    <tbody>
      {
        props.rows.map(row => {
          return (<Row key={row.dump_id}
                       dump_id={row.dump_id}
                       had_dumper={row.had_dumper}
                       table_oid={row.table_oid}
                       oid={row.oid}
                       tag={row.tag}
                       desc={row.desc}
                       defn={row.defn}
                       drop_stmt={row.drop_stmt}
                       copy_stmt={row.copy_stmt}
                       namespace={row.namespace}
                       tablespace={row.tablespace}
                       tableam={row.tableam}
                       owner={row.owner}
                       with_oids={row.with_oids}
                       dependencies={row.dependencies}
                       data_state={row.data_state}
                       setCode={props.setCode} />);
        })
      }
    </tbody>
  );
}
