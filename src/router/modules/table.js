/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dynamicTable/index'),
      name: 'DynamicTable',
      meta: { title: 'dynamicTable' }
    },
    {
      path: 'tree-table',
      component: () => import('@/views/table/treeTable/treeTable'),
      name: 'TreeTableDemo',
      meta: { title: 'treeTable' }
    },
    {
      path: 'custom-tree-table',
      component: () => import('@/views/table/treeTable/customTreeTable'),
      name: 'CustomTreeTableDemo',
      meta: { title: 'customTreeTable' }
    }
  ]
}
export default tableRouter
