import Home from '../pages/Home';
import About from '../pages/About';
import Contacts from '../pages/Contacts';
import Projects from '../pages/Projects';
import { addNameOfComponentToField } from '../functions/addNameOfComponentToField';
let pages = [Home, About, Contacts, Projects];

pages = addNameOfComponentToField(pages, 'uri');

export default pages;
