import React, {useState} from 'react';
import {render} from 'react-dom';

import hljs from 'highlight.js';
import sql from 'highlight.js/lib/languages/sql';

import {CodeModal, InfoCard, Navbar, Table} from './components/';

hljs.registerLanguage('sql', sql);
hljs.configure({useBR: true});

const noCode = {
  desc: null,
  dump_id: null,
  namespace: null,
  operation: null,
  tag: null,
  sql: null
};

document.title = 'pgdumpreport :: ' + dump.file;

function Main() {
  const [code, setCode] = useState(noCode);

  function clearCode() {
    setCode(noCode);
  }

  return (
    <div>
      <Navbar file={dump.file} />
      <InfoCard created_at={dump.created_at}
                dbname={dump.dbname}
                dump_version={dump.dump_version}
                encoding={dump.encoding}
                entries={dump.entries.length}
                server_version={dump.server_version} />
      <Table entries={dump.entries} setCode={setCode} />
      <CodeModal code={code} clearCode={clearCode} />
    </div>
  );
}

render(<Main />,  document.getElementById('main'));
