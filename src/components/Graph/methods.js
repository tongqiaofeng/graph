import '@antv/x6-vue-shape';
//   Graph,Shape,FunctionExt
import {
  Addon
} from '@antv/x6';
// 拖拽生成四边形或者圆形
export const startDragToGraph = (graph, type, e) => {
  const node =
    type === 'Rect' ?
    graph.createNode({
      width: 100,
      height: 100,
      attrs: {
        label: {
          text: '正方形节点',
          fill: '#000000',
          fontSize: 14,
          refY: '100%',
          refY2: 20,
        },
        body: {
          stroke: '#000000',
          strokeWidth: 1,
          fill: '#ffffff',
        }
      },
      ports: ports
    }) :
    type === 'Circle' ? graph.createNode({
      shape: 'circle',
      width: 100,
      height: 100,
      attrs: {
        label: {
          text: '圆形节点',
          fill: '#000000',
          fontSize: 14,
          refY: '100%',
          refY2: 20,

        },
        body: {
          stroke: '#000000',
          strokeWidth: 1,
          fill: '#ffffff',
        }
      },
      ports: ports
    }) :
    type === 'Polyline' ? graph.createNode({
      shape: 'polyline',
      width: 200,
      height: 2,
      attrs: {
        label: {
          text: '线形节点',
          fill: '#000000',
          fontSize: 14,
          refY: '100%',
          refY2: 20,
        },
        body: {
          stroke: '#000',
          strokeWidth: 2,
          fill: 'none',
          refPoints: "0 25 ,200 25",
        }
      },
      ports: ports
    }) : type === 'enlarge' ? graph.createNode({
      shape: 'image',
      width: 312,
      height: 330,
      attrs: {
        image: {
          'xlink:href': require('../../assets/enlarge.svg'), //本地图片
		  width: '100%',
		  height: '100%'
        },
        label: {
          text: 'enlarge',
          fill: '#000000',
          fontSize: 14,
          refY: '100%',
          refY2: 20,
        },
        body: {
          stroke: '#000000',
          strokeWidth: 1,
          fill: '#ffffff',
        }
      },
      ports: ports4
    }) : type === 'lamp' ? graph.createNode({
      shape: 'image',
      width: 70,
      height: 70,
      attrs: {
        image: {
          //远程图片
          // 'xlink:href': 'https://www.processon.com/assets/images/designer/network/tab.svg',
          'xlink:href': require('../../assets/lamp.svg'), //本地图片
		  height:'100%'
        },
        label: {
          text: 'lamp',
          fill: '#000000',
          fontSize: 14,
          refY: '100%',
          refY2: 20,
        },
        body: {
          stroke: '#000000',
          strokeWidth: 1,
          fill: '#ffffff',
        }
      },
      ports: ports
    }) : type === 'exchange' ? graph.createNode({
      shape: 'image',
      width: 120,
      height: 60,
      attrs: {
        image: {
          //远程图片
          // 'xlink:href': 'https://www.processon.com/assets/images/designer/network/tab.svg',
          'xlink:href': require('../../assets/exchange.svg'), //本地图片
        },
        label: {
          text: 'exchange',
          fill: '#000000',
          fontSize: 14,
          refY: '100%',
          refY2: 20,
        },
        body: {
          stroke: '#000000',
          strokeWidth: 1,
          fill: '#ffffff',
        }
      },
      ports: ports2
    }) : type === 'Electric' ? graph.createNode({
      shape: 'image',
      width: 49,
      height: 53,
      attrs: {
        image: {
          //远程图片
          // 'xlink:href': 'https://www.processon.com/assets/images/designer/network/tab.svg',
          'xlink:href': require('../../assets/Electric.svg'), //本地图片

        },
        label: {
          text: 'Electric',
          fill: '#000000',
          fontSize: 14,
          refY: '100%',
          refY2: 20,
        },
        body: {
          stroke: '#000000',
          strokeWidth: 1,
          fill: '#ffffff',
        }
      },
      ports: ports3
    }) : type === 'background' ? graph.createNode({
      shape: 'image',
      width: 850,
      height: 480,
      attrs: {
        image: {
          'xlink:href': require('../../assets/background.svg'), //本地图片
          width: '100%',
          height: '100%'
        },
        label: {
          text: 'background',
          fill: '#000000',
          fontSize: 14,
          refY: '100%',
          refY2: 20,
        },
        body: {
          stroke: '#000000',
          strokeWidth: 1,
          fill: '#ffffff',
        }
      },
      ports: ports
    }) : type === 'train' ? graph.createNode({
      shape: 'image',
      width: 890,
      height: 430,
      attrs: {
        image: {
          'xlink:href': require('../../assets/train.svg'), //本地图片
		  width: '100%',
		  height: '100%'
        },
        label: {
          text: 'train',
          fill: '#000000',
          fontSize: 14,
          refY: '100%',
          refY2: 20,
        },
        body: {
          stroke: '#000000',
          strokeWidth: 1,
          fill: '#ffffff',
        }
      },
      ports: ports
    }) :
    graph.createNode({
      shape: 'polygon',
      x: 40,
      y: 40,
      width: 120,
      height: 120,
      attrs: {
        label: {
          text: '条件节点',
          fill: '#000000',
          fontSize: 14,
          refY: '100%',
          refY2: 20,
          // textWrap: {
          //   width: -50,
          //   height: '70%',
          //   ellipsis: true,
          // },
        },
        body: {
          fill: '#ffffff',
          stroke: '#000000',
          refPoints: '0,10 10,0 20,10 10,20',
          strokeWidth: 1,
        },
      },
      ports: ports
    })

  const dnd = new Addon.Dnd({
    target: graph
  })
  dnd.start(node, e) //流程图组件库中拖拽组件到画布中
}
const ports4 = {
  groups: {
    // 输入链接桩群组定义
    l1: {
      position: 'top',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff',
        },
		          style: {
		            visibility: 'hidden',
		          },
      },
    },
	l2: {
	  position: ['89%','44%'],
	  attrs: {
	    circle: {
	      r: 4,
	      magnet: true,
	      stroke: '#2D8CF0',
	      strokeWidth: 2,
	      fill: '#fff',
	    },
	  },
	},
	l3: {
	  position: ['48%','80%'],
	  attrs: {
	    circle: {
	      r: 4,
	      magnet: true,
	      stroke: '#2D8CF0',
	      strokeWidth: 2,
	      fill: '#fff',
	    },
	  },
	},
	l4: {
	  position: 'left',
	  attrs: {
	    circle: {
	      r: 4,
	      magnet: true,
	      stroke: '#2D8CF0',
	      strokeWidth: 2,
	      fill: '#fff',
	    },
	  },
	},
	l5: {
	  position: ['34%','49%'],
	  attrs: {
	    circle: {
	      r: 4,
	      magnet: true,
	      stroke: '#2D8CF0',
	      strokeWidth: 2,
	      fill: '#fff',
	    },
	  },
	},
	l6: {
	  position: ['34%','55%'],
	  attrs: {
	    circle: {
	      r: 4,
	      magnet: true,
	      stroke: '#2D8CF0',
	      strokeWidth: 2,
	      fill: '#fff',
	    },
	  },
	},	l7: {
	  position: ['46%','52%'],
	  attrs: {
	    circle: {
	      r: 4,
	      magnet: true,
	      stroke: '#2D8CF0',
	      strokeWidth: 2,
	      fill: '#fff',
	    },
	  },
	},l8: {
	  position: ['38.5%','48%'],
	  attrs: {
	    circle: {
	      r: 4,
	      magnet: true,
	      stroke: '#2D8CF0',
	      strokeWidth: 2,
	      fill: '#fff',
	    },
	  },
	},
	},
	items: [{
	    id: 'port1',
	    group: 'l1',
	  },{
	    id: 'port2',
	    group: 'l2',
	  },{
	    id: 'port3',
	    group: 'l3',
	  },{
	    id: 'port4',
	    group: 'l4',
	  },{
	    id: 'port5',
	    group: 'l5',
	  },{
	    id: 'port6',
	    group: 'l6',
	  },{
	    id: 'port7',
	    group: 'l7',
	  },{
	    id: 'port8',
	    group: 'l8',
	  }]
	}

