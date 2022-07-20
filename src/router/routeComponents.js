import Home from '../pages/Home';
import About from '../pages/About';
import Contacts from '../pages/Contacts';
import Projects from '../pages/Projects';
import { addCustomNameOfComponentToField } from '../functions/addCustomNameOfComponentToField';
let pages = [Home, About, Contacts, Projects];

pages = addCustomNameOfComponentToField(pages, 'uri');
export default pages;
