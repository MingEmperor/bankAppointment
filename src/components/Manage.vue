<template>
  <ul v-if='showFund' class='ul-Fund'>
    <li class='li-Fund'>
      <p v-for='item in tableTitle' :key='item.id' class="p-Fund">
        {{item.name}}
      </p>
    </li>
    <li v-for='item in tableInfo' :key='item.uid' class='li-Fund'>
      <p class="p-Fund">
        {{item.username}}
      </p>
      <p class="p-Fund">
        {{item.uNumber}}
      </p>
      <div class="p-Fund">
        <el-button type='primary' @click='handleAccept(item.uid)'>
          受理
        </el-button>
        <el-button type='primary' @click='handleNoAccept(item.uid)'>
          不受理
        </el-button>
        <el-button type='primary' @click='handleAccepting(item.uid)'>
          受理中
        </el-button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      showFund: true,
      tableTitle: [{
        id: 1,
        name: '用户名'
      }, {
        id: 2,
        name: '号码'
      }, {
        id: 3,
        name: '操作'
      }],
      tableInfo: []
    }
  },
  created () {
    this.$axios.get('/BankNumber/selectAllPai.do')
      .then(res => {
        console.log(res.data)
        this.tableInfo = res.data
      })
    console.log(this.tableInfo)
  },
  methods: {
    handleAccept (id) {
      this.$message({
        message: '已经接受受理',
        type: 'success'
      })
      // this.$axios.get('/BankNumber/Accept.do?uid=' + id)
      //   .then(res => {
      //     console.log(res)
      //     this.$message({
      //       message: '恭喜你，这是一条成功消息',
      //       type: 'success'
      //     })
      //   })
    },
    handleNoAccept (id) {
      this.$message({
        message: '已经摒弃该受理',
        type: 'success'
      })
      // this.$axios.get('/BankNumber/Noaccept.do?uid=' + id)
      //   .then(res => {
      //     console.log(res)
      //     this.$message({
      //       message: '恭喜你，这是一条成功消息',
      //       type: 'success'
      //     })
      //   })
    },
    handleAccepting (id) {
      this.$message({
        message: '该条已经在受理中',
        type: 'success'
      })
      // this.$axios.get('/BankNumber/acceptIng.do?uid=' + id)
      //   .then(res => {
      //     console.log(res)
      //     this.$message({
      //       message: '恭喜你，这是一条成功消息',
      //       type: 'success'
      //     })
      //   })
    }
  }
}
</script>

<style scoped>
.ul-Fund{
  margin: 3rem auto;
  width: 75%;
  border: 1px dashed #b3b3b3
}
.li-Fund{
  margin: .5rem 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 4rem;
}
.p-Fund{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24rem;
  height: 100%;
  background-color: #ffffff;
  font-size: 1.3rem;
}
</style>