const ports3 = {
  groups: {
    // 输入链接桩群组定义
    l1: {
      position: ['11%','80%'],
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff',
        },
      },
    },
	l2: {
	  position: ['94%','55%'],
	  attrs: {
	    circle: {
	      r: 4,
	      magnet: true,
	      stroke: '#2D8CF0',
	      strokeWidth: 2,
	      fill: '#fff',
	    },
	  },
	},
	l3: {
	  position: ['50%','4%'],
	  attrs: {
	    circle: {
	      r: 4,
	      magnet: true,
	      stroke: '#2D8CF0',
	      strokeWidth: 2,
	      fill: '#fff',
	    },
	  },
	},
	l4: {
	  position: ['50%','99%'],
	  attrs: {
	    circle: {
	      r: 4,
	      magnet: true,
	      stroke: '#2D8CF0',
	      strokeWidth: 2,
	      fill: '#fff',
	    },
	  },
	},
	},
	items: [{
	    id: 'port1',
	    group: 'l1',
	  },{
	    id: 'port2',
	    group: 'l2',
	  },{
	    id: 'port3',
	    group: 'l3',
	  },{
	    id: 'port4',
	    group: 'l4',
	  }]
	}
const ports2 = {
  groups: {
    // 输入链接桩群组定义
    l1: {
      position: [0,'59%'],
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff',
        },
      },
    },
    // 输出链接桩群组定义
    l2: {
      position: ['61%','4%'],
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff',
        },
      },
    },
    l3: {
      position: ['100%','45%'],
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff',
        },
      },
    },
    l4: {
      position: ['41%','96%'],
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff',
        },
      },
    },
	l5:{
	position: ['30.5%','26%'],
	attrs: {
	  circle: {
	    r: 4,
	    magnet: true,
	    stroke: '#2D8CF0',
	    strokeWidth: 2,
	    fill: '#fff',
	  },
	},	
	},
	l6:{
	position: ['80.5%','23%'],
	attrs: {
	  circle: {
	    r: 4,
	    magnet: true,
	    stroke: '#2D8CF0',
	    strokeWidth: 2,
	    fill: '#fff',
	  },
	},	
	},
	l7:{
	position: ['69.5%','73%'],
	attrs: {
	  circle: {
	    r: 4,
	    magnet: true,
	    stroke: '#2D8CF0',
	    strokeWidth: 2,
	    fill: '#fff',
	  },
	},	
	},
	l8:{
	position: ['20%','77%'],
	attrs: {
	  circle: {
	    r: 4,
	    magnet: true,
	    stroke: '#2D8CF0',
	    strokeWidth: 2,
	    fill: '#fff',
	  },
	},	
	}
  },
  items: [{
      id: 'port1',
      group: 'l1',
    },
    {
      id: 'port2',
      group: 'l2',
    },
    {
      id: 'port3',
      group: 'l3',
    },
    {
      id: 'port4',
      group: 'l4',
    }, 
	{
      id: 'port5',
      group: 'l5',
    },
    {
      id: 'port6',
      group: 'l6',
    },
    {
      id: 'port7',
      group: 'l7',
    },
    {
      id: 'port8',
      group: 'l8',
    }
  ],
}
const ports = {
  groups: {
    // 输入链接桩群组定义
    top: {
      position: 'top',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff',
		            style: {
		              visibility: 'hidden',
		            },
        },
      },
    },
    // 输出链接桩群组定义
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff',
        },
      },
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff',
        },
      },
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff',
        },
      },
    },
  },
  items: [{
      id: 'port1',
      group: 'top',
    },
    {
      id: 'port2',
      group: 'bottom',
    },
    {
      id: 'port3',
      group: 'left',
    },
    {
      id: 'port4',
      group: 'right',
    }, {
      id: 'port5',
      group: 'top',
    },
    {
      id: 'port6',
      group: 'bottom',
    },
    {
      id: 'port7',
      group: 'left',
    },
    {
      id: 'port8',
      group: 'right',
    }, {
      id: 'port9',
      group: 'top',
    },
    {
      id: 'port10',
      group: 'bottom',
    },
    {
      id: 'port11',
      group: 'left',
    },
    {
      id: 'port12',
      group: 'right',
    }
  ],
}