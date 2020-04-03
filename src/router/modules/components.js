/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noredirect',
  name: 'ComponentDemo',
  meta: {
    title: 'components',
    icon: 'component'
  },
  children: [{
      path: 'markdown',
      component: () =>
        import('@/views/components-demo/markdown'),
      name: 'MarkdownDemo',
      meta: {
        title: 'markdown'
      }
    },
    {
      path: 'tinymce',
      component: () =>
        import('@/views/components-demo/tinymce'),
      name: 'TinymceDemo',
      meta: {
        title: 'tinymce'
      }
    },
    {
      path: 'json-editor',
      component: () =>
        import('@/views/components-demo/jsonEditor'),
      name: 'JsonEditorDemo',
      meta: {
        title: 'jsonEditor'
      }
    },
    {
      path: 'splitpane',
      component: () =>
        import('@/views/components-demo/splitpane'),
      name: 'SplitpaneDemo',
      meta: {
        title: 'splitPane'
      }
    },
    {
      path: 'sticky',
      component: () =>
        import('@/views/components-demo/sticky'),
      name: 'StickyDemo',
      meta: {
        title: 'sticky'
      }
    },
    {
      path: 'count-to',
      component: () =>
        import('@/views/components-demo/countTo'),
      name: 'CountToDemo',
      meta: {
        title: 'countTo'
      }
    },
    {
      path: 'mixin',
      component: () =>
        import('@/views/components-demo/mixin'),
      name: 'ComponentMixinDemo',
      meta: {
        title: 'componentMixin'
      }
    },
    {
      path: 'back-to-top',
      component: () =>
        import('@/views/components-demo/backToTop'),
      name: 'BackToTopDemo',
      meta: {
        title: 'backToTop'
      }
    },
    {
      path: 'drag-dialog',
      component: () =>
        import('@/views/components-demo/dragDialog'),
      name: 'DragDialogDemo',
      meta: {
        title: 'dragDialog'
      }
    },
    {
      path: 'drag-kanban',
      component: () =>
        import('@/views/components-demo/dragKanban'),
      name: 'DragKanbanDemo',
      meta: {
        title: 'dragKanban'
      }
    },
    {
      path: 'carousel3D',
      component: () =>
        import('@/views/components-demo/carousel3D'),
      name: 'carousel3D',
      meta: {
        title: 'carousel3D'
      }
    }, {
      path: '/picviewer',
      component: () =>
        import('@/views/components-demo/picViewer'),
      name: 'picviewer',
      meta: {
        title: 'picviewer'
      }
    },
    {
      path: '/vueplayer',
      component: () =>
        import('@/components/dplay/index.vue'),
      name: 'vueplayer',
      meta: {
        title: 'vueplayer'
      }
    },
    {
      path: '/plupload',
      component: () =>
        import('@/views/components-demo/plupload'),
      name: 'plupload',
      meta: {
        title: 'plupload'
      }
    }, {
      path: '/canvas',
      component: () =>
        import('@/views/components-demo/canvas/index'),
      name: 'canvas',
      meta: {
        title: 'canvas'
      }
    }
  ]
}

export default componentsRouter
