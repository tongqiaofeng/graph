<template>
  <div style="width: 100%">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :showClose="false"
      width="30%"
    >
      <span>是否选择用户模式</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleclick(1)"
          >取 消（默认编辑模式）</el-button
        >
        <el-button type="primary" @click="dialogVisibleclick(2)"
          >确 定（用户模式）</el-button
        >
      </span>
    </el-dialog>

    <div class="container_warp" v-if="select == 0">
      <div id="containerChart" style="width: 100%"></div>
      <RightDrawer
        v-if="mouseshow == false"
        class="right_drawer"
        :drawerType="type"
        :selectCell="selectCell"
        :graph="graph"
        :grid="grid"
        :currentArrow="currentArrow"
        @deleteNode="deleteNode"
        @hideNode="hideNode"
      >
      </RightDrawer>
      <div class="operating">
        <div class="btn-group">
          <div
            class="btn"
            title="红绿灯"
            @mousedown="startDrag('lamp', $event)"
          >
            <img src="../assets/lamp.svg" style="width: 30px; height: 30px" />
          </div>
          <div
            class="btn"
            title="enlarge"
            @mousedown="startDrag('enlarge', $event)"
          >
            <img
              src="../assets/enlarge.svg"
              style="width: 30px; height: 30px"
            />
          </div>
          <div
            class="btn"
            title="exchange"
            @mousedown="startDrag('exchange', $event)"
          >
            <img
              src="../assets/exchange.svg"
              style="width: 30px; height: 30px"
            />
          </div>
          <div
            class="btn"
            title="Electric"
            @mousedown="startDrag('Electric', $event)"
          >
            <img
              src="../assets/Electric.svg"
              style="width: 30px; height: 30px"
            />
          </div>
          <div
            class="btn"
            title="background"
            @mousedown="startDrag('background', $event)"
          >
            <img
              src="../assets/background.svg"
              style="width: 30px; height: 30px"
            />
          </div>
          <div
            class="btn"
            title="train"
            @mousedown="startDrag('train', $event)"
          >
            <img src="../assets/train.svg" style="width: 30px; height: 30px" />
          </div>
          <div
            class="btn"
            title="直线节点"
            @mousedown="startDrag('Polyline', $event)"
          >
            <i class="iconfont icon-zhixiandu"></i>
          </div>
          <div
            class="btn"
            title="圆形节点"
            @mousedown="startDrag('Circle', $event)"
          >
            <i class="iconfont icon-yuanxing"></i>
          </div>
          <div
            class="btn"
            title="正方形节点"
            @mousedown="startDrag('Rect', $event)"
          >
            <i class="iconfont icon-zhengfangxing"></i>
          </div>
          <div class="btn" title="条件节点">
            <i
              class="iconfont icon-lingxing2"
              @mousedown="startDrag('polygon', $event)"
            ></i>
          </div>
          <div class="btn-group_tips" v-if="showTips">拖拽生成 拓扑图形</div>
        </div>
        <div class="btn-group">
          <el-tooltip content="折线" placement="bottom">
            <div
              :class="['btn', currentArrow === 1 ? 'currentArrow' : '']"
              @click="changeEdgeType('normal')"
            >
              <i class="iconfont icon-zhixianjiantou1"></i>
            </div>
          </el-tooltip>

          <el-tooltip content="曲线" placement="bottom">
            <div
              :class="['btn', currentArrow === 2 ? 'currentArrow' : '']"
              @click="changeEdgeType('smooth')"
            >
              <i class="iconfont icon-zhixianjiantou1"></i>
            </div>
          </el-tooltip>
          <el-tooltip content="直线" placement="bottom">
            <div
              :class="['btn', currentArrow === 3 ? 'currentArrow' : '']"
              @click="changeEdgeType('bline')"
            >
              <i class="iconfont icon-zhixianjiantou1"></i>
            </div>
          </el-tooltip>
        </div>
        <div class="btn-group">
          <el-tooltip content="删除" placement="bottom">
            <div class="btn" @click="deleteNode()" style="margin-top: 5px">
              <i class="iconfont icon-shanchu"></i>
            </div>
          </el-tooltip>
          <el-tooltip content="保存PNG" placement="bottom">
            <div class="btn" @click="saveToPNG()" title="保存">
              <i class="iconfont icon-baocuncunchu"></i>
            </div>
          </el-tooltip>
        </div>
        <div class="btn-group">
          <el-tooltip content="undo" placement="bottom">
            <div class="btn" @click="deleteNode()" style="margin-top: 5px">
              <i class="iconfont icon-shanchu"></i>
            </div>
          </el-tooltip>
          <el-tooltip content="redo" placement="bottom">
            <div class="btn" @click="saveToPNG()" title="redo">
              <i class="iconfont icon-baocuncunchu"></i>
            </div>
          </el-tooltip>
          <el-tooltip content="模式切换" placement="bottom">
            <div class="btn" @click="changetype" title="模式切换">
              <i class="iconfont icon-baocuncunchu"></i>
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div v-if="select == 1">
      <p @click="goback">返回</p>
      <p>页面详情</p>
    </div>
  </div>
</template>
<script>
import "@antv/x6-vue-shape";
import { Graph, Shape, FunctionExt, DataUri } from "@antv/x6";
import RightDrawer from "../components/RightDrawer.vue";
import insertCss from "insert-css";
import { startDragToGraph } from "../components/Graph/methods";

let data = [
  {
    position: {
      x: 440,
      y: 280,
    },
    size: {
      width: 70,
      height: 70,
    },
    attrs: {
      image: {
        "xlink:href": "/img/lamp.82e92f81.svg",
        height: "100%",
      },
      label: {
        text: "lamp",
        fill: "#000000",
        fontSize: 14,
        refY: "100%",
        refY2: 20,
      },
      body: {
        stroke: "#000000",
        strokeWidth: 1,
        fill: "#ffffff",
      },
    },
    shape: "image",
    id: "c7284edd-b7b2-4700-a402-e49746cd458a",
    ports: {
      groups: {
        top: {
          position: "top",
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: "#2D8CF0",
              strokeWidth: 2,
              fill: "#fff",
              style: {
                visibility: "hidden",
              },
            },
          },
        },
        bottom: {
          position: "bottom",
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: "#2D8CF0",
              strokeWidth: 2,
              fill: "#fff",
            },
          },
        },
        left: {
          position: "left",
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: "#2D8CF0",
              strokeWidth: 2,
              fill: "#fff",
            },
          },
        },
        right: {
          position: "right",
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: "#2D8CF0",
              strokeWidth: 2,
              fill: "#fff",
            },
          },
        },
      },
      items: [
        {
          id: "port1",
          group: "top",
        },
        {
          id: "port2",
          group: "bottom",
        },
        {
          id: "port3",
          group: "left",
        },
        {
          id: "port4",
          group: "right",
        },
        {
          id: "port5",
          group: "top",
        },
        {
          id: "port6",
          group: "bottom",
        },
        {
          id: "port7",
          group: "left",
        },
        {
          id: "port8",
          group: "right",
        },
        {
          id: "port9",
          group: "top",
        },
        {
          id: "port10",
          group: "bottom",
        },
        {
          id: "port11",
          group: "left",
        },
        {
          id: "port12",
          group: "right",
        },
      ],
    },
    zIndex: 1,
  },
];

