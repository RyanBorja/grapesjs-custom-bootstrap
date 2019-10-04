import column from './grid_system/column';
import container from './grid_system/container';
import row from './grid_system/row';
import headings from './typography/headings';
export {constants} from '../';

export default (editor, config = {}) => {
    const domc = editor.DomComponents;
    const defaultType = domc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;
    
    const componentList = [
        column(), 
        container(), 
        row(),
        headings(),
    ];
    
    componentList.forEach(component => domc.addType(component.type, component.methods));
  }
  