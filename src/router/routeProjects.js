import Roguelike from '../components/rogueLikeGame/Roguelike';
import Shop from '../components/Shop/Shop';
import { addNameOfComponentToField } from '../functions/addNameOfComponentToField';
let projects = [Roguelike, Shop];
projects = addNameOfComponentToField(projects, 'projectName');
export default projects;
