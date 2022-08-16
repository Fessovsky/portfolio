import Roguelike from '../components/rogueLikeGame/Roguelike';
import Shop from '../components/Shop/Shop';
import NewGame from '../components/NewGame/NewGame';
import Platformer from '../components/Platformer/Platformer';
import { addCustomNameOfComponentToField } from '../functions/addCustomNameOfComponentToField';
let projects = [Roguelike, Shop, NewGame, Platformer];
projects = addCustomNameOfComponentToField(projects, 'projectName');
export default projects;
