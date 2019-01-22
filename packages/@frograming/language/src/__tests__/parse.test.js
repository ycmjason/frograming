import { readFile, readdirSync } from 'fs-extra';
import { join } from 'path';
import parse from '../parse';

const readdirFullSync = (dir) => readdirSync(dir).map(name => join(dir, name));

describe('parser', () => {
  readdirFullSync(join(__dirname, './frogram-specs/frogs'))
    .filter(n => /.frog$/.test(n))
    .forEach(path => it(path, async () => {
      expect(parse(await readFile(path, 'utf8'))).toMatchSnapshot();
    }));
});
