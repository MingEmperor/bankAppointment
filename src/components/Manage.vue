<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#409EFF"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-menu-item index="1">
        现金业务
      </el-menu-item>
      <el-menu-item index="2">
        对公转账
      </el-menu-item>
      <el-menu-item index="3">
        外币兑换
      </el-menu-item>
      <el-menu-item index="4">
        理财业务
      </el-menu-item>
    </el-menu>
    <ul class='ul-Fund'>
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
          <el-button type='primary' @click='handleAccept(item)'>
            受理
          </el-button>
          <el-button type='primary' @click='handleNoAccept(item)'>
            不受理
          </el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
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
    handleSelect (key, keyPath) {
      this.currentWindow = key
      switch (key) {
        case '0':
          this.order = false
          this.showFund = false
          this.showNewNumber = true
          this.personCenter = false
          break
        case '1':
          this.order = true
          this.showFund = false
          this.showNewNumber = false
          this.personCenter = false
          break
        case '2':
          this.order = true
          this.showFund = false
          this.showNewNumber = false
          this.personCenter = false
          break
        case '3':
          this.order = true
          this.showFund = false
          this.showNewNumber = false
          this.personCenter = false
          break
        case '4':
          this.order = true
          this.showFund = false
          this.showNewNumber = false
          this.personCenter = false
          break
        case '5':
          this.order = false
          this.showFund = true
          this.showNewNumber = false
          this.personCenter = false
          break
        case '6':
          this.order = false
          this.showFund = false
          this.showNewNumber = false
          this.personCenter = true
          break
        default:
          console.log('')
      }
    },
    handleAccept (item) {
      this.$axios.get('/BankNumber/accept.do?uid=' + item.uid)
        .then(res => {
          console.log(res)
          this.$message({
            message: '已经接受受理',
            type: 'success'
          })
          this.tableInfo.splice(this.tableInfo.indexOf(item), 1)
        })
    },
    handleNoAccept (item) {
      this.$axios.get('/BankNumber/noAccept.do?uid=' + item.uid)
        .then(res => {
          console.log(res)
          this.$message({
            message: '已经摒弃该受理',
            type: 'success'
          })
          this.tableInfo.splice(this.tableInfo.indexOf(item), 1)
        })
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
