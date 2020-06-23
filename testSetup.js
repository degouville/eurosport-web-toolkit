import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createMatchers, createSerializer } from 'jest-emotion';
import * as emotion from 'emotion';

expect.extend(createMatchers(emotion));
expect.addSnapshotSerializer(createSerializer(emotion));

configure({ adapter: new Adapter() });
