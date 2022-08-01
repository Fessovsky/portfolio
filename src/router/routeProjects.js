import Roguelike from '../components/rogueLikeGame/Roguelike';
import Shop from '../components/Shop/Shop';
import NewGame from '../components/NewGame/NewGame';
import { addCustomNameOfComponentToField } from '../functions/addCustomNameOfComponentToField';
let projects = [Roguelike, Shop, NewGame];
projects = addCustomNameOfComponentToField(projects, 'projectName');
export default projects;
