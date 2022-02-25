<template>
  <div class="drawer_container">
    <div v-if="drawerType === 'grid'">
      <div class="drawer_title">画布背景设置</div>
      <div class="drawer_wrap">
        <el-form label-position="left" label-width="85px">
          <el-form-item label="是否显示网格" label-width="100px">
            <el-switch v-model="showGrid" @change="changeGrid1" />
          </el-form-item>
          <div v-show="showGrid">
            <el-form-item label="网格类型">
              <el-radio-group v-model="grid.type" @change="changeGridType">
                <el-radio
                  v-for="item in gridTypeList"
                  :label="item.value"
                  :key="item.value"
                  ><span>{{ item.label }}</span></el-radio
                >
              </el-radio-group>
            </el-form-item>
            <el-form-item label="网格大小">
              <el-slider
                v-model="grid.size"
                :min="0"
                :max="30"
                @change="changeGrid"
              ></el-slider>
            </el-form-item>
            <el-form-item label="网格颜色">
              <el-color-picker
                v-model="grid.args.color"
                @change="changeGrid"
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="网格线宽度">
              <el-slider
                v-model="grid.args.thickness"
                :min="0"
                :max="20"
                @change="changeGrid"
              ></el-slider>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div v-if="drawerType === 'node'">
      <div class="drawer_title">节点设置</div>
      <div class="drawer_wrap">
        <el-form label-position="left" label-width="80px">
          <el-form-item label="节点文本">
            <el-input
              v-model="drawerNode.nodeText"
              @input="changeNodeText"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="drawerNode.noteText"
              @input="changeNoteText"
            ></el-input>
          </el-form-item>
          <el-form-item label="节点背景">
            <el-color-picker
              v-model="drawerNode.fill"
              @change="changeFill"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="字体大小">
            <el-slider
              v-model="drawerNode.fontSize"
              :min="10"
              :max="20"
              @change="changefontSize"
            ></el-slider>
          </el-form-item>
          <el-form-item label="字体颜色">
            <el-color-picker
              v-model="drawerNode.fontFill"
              @change="changeFontFill"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="边框宽度">
            <el-slider
              v-model="drawerNode.strokeWidth"
              :min="0"
              :max="10"
              @change="changeStrokeWidth"
            ></el-slider>
          </el-form-item>
          <el-form-item label="边框颜色">
            <el-color-picker
              v-model="drawerNode.stroke"
              @change="changeStroke"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="旋转角度">
            <el-slider
              v-model="drawerNode.angle"
              :min="0"
              :max="360"
              @change="changeAngle"
            ></el-slider>
          </el-form-item>
          <el-form-item label="功能">
            <!-- <el-button type="primary" @click="checkDetail">查看</el-button> -->
            <el-button type="primary" @click="hideTools">隐藏</el-button>
            <el-button type="primary" @click="toTop">顶层</el-button>
            <el-button type="primary" @click="toBottom">底层</el-button>
            <el-button type="danger" style="margin: 15px 0" @click="deleteNode"
              >删除</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-if="drawerType === 'edge'">
      <div class="drawer_title">线条设置</div>
      <div class="drawer_wrap">
        <el-form label-position="left" label-width="80px">
          <el-form-item label="线条文本">
            <el-input
              v-model="drawerEdge.EdgeText"
              @input="changeEdgeText"
            ></el-input>
          </el-form-item>
          <el-form-item label="线条宽度">
            <el-slider
              v-model="drawerEdge.edgeWidth"
              :min="1"
              :max="10"
              @change="changeEdgeWidth"
            ></el-slider>
          </el-form-item>
          <el-form-item label="线条样式" v-if="currentArrow == 1">
            <el-slider
              v-model="drawerEdge.edgeDasharray"
              :min="0"
              :max="10"
              @change="changeEdgeDasharray"
            ></el-slider>
          </el-form-item>
          <el-form-item label="线条颜色">
            <el-color-picker
              v-model="drawerEdge.edgeColor"
              @change="changeEdgeColor"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="功能">
            <el-button type="danger" @click="deleteNode">删除</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RightDrawer",
  data() {
    return {
      gridTypeList: [
        {
          label: "四边网格",
          value: "mesh",
        },
        {
          label: "点状网格",
          value: "dot",
        },
      ],
      showGrid: true,
      drawerNode: {
        fill: "",
        nodeText: "",
        noteText: "",
        fontSize: null,
        fontFill: "",
        strokeWidth: null,
        stroke: "",
        angle: null,
      },
      drawerEdge: {
        EdgeText: "",
        edgeWidth: null,
        edgeColor: "",
        edgeDasharray: null,
      },
    };
  },
  props: ["drawerType", "selectCell", "graph", "grid", "currentArrow"],
  created() {},
  mounted() {},
  watch: {
    selectCell: {
      handler(val) {
        if (val) {
          if (val.isNode()) {
            console.log("9999999999999945444");
            console.log(val);
            //节点
            this.drawerNode.angle = Number(val.store.data.angle);
            console.log(this.drawerNode.angle);
            this.drawerNode.fill = val.store.data.attrs.body.fill;
            this.drawerNode.nodeText = val.store.data.attrs.label.text;
            this.drawerNode.noteText = val.note;
            this.drawerNode.fontFill = val.store.data.attrs.label.fill;
            this.drawerNode.fontSize = Number(
              val.store.data.attrs.label.fontSize
            );
            this.drawerNode.strokeWidth = Number(
              val.store.data.attrs.body.strokeWidth
            );
            this.drawerNode.stroke = val.store.data.attrs.body.stroke;
          } else {
            //边
            this.drawerEdge.EdgeText = val.store.data.labels
              ? val.store.data.labels[0].text
              : "";
            this.drawerEdge.edgeWidth = Number(
              val.store.data.attrs.line.strokeWidth
            );
            this.drawerEdge.edgeColor = val.store.data.attrs.line.stroke;
            this.drawerEdge.edgeDasharray = Number(
              val.store.data.attrs.line.strokeDasharray
            );
          }
        }
      },
      immediate: true,
      deep: false,
    },
  },
  methods: {
    // 网格设置
    changeGrid1() {
      this.showGrid ? this.graph.showGrid() : this.graph.hideGrid();
    },
    changeGridType(e) {
      this.grid.type = e;
      this.changeGrid();
    },
    changeGrid() {
      this.graph.drawGrid({
        ...this.grid,
      });
    },
    // 节点设置
    changeStrokeWidth(val) {
      this.selectCell.attr("body/strokeWidth", val);
    },
    changefontSize(val) {
      this.selectCell.attr("label/fontSize", val);
    },
    changeNodeText() {
      console.log("文本节点");
      this.selectCell.attr("label/text", this.drawerNode.nodeText);
    },
    changeNoteText() {
      console.log("文本备注");
      this.selectCell.note = this.drawerNode.noteText;
    },
    changeStroke(val) {
      this.drawerNode.stroke = val;
      this.selectCell.attr("body/stroke", this.drawerNode.stroke);
    },
    changeAngle(val) {
      this.drawerNode.angle = val;
      console.log("旋转");
      console.log(this.selectCell);
      this.selectCell.angle(val);
    },
    changeFontFill(val) {
      this.drawerNode.fontFill = val;
      this.selectCell.attr("label/fill", this.drawerNode.fontFill);
    },
    changeFill(val) {
      this.drawerNode.fill = val;
      this.selectCell.attr("body/fill", val);
    },
    // 边设置
    changeEdgeText() {
      console.log(this.drawerEdge.EdgeText);
      this.selectCell.setLabels([
        { attrs: { label: { text: this.drawerEdge.EdgeText } } },
      ]);
    },
    changeEdgeWidth(val) {
      console.log("线条宽度");
      this.drawerEdge.edgeWidth = val;

      if (this.currentArrow !== 1) {
        this.selectCell.attr("fill/strokeWidth", this.drawerEdge.edgeWidth);
      } else {
        this.selectCell.attr("line/strokeWidth", this.drawerEdge.edgeWidth);
      }
    },
    changeEdgeDasharray(val) {
      this.drawerEdge.edgeDasharray = val;
      this.selectCell.attr(
        "line/strokeDasharray",
        this.drawerEdge.edgeDasharray
      );
      console.log(this.selectCell);
    },
    changeEdgeColor(val) {
      this.drawerEdge.stroke = val;
      this.selectCell.attr("line/stroke", this.drawerEdge.stroke);
    },
    // 查看
    // checkDetail() {
    //   console.log(this.selectCell);
    //   this.$emit("lookDetails", this.selectCell);
    // },
    // 顶层
    toTop() {
      this.selectCell.toFront();
    },
    // 底层
    toBottom() {
      this.selectCell.toBack();
    },
    //隐藏
    hideTools() {
      this.$emit("hideNode");
    },
    // 删除
    deleteNode() {
      this.$emit("deleteNode");
    },
  },
};
</script>

<style lang="scss" scoped>
.drawer_container {
  max-width: 400px;
  min-width: 350px;

  .drawer_title {
    border-bottom: 1px solid #e8eaec;
    box-sizing: border-box;
    padding: 14px 16px;
    color: #333;
    font-size: 16px;
    text-align: left;
  }

  .drawer_wrap {
    box-sizing: border-box;
    padding: 20px 10px 20px 20px;
  }
}
</style>
<style lang="scss">
.el-form-item__content {
  text-align: left;
}
</style>
