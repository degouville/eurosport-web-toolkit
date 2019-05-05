import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { matchers } from 'jest-emotion';

expect.extend(matchers);

configure({ adapter: new Adapter() });
