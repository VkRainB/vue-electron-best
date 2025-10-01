// 右键插件
// https://docs.imengyu.top/vue3-context-menu-docs/en/guide/useage.html
// npm install -save @imengyu/vue3-context-menu

import ContextMenu from '@imengyu/vue3-context-menu';
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css';
import '@/assets/styles/context-menu.scss';

export function setUpContextMenu(app) {
  app.use(ContextMenu);
}
/**
 * @param {MouseEvent} event
 * @param {ContextMenuItem[]} items
 */
export function useContextMenu(event, items) {
  function onContextMenu(event) {
    event.preventDefault();
    //show your menu
    ContextMenu.showContextMenu({
      theme: 'custom',
      x: event.x,
      y: event.y,
      items,
    });
  }
  onContextMenu(event);
}

// can use function mode or component mode
