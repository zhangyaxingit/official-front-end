<template>
  <div>
      <draggable
        :list="list"
        item-key="id"
        style="width: 100%; display:flex; flex-wrap: wrap; justify-content: flex-between"
        :move="checkMove"
      >
        <template #item="{ element }">
          <div class="list-group-item" style="">
            {{ element.title }}
          </div>
        </template>
      </draggable>
  </div>
</template>

<script>
import { reactive, ref, watch } from "vue";
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  setup(props) {
    const list = reactive([
      { title: "sdgfdgfdgfgf", id: 0 },
      { title: "dfgsfd", id: 1 },
      { title: "sdfg", id: 2 },
      { title: "fdugdrfh", id: 3 },
      { title: "erhdgf", id: 4 },
      { title: "fgheuyu", id: 6 }
    ])

    const checkMove = (e) =>{
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    }

    return {
      list,
      checkMove,
    };
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
.drag-contianer>div {
  width: 25%
}

.drag-item {
  width: 150px;
  height: auto;
  position: relative;
}
.drag-item .del {
  position: absolute;
  right: -10px;
  top: -10px;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 18px;
  background-color: #ddd;
  border-radius: 50%;
  cursor: pointer;
  color: #999;
}
.drag-item img {
  width: 100%;
  height: 150px;
}
.drag-item p {
  line-height: 20px;
  background: #eee;
  margin: 0;
}
</style>