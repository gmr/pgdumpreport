"""
Render the single-page HTML doc

"""
import pathlib
import pkgutil
import typing

from pgdumpreport import version


def as_html(data: str, output_path: pathlib.Path) -> typing.NoReturn:
    for filename in ['index.html', 'main.js']:
        file = pkgutil.get_data(
            __name__.split('.')[0],
            'static/{}'.format(filename)).decode('utf-8')
        if filename == 'index.html':
            for find, value in [('version', version), ('dump_data', data)]:
                file = file.replace(
                    '%%{}%%'.format(find), value.replace('\n', ''))
        with (output_path / filename).open('wt') as handle:
            handle.write(file)
