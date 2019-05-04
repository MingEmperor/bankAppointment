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
      <el-submenu index="1">
          <template slot="title">现金业务</template>
          <el-menu-item index="2-4-1">开户</el-menu-item>
          <el-menu-item index="2-4-2">现金存取</el-menu-item>
          <el-menu-item index="2-4-3">旧币换新</el-menu-item>
        </el-submenu>
      <el-submenu index="2">
        <template slot="title">对公转账</template>
        <el-menu-item index="2-1">正常转账</el-menu-item>
        <el-menu-item index="2-2">加急转账</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
        外币兑换
      </el-menu-item>
      <el-menu-item index="4">
        理财业务
      </el-menu-item>
      <el-menu-item class='user-name' index="5">
        用户名
      </el-menu-item>
    </el-menu>
    <el-button
      v-if='!personCenter'
      class='order-btn'
      type='primary'
      @click="qwe"
    >
      点击排号
    </el-button>
    <el-form v-else ref="form" class='person-info' :model="form" label-width="80px">
      <el-form-item label='用户名'>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label='手机号'>
        <el-input type='tel' v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label='邮箱'>
        <el-input type='email' v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label='用户类型'>
        <el-radio-group v-model="form.type">
          <el-radio label="用户"></el-radio>
          <el-radio label="工作人员"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户介绍">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      personCenter: false,
      form: {
        name: '',
        tel: '',
        email: '',
        type: '',
        desc: ''
      }
    }
  },
  created () {
    this.$axios.post('/api/paihao.do', {}, {withCredentials: true})
      .then(res => {
        console.log(res)
      })
  },
  methods: {
    handleSelect (key, keyPath) {
      switch (key) {
        case '1':
          this.personCenter = false
          break
        case '2':
          this.personCenter = false
          break
        case '3':
          this.personCenter = false
          break
        case '4':
          this.personCenter = false
          break
        case '5':
          this.personCenter = true
          break
        default:
          console.log('')
      }
    },
    qwe () {
      this.$axios.post('/api/user.do')
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style scoped>
.user-name{
  margin-right: 1rem;
  float: right;
}
.order-btn{
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -6rem;
  width: 12rem;
}
.person-info{
  position: absolute;
  top: 30%;
  left: 50%;
  margin-left: -15rem;
  width: 30rem;
}
</style>
