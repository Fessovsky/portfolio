import Roguelike from '../components/rogueLikeGame/Roguelike';
import Shop from '../components/Shop/Shop';
import { addCustomNameOfComponentToField } from '../functions/addCustomNameOfComponentToField';
let projects = [Roguelike, Shop];
projects = addCustomNameOfComponentToField(projects, 'projectName');
export default projects;
