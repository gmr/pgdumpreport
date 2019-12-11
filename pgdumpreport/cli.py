"""
pgdumpreport CLI interface

"""
import argparse
import io
import json
import logging
import pathlib
import sys
import typing

import pgdumplib
import pgdumplib.dump

from pgdumpreport import html, version

LOGGER = logging.getLogger(__name__)


def parse_cli_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description='Output information from a pg_dump archive',
        formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument('-f', '--format', metavar='FMT', default='json',
                        choices=['json', 'html', 'text'],
                        help='Report output format')
    parser.add_argument('-o', '--out', default='-',
                        help='Output destination, - for stdout')
    parser.add_argument('file', metavar='FILE', nargs=1,
                        help='Path to pg_dump archive')
    return parser.parse_args()


def as_json(args: argparse.Namespace,
            dump: pgdumplib.dump.Dump,
            out: typing.TextIO,
            indent: int = 2) -> typing.NoReturn:
    json.dump({
        "file": pathlib.Path(args.file[0]).name,
        "dbname": dump.dbname,
        "encoding": dump.encoding,
        "created_at": dump.timestamp.isoformat('T'),
        "server_version": dump.server_version,
        "dump_version": '.'.join(str(v) for v in dump.version),
        "pgdumpreport_version": version,
        "entries": [
            {'dump_id': e.dump_id,
             'had_dumper': e.had_dumper,
             'table_oid': e.table_oid,
             'oid': e.oid,
             'tag': e.tag,
             'desc': e.desc,
             'defn': e.defn.rstrip(),
             'drop_stmt': e.drop_stmt.rstrip(),
             'copy_stmt': e.copy_stmt.rstrip(),
             'namespace': e.namespace,
             'tablespace': e.tablespace,
             'tableam': e.tableam,
             'owner': e.owner,
             'with_oids': e.with_oids,
             'dependencies': e.dependencies,
             'data_state': e.data_state,
             'offset': e.offset} for e in dump.entries]
        }, out, indent=indent)


def main():
    args = parse_cli_arguments()
    dump = pgdumplib.load(args.file[0])
    if args.format == 'json':
        out = sys.stdout if args.out == '-' else  open(args.out, 'wt')
        as_json(args, dump, out)
    elif args.format == 'html':
        if args.out == '-':
            sys.stderr.write('Must specify a directory for HTML output\n')
            sys.exit(1)
        out_dir = pathlib.Path(args.out)
        if out_dir.exists() and not out_dir.is_dir():
            sys.stderr.write('Must specify a directory for HTML output\n')
            sys.exit(1)
        elif not out_dir.exists():
            out_dir.mkdir()
        buffer = io.StringIO()
        as_json(args, dump, buffer, 0)
        buffer.seek(0)
        html.as_html(buffer.read(), out_dir)