// let data = [
//   {
//     position: {
//       x: 110,
//       y: 246,
//     },
//     size: {
//       width: 850,
//       height: 480,
//     },
//     attrs: {
//       image: {
//         "xlink:href": "/img/background.d798b234.svg",
//         width: "100%",
//         height: "100%",
//       },
//       label: {
//         text: "background",
//         fill: "#000000",
//         fontSize: 14,
//         refY: "100%",
//         refY2: 20,
//       },
//       body: {
//         stroke: "#000000",
//         strokeWidth: 1,
//         fill: "#ffffff",
//       },
//     },
//     shape: "image",
//     id: "c27c136a-5f3a-4fdc-9b4d-2a18c9fd8ac3",
//     zIndex: -2,
//     ports: {
//       groups: {
//         top: {
//           position: "top",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         bottom: {
//           position: "bottom",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         left: {
//           position: "left",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         right: {
//           position: "right",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//       },
//       items: [
//         {
//           id: "port1",
//           group: "top",
//         },
//         {
//           id: "port2",
//           group: "bottom",
//         },
//         {
//           id: "port3",
//           group: "left",
//         },
//         {
//           id: "port4",
//           group: "right",
//         },
//         {
//           id: "port5",
//           group: "top",
//         },
//         {
//           id: "port6",
//           group: "bottom",
//         },
//         {
//           id: "port7",
//           group: "left",
//         },
//         {
//           id: "port8",
//           group: "right",
//         },
//         {
//           id: "port9",
//           group: "top",
//         },
//         {
//           id: "port10",
//           group: "bottom",
//         },
//         {
//           id: "port11",
//           group: "left",
//         },
//         {
//           id: "port12",
//           group: "right",
//         },
//       ],
//     },
//   },
//   {
//     position: {
//       x: 90,
//       y: 147,
//     },
//     size: {
//       width: 890,
//       height: 430,
//     },
//     attrs: {
//       image: {
//         "xlink:href": "/img/train.f3329dea.svg",
//         width: "100%",
//         height: "100%",
//       },
//       label: {
//         text: "train",
//         fill: "#000000",
//         fontSize: 14,
//         refY: "100%",
//         refY2: 20,
//       },
//       body: {
//         stroke: "#000000",
//         strokeWidth: 1,
//         fill: "#ffffff",
//       },
//     },
//     shape: "image",
//     id: "55459c79-6b50-42e2-9f89-2ad6cecc7cc8",
//     zIndex: -1,
//     ports: {
//       groups: {
//         top: {
//           position: "top",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         bottom: {
//           position: "bottom",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         left: {
//           position: "left",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         right: {
//           position: "right",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//       },
//       items: [
//         {
//           id: "port1",
//           group: "top",
//         },
//         {
//           id: "port2",
//           group: "bottom",
//         },
//         {
//           id: "port3",
//           group: "left",
//         },
//         {
//           id: "port4",
//           group: "right",
//         },
//         {
//           id: "port5",
//           group: "top",
//         },
//         {
//           id: "port6",
//           group: "bottom",
//         },
//         {
//           id: "port7",
//           group: "left",
//         },
//         {
//           id: "port8",
//           group: "right",
//         },
//         {
//           id: "port9",
//           group: "top",
//         },
//         {
//           id: "port10",
//           group: "bottom",
//         },
//         {
//           id: "port11",
//           group: "left",
//         },
//         {
//           id: "port12",
//           group: "right",
//         },
//       ],
//     },
//   },
//   {
//     position: {
//       x: 583.5,
//       y: 537,
//     },
//     size: {
//       width: 120,
//       height: 60,
//     },
//     attrs: {
//       image: {
//         "xlink:href": "/img/exchange.95999dc5.svg",
//       },
//       label: {
//         text: "exchange",
//         fill: "#000000",
//         fontSize: 14,
//         refY: "100%",
//         refY2: 20,
//       },
//       body: {
//         stroke: "#000000",
//         strokeWidth: 1,
//         fill: "#ffffff",
//       },
//     },
//     shape: "image",
//     id: "be94afb5-625d-4a9e-82dd-e8a7a22255fc",
//     zIndex: 2,
//     ports: {
//       groups: {
//         l1: {
//           position: [0, "59%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//               style: {
//                 visibility: "hidden",
//               },
//             },
//           },
//         },
//         l2: {
//           position: ["61%", "4%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l3: {
//           position: ["100%", "45%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l4: {
//           position: ["41%", "96%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l5: {
//           position: ["30.5%", "26%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l6: {
//           position: ["80.5%", "23%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l7: {
//           position: ["69.5%", "73%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l8: {
//           position: ["20%", "77%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//       },
//       items: [
//         {
//           id: "port1",
//           group: "l1",
//         },
//         {
//           id: "port2",
//           group: "l2",
//         },
//         {
//           id: "port3",
//           group: "l3",
//         },
//         {
//           id: "port4",
//           group: "l4",
//         },
//         {
//           id: "port5",
//           group: "l5",
//         },
//         {
//           id: "port6",
//           group: "l6",
//         },
//         {
//           id: "port7",
//           group: "l7",
//         },
//         {
//           id: "port8",
//           group: "l8",
//         },
//       ],
//     },
//   },
//   {
//     position: {
//       x: 840,
//       y: 424,
//     },
//     size: {
//       width: 120,
//       height: 60,
//     },
//     attrs: {
//       image: {
//         "xlink:href": "/img/exchange.95999dc5.svg",
//       },
//       label: {
//         text: "exchange",
//         fill: "#000000",
//         fontSize: 14,
//         refY: "100%",
//         refY2: 20,
//       },
//       body: {
//         stroke: "#000000",
//         strokeWidth: 1,
//         fill: "#ffffff",
//       },
//     },
//     shape: "image",
//     id: "c8d38abf-13b9-4c21-a6bd-cc514b3b315c",
//     zIndex: 3,
//     ports: {
//       groups: {
//         l1: {
//           position: [0, "59%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l2: {
//           position: ["61%", "4%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l3: {
//           position: ["100%", "45%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l4: {
//           position: ["41%", "96%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l5: {
//           position: ["30.5%", "26%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l6: {
//           position: ["80.5%", "23%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l7: {
//           position: ["69.5%", "73%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l8: {
//           position: ["20%", "77%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//       },
//       items: [
//         {
//           id: "port1",
//           group: "l1",
//         },
//         {
//           id: "port2",
//           group: "l2",
//         },
//         {
//           id: "port3",
//           group: "l3",
//         },
//         {
//           id: "port4",
//           group: "l4",
//         },
//         {
//           id: "port5",
//           group: "l5",
//         },
//         {
//           id: "port6",
//           group: "l6",
//         },
//         {
//           id: "port7",
//           group: "l7",
//         },
//         {
//           id: "port8",
//           group: "l8",
//         },
//       ],
//     },
//   },
//   {
//     shape: "double-edge",
//     attrs: {
//       outline: {
//         strokeWidth: 0,
//       },
//       fill: {
//         connection: true,
//         strokeWidth: 6,
//         strokeLinecap: "line",
//         fill: "none",
//         stroke: {
//           type: "linearGradient",
//           stops: [
//             {
//               offset: "0%",
//               color: "#ff8205",
//             },
//             {
//               offset: "50%",
//               color: "#ff8205",
//             },
//             {
//               offset: "100%",
//               color: "#ff8205",
//             },
//           ],
//         },
//       },
//     },
//     id: "c40cd75a-fedd-4608-b34c-938ee90a6b13",
//     markup: [
//       {
//         tagName: "path",
//         selector: "stroke",
//       },
//       {
//         tagName: "path",
//         selector: "fill",
//       },
//     ],
//     connector: {
//       name: "rounded",
//     },
//     zIndex: 5,
//     source: {
//       cell: "be94afb5-625d-4a9e-82dd-e8a7a22255fc",
//       port: "port6",
//     },
//     target: {
//       cell: "c8d38abf-13b9-4c21-a6bd-cc514b3b315c",
//       port: "port8",
//     },
//   },
//   {
//     position: {
//       x: 220,
//       y: 620,
//     },
//     size: {
//       width: 49,
//       height: 53,
//     },
//     attrs: {
//       image: {
//         "xlink:href": "/img/Electric.5e7528ca.svg",
//       },
//       label: {
//         text: "Electric",
//         fill: "#000000",
//         fontSize: 14,
//         refY: "100%",
//         refY2: 20,
//       },
//       body: {
//         stroke: "#000000",
//         strokeWidth: 1,
//         fill: "#ffffff",
//       },
//     },
//     shape: "image",
//     id: "3e56a9b4-5e5c-458f-8bb8-60718ae5be4d",
//     zIndex: 6,
//     ports: {
//       groups: {
//         l1: {
//           position: ["11%", "80%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l2: {
//           position: ["94%", "55%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l3: {
//           position: ["50%", "4%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l4: {
//           position: ["50%", "99%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//       },
//       items: [
//         {
//           id: "port1",
//           group: "l1",
//         },
//         {
//           id: "port2",
//           group: "l2",
//         },
//         {
//           id: "port3",
//           group: "l3",
//         },
//         {
//           id: "port4",
//           group: "l4",
//         },
//       ],
//     },
//   },
//   {
//     position: {
//       x: 371.5,
//       y: 567,
//     },
//     size: {
//       width: 49,
//       height: 53,
//     },
//     attrs: {
//       image: {
//         "xlink:href": "/img/Electric.5e7528ca.svg",
//       },
//       label: {
//         text: "Electric",
//         fill: "#000000",
//         fontSize: 14,
//         refY: "100%",
//         refY2: 20,
//       },
//       body: {
//         stroke: "#000000",
//         strokeWidth: 1,
//         fill: "#ffffff",
//       },
//     },
//     shape: "image",
//     id: "f1094237-9c33-49b7-912d-25e32f661643",
//     zIndex: 7,
//     ports: {
//       groups: {
//         l1: {
//           position: ["11%", "80%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l2: {
//           position: ["94%", "55%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l3: {
//           position: ["50%", "4%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l4: {
//           position: ["50%", "99%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//       },
//       items: [
//         {
//           id: "port1",
//           group: "l1",
//         },
//         {
//           id: "port2",
//           group: "l2",
//         },
//         {
//           id: "port3",
//           group: "l3",
//         },
//         {
//           id: "port4",
//           group: "l4",
//         },
//       ],
//     },
//   },
//   {
//     position: {
//       x: 481,
//       y: 524,
//     },
//     size: {
//       width: 49,
//       height: 53,
//     },
//     attrs: {
//       image: {
//         "xlink:href": "/img/Electric.5e7528ca.svg",
//       },
//       label: {
//         text: "Electric",
//         fill: "#000000",
//         fontSize: 14,
//         refY: "100%",
//         refY2: 20,
//       },
//       body: {
//         stroke: "#000000",
//         strokeWidth: 1,
//         fill: "#ffffff",
//       },
//     },
//     shape: "image",
//     id: "c1172bd1-0389-4a5f-b71c-68a74eaded8b",
//     zIndex: 8,
//     ports: {
//       groups: {
//         l1: {
//           position: ["11%", "80%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l2: {
//           position: ["94%", "55%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l3: {
//           position: ["50%", "4%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l4: {
//           position: ["50%", "99%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//       },
//       items: [
//         {
//           id: "port1",
//           group: "l1",
//         },
//         {
//           id: "port2",
//           group: "l2",
//         },
//         {
//           id: "port3",
//           group: "l3",
//         },
//         {
//           id: "port4",
//           group: "l4",
//         },
//       ],
//     },
//   },
//   {
//     position: {
//       x: 639,
//       y: 439.5,
//     },
//     size: {
//       width: 49,
//       height: 53,
//     },
//     attrs: {
//       image: {
//         "xlink:href": "/img/Electric.5e7528ca.svg",
//       },
//       label: {
//         text: "Electric",
//         fill: "#000000",
//         fontSize: 14,
//         refY: "100%",
//         refY2: 20,
//       },
//       body: {
//         stroke: "#000000",
//         strokeWidth: 1,
//         fill: "#ffffff",
//       },
//     },
//     shape: "image",
//     id: "5594c6e6-db50-44d0-9830-8ff1a46f0cba",
//     zIndex: 9,
//     ports: {
//       groups: {
//         l1: {
//           position: ["11%", "80%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l2: {
//           position: ["94%", "55%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l3: {
//           position: ["50%", "4%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l4: {
//           position: ["50%", "99%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//       },
//       items: [
//         {
//           id: "port1",
//           group: "l1",
//         },
//         {
//           id: "port2",
//           group: "l2",
//         },
//         {
//           id: "port3",
//           group: "l3",
//         },
//         {
//           id: "port4",
//           group: "l4",
//         },
//       ],
//     },
//   },
//   {
//     position: {
//       x: 756,
//       y: 390,
//     },
//     size: {
//       width: 49,
//       height: 53,
//     },
//     attrs: {
//       image: {
//         "xlink:href": "/img/Electric.5e7528ca.svg",
//       },
//       label: {
//         text: "Electric",
//         fill: "#000000",
//         fontSize: 14,
//         refY: "100%",
//         refY2: 20,
//       },
//       body: {
//         stroke: "#000000",
//         strokeWidth: 1,
//         fill: "#ffffff",
//       },
//     },
//     shape: "image",
//     id: "4beacce2-e502-455f-ab0a-4760baf9d224",
//     zIndex: 10,
//     ports: {
//       groups: {
//         l1: {
//           position: ["11%", "80%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l2: {
//           position: ["94%", "55%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l3: {
//           position: ["50%", "4%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l4: {
//           position: ["50%", "99%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//       },
//       items: [
//         {
//           id: "port1",
//           group: "l1",
//         },
//         {
//           id: "port2",
//           group: "l2",
//         },
//         {
//           id: "port3",
//           group: "l3",
//         },
//         {
//           id: "port4",
//           group: "l4",
//         },
//       ],
//     },
//   },
//   {
//     position: {
//       x: 120,
//       y: 673,
//     },
//     size: {
//       width: 49,
//       height: 53,
//     },
//     attrs: {
//       image: {
//         "xlink:href": "/img/Electric.5e7528ca.svg",
//       },
//       label: {
//         text: "Electric",
//         fill: "#000000",
//         fontSize: 14,
//         refY: "100%",
//         refY2: 20,
//       },
//       body: {
//         stroke: "#000000",
//         strokeWidth: 1,
//         fill: "#ffffff",
//       },
//     },
//     shape: "image",
//     id: "ecf5082e-acfd-48d7-8de6-af72f5efbdc2",
//     zIndex: 11,
//     ports: {
//       groups: {
//         l1: {
//           position: ["11%", "80%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l2: {
//           position: ["94%", "55%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l3: {
//           position: ["50%", "4%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l4: {
//           position: ["50%", "99%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//       },
//       items: [
//         {
//           id: "port1",
//           group: "l1",
//         },
//         {
//           id: "port2",
//           group: "l2",
//         },
//         {
//           id: "port3",
//           group: "l3",
//         },
//         {
//           id: "port4",
//           group: "l4",
//         },
//       ],
//     },
//   },
//   {
//     shape: "double-edge",
//     attrs: {
//       fill: {
//         connection: true,
//         strokeWidth: 4,
//         strokeLinecap: "line",
//         fill: "none",
//         stroke: {
//           type: "linearGradient",
//           stops: [
//             {
//               offset: "0%",
//               color: "#ff8205",
//             },
//             {
//               offset: "50%",
//               color: "#ff8205",
//             },
//             {
//               offset: "100%",
//               color: "#ff8205",
//             },
//           ],
//         },
//       },
//     },
//     id: "778bad27-ba7e-4045-a8f9-8ca857345ca3",
//     markup: [
//       {
//         tagName: "path",
//         selector: "stroke",
//       },
//       {
//         tagName: "path",
//         selector: "fill",
//       },
//     ],
//     connector: {
//       name: "rounded",
//     },
//     zIndex: 14,
//     source: {
//       cell: "ecf5082e-acfd-48d7-8de6-af72f5efbdc2",
//       port: "port2",
//     },
//     target: {
//       cell: "3e56a9b4-5e5c-458f-8bb8-60718ae5be4d",
//       port: "port1",
//     },
//   },
//   {
//     shape: "double-edge",
//     attrs: {
//       outline: {
//         strokeWidth: 0,
//       },
//       fill: {
//         connection: true,
//         strokeWidth: 6,
//         strokeLinecap: "line",
//         fill: "none",
//         stroke: {
//           type: "linearGradient",
//           stops: [
//             {
//               offset: "0%",
//               color: "#ff8205",
//             },
//             {
//               offset: "50%",
//               color: "#ff8205",
//             },
//             {
//               offset: "100%",
//               color: "#ff8205",
//             },
//           ],
//         },
//       },
//     },
//     id: "3a99a613-070c-47b5-bb6b-72098b282c6d",
//     markup: [
//       {
//         tagName: "path",
//         selector: "stroke",
//       },
//       {
//         tagName: "path",
//         selector: "fill",
//       },
//     ],
//     connector: {
//       name: "rounded",
//     },
//     zIndex: 17,
//     source: {
//       cell: "c8d38abf-13b9-4c21-a6bd-cc514b3b315c",
//       port: "port6",
//     },
//     target: {
//       x: 1040,
//       y: 380,
//     },
//     vertices: [
//       {
//         x: 1020,
//         y: 400,
//       },
//     ],
//   },
//   {
//     position: {
//       x: 322,
//       y: 647,
//     },
//     size: {
//       width: 120,
//       height: 60,
//     },
//     attrs: {
//       image: {
//         "xlink:href": "/img/exchange.95999dc5.svg",
//       },
//       label: {
//         text: "exchange",
//         fill: "#000000",
//         fontSize: 14,
//         refY: "100%",
//         refY2: 20,
//       },
//       body: {
//         stroke: "#000000",
//         strokeWidth: 1,
//         fill: "#ffffff",
//       },
//     },
//     shape: "image",
//     id: "42df4c0e-4c4f-411f-a569-845ce9682fab",
//     zIndex: 18,
//     ports: {
//       groups: {
//         l1: {
//           position: [0, "59%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l2: {
//           position: ["61%", "4%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l3: {
//           position: ["100%", "45%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l4: {
//           position: ["41%", "96%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l5: {
//           position: ["30.5%", "26%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l6: {
//           position: ["80.5%", "23%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l7: {
//           position: ["69.5%", "73%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l8: {
//           position: ["20%", "77%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//       },
//       items: [
//         {
//           id: "port1",
//           group: "l1",
//         },
//         {
//           id: "port2",
//           group: "l2",
//         },
//         {
//           id: "port3",
//           group: "l3",
//         },
//         {
//           id: "port4",
//           group: "l4",
//         },
//         {
//           id: "port5",
//           group: "l5",
//         },
//         {
//           id: "port6",
//           group: "l6",
//         },
//         {
//           id: "port7",
//           group: "l7",
//         },
//         {
//           id: "port8",
//           group: "l8",
//         },
//       ],
//     },
//   },
//   {
//     shape: "double-edge",
//     attrs: {
//       outline: {
//         strokeWidth: 0,
//       },
//       fill: {
//         connection: true,
//         strokeWidth: 6,
//         strokeLinecap: "line",
//         fill: "none",
//         stroke: {
//           type: "linearGradient",
//           stops: [
//             {
//               offset: "0%",
//               color: "#ff8205",
//             },
//             {
//               offset: "50%",
//               color: "#ff8205",
//             },
//             {
//               offset: "100%",
//               color: "#ff8205",
//             },
//           ],
//         },
//       },
//     },
//     id: "94c5b6b4-8582-401d-9239-f124d1e0562c",
//     markup: [
//       {
//         tagName: "path",
//         selector: "stroke",
//       },
//       {
//         tagName: "path",
//         selector: "fill",
//       },
//     ],
//     connector: {
//       name: "rounded",
//     },
//     zIndex: 19,
//     source: {
//       cell: "be94afb5-625d-4a9e-82dd-e8a7a22255fc",
//       port: "port8",
//     },
//     target: {
//       cell: "42df4c0e-4c4f-411f-a569-845ce9682fab",
//       port: "port6",
//     },
//   },
//   {
//     shape: "double-edge",
//     attrs: {
//       outline: {
//         strokeWidth: 0,
//       },
//       fill: {
//         connection: true,
//         strokeWidth: 6,
//         strokeLinecap: "line",
//         fill: "none",
//         stroke: {
//           type: "linearGradient",
//           stops: [
//             {
//               offset: "0%",
//               color: "#ff8205",
//             },
//             {
//               offset: "50%",
//               color: "#ff8205",
//             },
//             {
//               offset: "100%",
//               color: "#ff8205",
//             },
//           ],
//         },
//       },
//     },
//     id: "f4df094d-2bee-4bce-9571-1c422c66dde6",
//     markup: [
//       {
//         tagName: "path",
//         selector: "stroke",
//       },
//       {
//         tagName: "path",
//         selector: "fill",
//       },
//     ],
//     connector: {
//       name: "rounded",
//     },
//     zIndex: 20,
//     source: {
//       cell: "42df4c0e-4c4f-411f-a569-845ce9682fab",
//       port: "port8",
//     },
//     target: {
//       cell: "c27c136a-5f3a-4fdc-9b4d-2a18c9fd8ac3",
//       port: "port2",
//     },
//     vertices: [],
//   },
//   {
//     shape: "double-edge",
//     attrs: {
//       fill: {
//         connection: true,
//         strokeWidth: 4,
//         strokeLinecap: "line",
//         fill: "none",
//         stroke: {
//           type: "linearGradient",
//           stops: [
//             {
//               offset: "0%",
//               color: "#ff8205",
//             },
//             {
//               offset: "50%",
//               color: "#ff8205",
//             },
//             {
//               offset: "100%",
//               color: "#ff8205",
//             },
//           ],
//         },
//       },
//     },
//     id: "0436db08-b89c-4f8e-9e49-4ba144403b21",
//     markup: [
//       {
//         tagName: "path",
//         selector: "stroke",
//       },
//       {
//         tagName: "path",
//         selector: "fill",
//       },
//     ],
//     connector: {
//       name: "smooth",
//     },
//     zIndex: 21,
//     source: {
//       cell: "42df4c0e-4c4f-411f-a569-845ce9682fab",
//       port: "port5",
//     },
//     target: {
//       cell: "3e56a9b4-5e5c-458f-8bb8-60718ae5be4d",
//       port: "port2",
//     },
//   },
//   {
//     shape: "double-edge",
//     attrs: {
//       fill: {
//         connection: true,
//         strokeWidth: 4,
//         strokeLinecap: "line",
//         fill: "none",
//         stroke: {
//           type: "linearGradient",
//           stops: [
//             {
//               offset: "0%",
//               color: "#ff8205",
//             },
//             {
//               offset: "50%",
//               color: "#ff8205",
//             },
//             {
//               offset: "100%",
//               color: "#ff8205",
//             },
//           ],
//         },
//       },
//     },
//     id: "e83b2414-59c1-473d-878b-cbe25d1526d8",
//     markup: [
//       {
//         tagName: "path",
//         selector: "stroke",
//       },
//       {
//         tagName: "path",
//         selector: "fill",
//       },
//     ],
//     connector: {
//       name: "smooth",
//     },
//     zIndex: 22,
//     source: {
//       cell: "42df4c0e-4c4f-411f-a569-845ce9682fab",
//       port: "port5",
//     },
//     target: {
//       cell: "f1094237-9c33-49b7-912d-25e32f661643",
//       port: "port1",
//     },
//   },
//   {
//     shape: "double-edge",
//     attrs: {
//       fill: {
//         connection: true,
//         strokeWidth: 4,
//         strokeLinecap: "line",
//         fill: "none",
//         stroke: {
//           type: "linearGradient",
//           stops: [
//             {
//               offset: "0%",
//               color: "#ff8205",
//             },
//             {
//               offset: "50%",
//               color: "#ff8205",
//             },
//             {
//               offset: "100%",
//               color: "#ff8205",
//             },
//           ],
//         },
//       },
//     },
//     id: "a8d3a6ed-31c3-4ef6-9d45-033a33374230",
//     markup: [
//       {
//         tagName: "path",
//         selector: "stroke",
//       },
//       {
//         tagName: "path",
//         selector: "fill",
//       },
//     ],
//     connector: {
//       name: "smooth",
//     },
//     zIndex: 23,
//     source: {
//       cell: "be94afb5-625d-4a9e-82dd-e8a7a22255fc",
//       port: "port5",
//     },
//     target: {
//       cell: "c1172bd1-0389-4a5f-b71c-68a74eaded8b",
//       port: "port2",
//     },
//   },
//   {
//     shape: "double-edge",
//     attrs: {
//       fill: {
//         connection: true,
//         strokeWidth: 4,
//         strokeLinecap: "line",
//         fill: "none",
//         stroke: {
//           type: "linearGradient",
//           stops: [
//             {
//               offset: "0%",
//               color: "#ff8205",
//             },
//             {
//               offset: "50%",
//               color: "#ff8205",
//             },
//             {
//               offset: "100%",
//               color: "#ff8205",
//             },
//           ],
//         },
//       },
//     },
//     id: "3fc731dc-0b0d-4d9b-8d55-941ce5407150",
//     markup: [
//       {
//         tagName: "path",
//         selector: "stroke",
//       },
//       {
//         tagName: "path",
//         selector: "fill",
//       },
//     ],
//     connector: {
//       name: "smooth",
//     },
//     zIndex: 24,
//     source: {
//       cell: "be94afb5-625d-4a9e-82dd-e8a7a22255fc",
//       port: "port5",
//     },
//     target: {
//       cell: "5594c6e6-db50-44d0-9830-8ff1a46f0cba",
//       port: "port1",
//     },
//   },
//   {
//     shape: "double-edge",
//     attrs: {
//       fill: {
//         connection: true,
//         strokeWidth: 4,
//         strokeLinecap: "line",
//         fill: "none",
//         stroke: {
//           type: "linearGradient",
//           stops: [
//             {
//               offset: "0%",
//               color: "#ff8205",
//             },
//             {
//               offset: "50%",
//               color: "#ff8205",
//             },
//             {
//               offset: "100%",
//               color: "#ff8205",
//             },
//           ],
//         },
//       },
//     },
//     id: "ee95fc7d-219d-40a2-958e-889675b6a511",
//     markup: [
//       {
//         tagName: "path",
//         selector: "stroke",
//       },
//       {
//         tagName: "path",
//         selector: "fill",
//       },
//     ],
//     connector: {
//       name: "smooth",
//     },
//     zIndex: 25,
//     source: {
//       cell: "c8d38abf-13b9-4c21-a6bd-cc514b3b315c",
//       port: "port5",
//     },
//     target: {
//       cell: "4beacce2-e502-455f-ab0a-4760baf9d224",
//       port: "port2",
//     },
//   },
//   {
//     position: {
//       x: 911,
//       y: 336,
//     },
//     size: {
//       width: 49,
//       height: 53,
//     },
//     attrs: {
//       image: {
//         "xlink:href": "/img/Electric.5e7528ca.svg",
//       },
//       label: {
//         text: "Electric",
//         fill: "#000000",
//         fontSize: 14,
//         refY: "100%",
//         refY2: 20,
//       },
//       body: {
//         stroke: "#000000",
//         strokeWidth: 1,
//         fill: "#ffffff",
//       },
//     },
//     shape: "image",
//     id: "dd433d61-c24a-465c-90ed-3f9b71673918",
//     zIndex: 26,
//     ports: {
//       groups: {
//         l1: {
//           position: ["11%", "80%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l2: {
//           position: ["94%", "55%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l3: {
//           position: ["50%", "4%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l4: {
//           position: ["50%", "99%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//       },
//       items: [
//         {
//           id: "port1",
//           group: "l1",
//         },
//         {
//           id: "port2",
//           group: "l2",
//         },
//         {
//           id: "port3",
//           group: "l3",
//         },
//         {
//           id: "port4",
//           group: "l4",
//         },
//       ],
//     },
//   },
//   {
//     shape: "double-edge",
//     attrs: {
//       fill: {
//         connection: true,
//         strokeWidth: 4,
//         strokeLinecap: "line",
//         fill: "none",
//         stroke: {
//           type: "linearGradient",
//           stops: [
//             {
//               offset: "0%",
//               color: "#ff8205",
//             },
//             {
//               offset: "50%",
//               color: "#ff8205",
//             },
//             {
//               offset: "100%",
//               color: "#ff8205",
//             },
//           ],
//         },
//       },
//     },
//     id: "15cf34c5-0639-45ee-947b-670f05ebd38f",
//     markup: [
//       {
//         tagName: "path",
//         selector: "stroke",
//       },
//       {
//         tagName: "path",
//         selector: "fill",
//       },
//     ],
//     connector: {
//       name: "smooth",
//     },
//     zIndex: 27,
//     source: {
//       cell: "c8d38abf-13b9-4c21-a6bd-cc514b3b315c",
//       port: "port5",
//     },
//     target: {
//       cell: "dd433d61-c24a-465c-90ed-3f9b71673918",
//       port: "port1",
//     },
//   },
//   {
//     shape: "double-edge",
//     attrs: {
//       fill: {
//         connection: true,
//         strokeWidth: 4,
//         strokeLinecap: "line",
//         fill: "none",
//         stroke: {
//           type: "linearGradient",
//           stops: [
//             {
//               offset: "0%",
//               color: "#ff8205",
//             },
//             {
//               offset: "50%",
//               color: "#ff8205",
//             },
//             {
//               offset: "100%",
//               color: "#ff8205",
//             },
//           ],
//         },
//       },
//     },
//     id: "a22671f2-1613-48c3-b7f9-196fb6dd0eb5",
//     markup: [
//       {
//         tagName: "path",
//         selector: "stroke",
//       },
//       {
//         tagName: "path",
//         selector: "fill",
//       },
//     ],
//     connector: {
//       name: "rounded",
//     },
//     zIndex: 28,
//     source: {
//       cell: "f1094237-9c33-49b7-912d-25e32f661643",
//       port: "port2",
//     },
//     target: {
//       cell: "c1172bd1-0389-4a5f-b71c-68a74eaded8b",
//       port: "port1",
//     },
//   },
//   {
//     shape: "double-edge",
//     attrs: {
//       fill: {
//         connection: true,
//         strokeWidth: 4,
//         strokeLinecap: "line",
//         fill: "none",
//         stroke: {
//           type: "linearGradient",
//           stops: [
//             {
//               offset: "0%",
//               color: "#ff8205",
//             },
//             {
//               offset: "50%",
//               color: "#ff8205",
//             },
//             {
//               offset: "100%",
//               color: "#ff8205",
//             },
//           ],
//         },
//       },
//     },
//     id: "f3bb77fb-9171-47ae-8e0e-3a2a99bc5160",
//     markup: [
//       {
//         tagName: "path",
//         selector: "stroke",
//       },
//       {
//         tagName: "path",
//         selector: "fill",
//       },
//     ],
//     connector: {
//       name: "rounded",
//     },
//     zIndex: 29,
//     source: {
//       cell: "5594c6e6-db50-44d0-9830-8ff1a46f0cba",
//       port: "port2",
//     },
//     target: {
//       cell: "4beacce2-e502-455f-ab0a-4760baf9d224",
//       port: "port1",
//     },
//   },
//   {
//     position: {
//       x: 150,
//       y: 597,
//     },
//     size: {
//       width: 70,
//       height: 70,
//     },
//     attrs: {
//       image: {
//         "xlink:href": "/img/lamp.82e92f81.svg",
//         height: "100%",
//       },
//       label: {
//         text: "lamp",
//         fill: "#000000",
//         fontSize: 14,
//         refY: "100%",
//         refY2: 20,
//       },
//       body: {
//         stroke: "#000000",
//         strokeWidth: 1,
//         fill: "#ffffff",
//       },
//     },
//     shape: "image",
//     id: "564a966f-0216-4471-86b7-2b737247f734",
//     zIndex: 31,
//     ports: {
//       groups: {
//         top: {
//           position: "top",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         bottom: {
//           position: "bottom",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         left: {
//           position: "left",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         right: {
//           position: "right",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//       },
//       items: [
//         {
//           id: "port1",
//           group: "top",
//         },
//         {
//           id: "port2",
//           group: "bottom",
//         },
//         {
//           id: "port3",
//           group: "left",
//         },
//         {
//           id: "port4",
//           group: "right",
//         },
//         {
//           id: "port5",
//           group: "top",
//         },
//         {
//           id: "port6",
//           group: "bottom",
//         },
//         {
//           id: "port7",
//           group: "left",
//         },
//         {
//           id: "port8",
//           group: "right",
//         },
//         {
//           id: "port9",
//           group: "top",
//         },
//         {
//           id: "port10",
//           group: "bottom",
//         },
//         {
//           id: "port11",
//           group: "left",
//         },
//         {
//           id: "port12",
//           group: "right",
//         },
//       ],
//     },
//   },
//   {
//     position: {
//       x: 411,
//       y: 484,
//     },
//     size: {
//       width: 70,
//       height: 70,
//     },
//     attrs: {
//       image: {
//         "xlink:href": "/img/lamp.82e92f81.svg",
//         height: "100%",
//       },
//       label: {
//         text: "lamp",
//         fill: "#000000",
//         fontSize: 14,
//         refY: "100%",
//         refY2: 20,
//       },
//       body: {
//         stroke: "#000000",
//         strokeWidth: 1,
//         fill: "#ffffff",
//       },
//     },
//     shape: "image",
//     id: "9d6df9ce-ce67-4499-90bb-c35f661be345",
//     zIndex: 32,
//     ports: {
//       groups: {
//         top: {
//           position: "top",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         bottom: {
//           position: "bottom",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         left: {
//           position: "left",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         right: {
//           position: "right",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//       },
//       items: [
//         {
//           id: "port1",
//           group: "top",
//         },
//         {
//           id: "port2",
//           group: "bottom",
//         },
//         {
//           id: "port3",
//           group: "left",
//         },
//         {
//           id: "port4",
//           group: "right",
//         },
//         {
//           id: "port5",
//           group: "top",
//         },
//         {
//           id: "port6",
//           group: "bottom",
//         },
//         {
//           id: "port7",
//           group: "left",
//         },
//         {
//           id: "port8",
//           group: "right",
//         },
//         {
//           id: "port9",
//           group: "top",
//         },
//         {
//           id: "port10",
//           group: "bottom",
//         },
//         {
//           id: "port11",
//           group: "left",
//         },
//         {
//           id: "port12",
//           group: "right",
//         },
//       ],
//     },
//   },
//   {
//     position: {
//       x: 686,
//       y: 370,
//     },
//     size: {
//       width: 70,
//       height: 70,
//     },
//     attrs: {
//       image: {
//         "xlink:href": "/img/lamp.82e92f81.svg",
//         height: "100%",
//       },
//       label: {
//         text: "lamp",
//         fill: "#000000",
//         fontSize: 14,
//         refY: "100%",
//         refY2: 20,
//       },
//       body: {
//         stroke: "#000000",
//         strokeWidth: 1,
//         fill: "#ffffff",
//       },
//     },
//     shape: "image",
//     id: "ab3755fb-2c96-4a39-9490-616f02928cf2",
//     zIndex: 33,
//     ports: {
//       groups: {
//         top: {
//           position: "top",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         bottom: {
//           position: "bottom",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         left: {
//           position: "left",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         right: {
//           position: "right",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//       },
//       items: [
//         {
//           id: "port1",
//           group: "top",
//         },
//         {
//           id: "port2",
//           group: "bottom",
//         },
//         {
//           id: "port3",
//           group: "left",
//         },
//         {
//           id: "port4",
//           group: "right",
//         },
//         {
//           id: "port5",
//           group: "top",
//         },
//         {
//           id: "port6",
//           group: "bottom",
//         },
//         {
//           id: "port7",
//           group: "left",
//         },
//         {
//           id: "port8",
//           group: "right",
//         },
//         {
//           id: "port9",
//           group: "top",
//         },
//         {
//           id: "port10",
//           group: "bottom",
//         },
//         {
//           id: "port11",
//           group: "left",
//         },
//         {
//           id: "port12",
//           group: "right",
//         },
//       ],
//     },
//   },
//   {
//     position: {
//       x: 150,
//       y: 267,
//     },
//     size: {
//       width: 312,
//       height: 330,
//     },
//     attrs: {
//       image: {
//         "xlink:href": "/img/enlarge.a229aa62.svg",
//         width: "100%",
//         height: "100%",
//       },
//       label: {
//         text: "enlarge",
//         fill: "#000000",
//         fontSize: 14,
//         refY: "100%",
//         refY2: 20,
//       },
//       body: {
//         stroke: "#000000",
//         strokeWidth: 1,
//         fill: "#ffffff",
//       },
//     },
//     shape: "image",
//     id: "63a8aa4b-608f-4bfa-8c8b-56292b7f2d68",
//     visible: false,
//     zIndex: 34,
//     ports: {
//       groups: {
//         l1: {
//           position: "top",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l2: {
//           position: ["89%", "44%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l3: {
//           position: ["48%", "80%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l4: {
//           position: "left",
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l5: {
//           position: ["34%", "49%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l6: {
//           position: ["34%", "55%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l7: {
//           position: ["46%", "52%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//         l8: {
//           position: ["38.5%", "48%"],
//           attrs: {
//             circle: {
//               r: 4,
//               magnet: true,
//               stroke: "#2D8CF0",
//               strokeWidth: 2,
//               fill: "#fff",
//             },
//           },
//         },
//       },
//       items: [
//         {
//           id: "port1",
//           group: "l1",
//         },
//         {
//           id: "port2",
//           group: "l2",
//         },
//         {
//           id: "port3",
//           group: "l3",
//         },
//         {
//           id: "port4",
//           group: "l4",
//         },
//         {
//           id: "port5",
//           group: "l5",
//         },
//         {
//           id: "port6",
//           group: "l6",
//         },
//         {
//           id: "port7",
//           group: "l7",
//         },
//         {
//           id: "port8",
//           group: "l8",
//         },
//       ],
//     },
//   },
//   {
//     shape: "double-edge",
//     attrs: {
//       line: {
//         stroke: "#23B3DE",
//         strokeWidth: 3,
//         targetMarker: {
//           name: "diamond",
//           size: 3,
//         },
//         strokeLinecap: "round",
//         strokeDasharray: 0,
//         style: {
//           animation: "ant-line 30s infinite linear",
//         },
//       },
//       outline: {
//         stroke: "#f0f",
//         strokeWidth: 0,
//       },
//     },
//     id: "cf99ac5a-1ecf-4f5d-a0a2-23bbf77c5be4",
//     connector: "normal",
//     router: {
//       name: "er",
//       args: {
//         offset: "center",
//       },
//     },
//     zIndex: 35,
//     source: {
//       cell: "63a8aa4b-608f-4bfa-8c8b-56292b7f2d68",
//       port: "port5",
//     },
//     target: {
//       cell: "63a8aa4b-608f-4bfa-8c8b-56292b7f2d68",
//       port: "port6",
//     },
//   },
//   {
//     shape: "double-edge",
//     attrs: {
//       line: {
//         stroke: "#23B3DE",
//         strokeWidth: 3,
//         targetMarker: {
//           name: "diamond",
//           size: 3,
//         },
//         strokeLinecap: "round",
//         strokeDasharray: 0,
//         style: {
//           animation: "ant-line 30s infinite linear",
//         },
//       },
//       outline: {
//         stroke: "#f0f",
//         strokeWidth: 0,
//       },
//     },
//     id: "a5dc7336-f594-4352-846f-5da1377aa85b",
//     connector: "normal",
//     router: {
//       name: "er",
//       args: {
//         offset: "center",
//       },
//     },
//     zIndex: 36,
//     source: {
//       cell: "63a8aa4b-608f-4bfa-8c8b-56292b7f2d68",
//       port: "port8",
//     },
//     target: {
//       cell: "63a8aa4b-608f-4bfa-8c8b-56292b7f2d68",
//       port: "port7",
//     },
//   },
// ];

export default {
  data() {
    return {
      graph: "",
      newcell: {},
      value1: true,
      type: "grid",
      selectCell: "",
      enlargeshow: false,
      mouseshow: false,
      pngurl: "",
      dialogVisible: true,
      connectEdgeType: {
        //连线方式
        connector: "normal",
        router: {
          name: "",
        },
      },
      showTips: false,
      currentArrow: 1,
      grid: {
        // 网格设置
        size: 20, // 网格大小 10px
        visible: true, // 渲染网格背景
        type: "mesh",
        args: {
          color: "#D0D0D0",
          thickness: 1, // 网格线宽度/网格点大小
          factor: 10,
        },
      },
      select: 0,
    };
  },
  components: {
    RightDrawer,
  },
  //渲染
  created() {
    for (const item of data) {
      if (item.isRed == 0) {
        console.log("000000");
        item.attrs.label.fill = "red";
      }
    }
  },
  mounted() {
    // this.initX6();
    setTimeout(() => {
      this.showTips = true;
    }, 1000);
    setTimeout(() => {
      this.showTips = false;
    }, 2000);
  },
  methods: {
    dialogVisibleclick(type) {
      this.dialogVisible = false;
      if (type == 2) {
        this.mouseshow = true;
        this.grid.size = 0;
        console.log(this.graph);
      } else {
        this.grid.size = 20;
        this.mouseshow = false;
      }
      this.initX6();
    },
    textChange(val) {
      console.log(val);
      this.selectCell.attr.label.text = val;
    },
    goback() {
      this.select = 0;
      this.$nextTick(() => {
        this.initX6();
      });
    },
    initX6() {
      console.log("画布");
      var _that = this;
      if (this.mouseshow == false) {
        console.log("false");
        this.graph = new Graph({
          container: document.getElementById("containerChart"),
          width: "100%",
          height: "100%",
          panning: true,
          grid: _that.grid,
          history: true,
          keyboard: true,
          preserveAspectRatio: true,
          mousewheel: {
            enabled: true,
            modifiers: ["ctrl", "meta"],
          },
          rotating: {
            enabled: true, // 旋转
          },
          resizing: {
            //调整节点宽高
            enabled: true,
            orthogonal: false,
            rotating: true,
          },
          selecting: true, //可选
          snapline: true,
          interacting: {
            edgeLabelMovable: true,
            embedding: true,
          },
          connecting: {
            // 节点连接
            anchor: "center",
            connectionPoint: "anchor",
            allowBlank: true,
            snap: true,
            createEdge() {
              return new Shape.DoubleEdge(
                _that.currentArrow == 1
                  ? {
                      attrs: {
                        line: {
                          stroke: "#23B3DE",
                          strokeWidth: 3,
                          strokeLinecap: "round",
                          targetMarker: {
                            name: "diamond",
                            size: 3,
                          },
                          strokeDasharray: 0, //虚线
                          style: {
                            animation: "ant-line 30s infinite linear",
                          },
                        },
                        outline: {
                          stroke: "#f0f",
                          strokeWidth: 0,
                        },
                      },
                      connector: _that.connectEdgeType.connector,
                      router: {
                        name: "er",
                        args: {
                          offset: "center",
                        },
                      },
                    }
                  : {
                      markup: [
                        {
                          tagName: "path",
                          selector: "stroke",
                        },
                        {
                          tagName: "path",
                          selector: "fill",
                        },
                      ],
                      connector: {
                        name: _that.connectEdgeType.connector,
                      },
                      attrs: {
                        fill: {
                          connection: true,
                          strokeWidth: 4,
                          strokeLinecap: "line",
                          fill: "none",
                          stroke: {
                            type: "linearGradient",
                            stops: [
                              {
                                offset: "0%",
                                color: "#ff8205",
                              },
                              {
                                offset: "50%",
                                color: "#ff8205",
                              },
                              {
                                offset: "100%",
                                color: "#ff8205",
                              },
                            ],
                          },
                        },

                        boby: {
                          fill: "none",
                        },
                        // stroke: {
                        //   fill: 'none',
                        //   stroke: '#237804',
                        //   connection: true,
                        //   strokeWidth: 14,
                        //   strokeLinecap: 'round',
                        // },
                      },
                    }
              );
            },
          },
          highlighting: {
            magnetAvailable: {
              name: "stroke",
              args: {
                padding: 4,
                attrs: {
                  strokeWidth: 4,
                  stroke: "#6a6c8a",
                },
              },
            },
          },
        });
      } else {
        console.log("true");
        this.graph = new Graph({
          container: document.getElementById("containerChart"),
          width: "100%",
          height: "100%",
          panning: true,
          grid: _that.grid,
          history: true,
          keyboard: true,
          preserveAspectRatio: true,
          mousewheel: {
            enabled: true,
            modifiers: ["ctrl", "meta"],
          },
          rotating: {
            enabled: false, // 旋转
          },
          resizing: {
            //调整节点宽高
            enabled: false,
            orthogonal: false,
            rotating: false,
          },
          selecting: true, //可选
          snapline: true,
          interacting: {
            edgeLabelMovable: false,
            edgeMovable: false,
            vertexMovable: false,
            vertexAddable: false,
            nodeMovable: false,
          },
          connecting: {
            // 节点连接
            anchor: "center",
            connectionPoint: "anchor",
            allowBlank: true,
            snap: true,
            createEdge() {
              return new Shape.DoubleEdge(
                _that.currentArrow == 1
                  ? {
                      attrs: {
                        line: {
                          stroke: "#23B3DE",
                          strokeWidth: 3,
                          strokeLinecap: "round",
                          targetMarker: {
                            name: "diamond",
                            size: 3,
                          },
                          strokeDasharray: 0, //虚线
                          style: {
                            animation: "ant-line 30s infinite linear",
                          },
                        },
                        outline: {
                          stroke: "#f0f",
                          strokeWidth: 0,
                        },
                      },
                      connector: _that.connectEdgeType.connector,
                      router: {
                        name: "er",
                        args: {
                          offset: "center",
                        },
                      },
                    }
                  : {
                      markup: [
                        {
                          tagName: "path",
                          selector: "stroke",
                        },
                        {
                          tagName: "path",
                          selector: "fill",
                        },
                      ],
                      connector: {
                        name: _that.connectEdgeType.connector,
                      },
                      attrs: {
                        fill: {
                          connection: true,
                          strokeWidth: 4,
                          strokeLinecap: "line",
                          fill: "none",
                          stroke: {
                            type: "linearGradient",
                            stops: [
                              {
                                offset: "0%",
                                color: "#ff8205",
                              },
                              {
                                offset: "50%",
                                color: "#ff8205",
                              },
                              {
                                offset: "100%",
                                color: "#ff8205",
                              },
                            ],
                          },
                        },

                        boby: {
                          fill: "none",
                        },
                        // stroke: {
                        //   fill: 'none',
                        //   stroke: '#237804',
                        //   connection: true,
                        //   strokeWidth: 14,
                        //   strokeLinecap: 'round',
                        // },
                      },
                    }
              );
            },
          },
          highlighting: {
            magnetAvailable: {
              name: "stroke",
              args: {
                padding: 4,
                attrs: {
                  strokeWidth: 4,
                  stroke: "#6a6c8a",
                },
              },
            },
          },
        });
      }
      insertCss(`
              @keyframes ant-line {
                to {
                    stroke-dashoffset: -1000
                }
              }
            `);

      this.graph.fromJSON(data);
      this.graph.history.redo();
      this.graph.history.undo();

      // 鼠标移入移出节点
      this.graph.on(
        "node:mouseenter",
        FunctionExt.debounce(() => {
          const container = document.getElementById("containerChart");
          const ports = container.querySelectorAll(".x6-port-body");
          if (this.mouseshow == false) {
            this.showPorts(ports, true);
          } else {
            this.showPorts(ports, false);
          }
        }),
        500
      );
      this.graph.on(
        "node:mouseleave",
        FunctionExt.debounce(() => {
          const container = document.getElementById("containerChart");
          const ports = container.querySelectorAll(".x6-port-body");
          this.showPorts(ports, false);
        }),
        500
      );
      this.graph.on("node:mouseleave", (node) => {
        console.log("鼠标移出");
        if (node.node.attrs.label.text == "Electric") {
          for (const item of data) {
            if (
              item.attrs.image != undefined &&
              item.attrs.label.text == "enlarge"
            ) {
              item.visible = false; //悬浮图标隐藏
              this.graph.fromJSON(data);
            }
          }
        }

        const container = document.getElementById("containerChart");
        const ports = container.querySelectorAll(".x6-port-body");
        // if (this.mouseshow == false) {
        this.showPorts(ports, false);
      });
      // 画布点击
      this.graph.on("blank:click", () => {
        this.type = "grid";
        console.log("点击11111111111");
      });
      this.graph.on("node:mouseenter", (node) => {
        let nodedata = JSON.parse(JSON.stringify(node.node));
        console.log("鼠标移入", node);

        if (node.node.attrs.label.text == "Electric") {
          // console.log("鼠标移入",node) 312 330
          for (const item of data) {
            if (
              item.attrs.image != undefined &&
              item.attrs.label.text == "enlarge"
            ) {
              item.visible = true;
              item.position.x = nodedata.position.x - 246;
              item.position.y = nodedata.position.y - 320;
              this.graph.fromJSON(data);

              console.log("enlarge", item);
            }
          }
        }

        const container = document.getElementById("containerChart");
        const ports = container.querySelectorAll(".x6-port-body");
        // if (this.mouseshow == false) {
        this.showPorts(ports, false);
      });

      // 节点/线 点击事件
      this.graph.on("cell:click", ({ cell }) => {
        if (this.mouseshow == false) {
          this.type = cell.isNode() ? "node" : "edge";
          console.log("点击2222222222222222");
          console.log(cell);

          const view = this.graph.findView(cell);
          console.log(view);
        }
      });

      this.graph.on("selection:changed", (args) => {
        if (this.mouseshow == false) {
          args.added.forEach((cell) => {
            this.selectCell = cell;
            if (cell.isEdge()) {
              // cell.isEdge() && cell.attr("line/strokeDasharray", 5); //虚线蚂蚁线
              cell.isEdge() && cell.attr("outline/strokeWidth", 3);
              cell.addTools([
                {
                  name: "vertices",
                  args: {
                    padding: 4,
                    attrs: {
                      strokeWidth: 0.1,
                      stroke: "#2d8cf0",
                      fill: "#ffffff",
                    },
                  },
                },
              ]);
            }
          });
          args.removed.forEach((cell) => {
            console.log("9999999992222222222222", cell);
            // cell.isEdge() && cell.attr("line/strokeDasharray", 0); //正常线
            cell.isEdge() && cell.attr("outline/strokeWidth", 0);
            // cell.removeTools();
          });
        }
      });

      this.graph.bindKey("ctrl+c", () => {
        const cells = this.graph.getSelectedCells();
        if (cells.length) {
          this.graph.copy(cells);
          console.log("cccccc");
        }
        return false;
      });

      this.graph.bindKey("ctrl+v", () => {
        console.log(this.graph.isClipboardEmpty());
        if (this.graph.isClipboardEmpty()) {
          const cells = this.graph.paste({
            offset: 32,
          });
          this.graph.cleanSelection();
          this.graph.select(cells);
          console.log("vvvv");
        }
        return false;
      });
    },
    changetype() {
      this.dialogVisible = true;
      const container = document.getElementById("containerChart");
      const ports = container.querySelectorAll(".x6-port-body");
      this.showPorts(ports, false);
    },
    showPorts(ports, show) {
      console.log("showPorts", show);
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        if (this.mouseshow == false) {
          ports[i].style.visibility = show ? "visible" : "hidden";
        } else {
          ports[i].style.visibility = "hidden";
        }
      }
    },
    // 拖拽生成正方形或者圆形
    startDrag(type, e) {
      startDragToGraph(this.graph, type, e);
      // console.log('down')
    },

    // 查看详情
    // lookDetails(val) {
    //   console.log(val);
    // },
    //隐藏节点
    hideNode() {
      this.selectCell.hide();
    },
    // 删除节点
    deleteNode() {
      const cell = this.graph.getSelectedCells();
      console.log("删除节点");
      console.log(cell);
      this.graph.removeCells(cell);
      this.type = "grid";
      console.log("节点", this.graph);
    },
    // 保存png
    saveToPNG() {
      this.$nextTick(() => {
        console.log("拓扑图");
        console.log(this.graph);
        console.log(this.graph.toJSON());
        sessionStorage.setItem("imgData", JSON.stringify(this.graph.toJSON()));
        this.graph.toPNG(
          (dataUri) => {
            // 下载
            console.log(dataUri);
            this.pngurl = dataUri;
            DataUri.downloadDataUri(dataUri, "拓扑图.png");
          },
          {
            backgroundColor: "white",
            padding: {
              top: 50,
              right: 50,
              bottom: 50,
              left: 50,
            },
            quality: 1,
            copyStyles: false,
          }
        );
      });
    },
    // 改变边形状
    changeEdgeType(e) {
      if (e === "normal") {
        this.connectEdgeType = {
          connector: "normal",
          router: {
            name: "er",
            args: {
              offset: "center",
            },
          },
        };
        this.currentArrow = 1;
      } else if (e === "smooth") {
        this.connectEdgeType = {
          connector: "smooth",
          router: {
            name: "",
          },
        };
        this.currentArrow = 2;
      } else if (e === "bline") {
        this.connectEdgeType = {
          connector: "rounded",
          router: {
            name: "",
          },
        };
        this.currentArrow = 3;
      }
    },
  },
};
</script>
<style lang="scss">
@import "../assets/iconfont/iconfont.css";
@import "./index.scss";
</style>
