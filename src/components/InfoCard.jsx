import React from 'react'

const cardTop = {
  marginTop: 15
};

const cardBodyStyle = {
  paddingBottom: 15
};

const dlStyle = {
  marginBottom: 0
};

export default function(props) {
  return (
    <div className='container-fluid'>
      <div className="card" style={cardTop}>
        <div className="card-body row" style={cardBodyStyle}>
          <div className="col-6">
            <dl className="row" style={dlStyle}>
              <dt className="col-4">Database Name</dt>
              <dd className="col-8">{props.dbname}</dd>
              <dt className="col-4">Encoding</dt>
              <dd className="col-8">{props.encoding}</dd>
              <dt className="col-4">Created At</dt>
              <dd className="col-8">{props.created_at}</dd>
            </dl>
          </div>
          <div className="col-6">
            <dl className="row" style={dlStyle}>
              <dt className="col-4">Dump Version</dt>
              <dd className="col-8">{props.dump_version}</dd>
              <dt className="col-4">Server Version</dt>
              <dd className="col-8">{props.server_version}</dd>
              <dt className="col-4">Entries</dt>
              <dd className="col-8">{props.entries}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
