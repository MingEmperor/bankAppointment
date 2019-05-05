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
        {{ form.name }}
      </el-menu-item>
    </el-menu>
    <el-button
      v-if='!personCenter'
      class='order-btn'
      type='primary'
      @click='handleOpenDialog'
    >
      点击排号
    </el-button>
    <el-form v-else ref="form" class='person-info' :model="form" label-width="80px">
      <el-form-item label='用户名'>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label='密码'>
        <el-input type='password' v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label='手机号'>
        <el-input type='tel' v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label='邮箱'>
        <el-input type='email' v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="用户介绍">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleUpdate">确认修改</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="当前排号信息" :visible.sync="dialogTableVisible">
      <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label='用户名'>
        <el-tag class='info-tag' type="info">
          {{form.name}}
        </el-tag>
      </el-form-item>
      <el-form-item label='手机号'>
        <el-tag class='info-tag' type="info">
          {{form.tel}}
        </el-tag>
      </el-form-item>
      <el-form-item label='排号号码'>
        <el-tag class='info-tag-uNumber' type="info">
          {{form.uNumber}}
        </el-tag>
      </el-form-item>
    </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      personCenter: false,
      dialogTableVisible: false,
      form: {
        name: '',
        tel: '',
        qq: '',
        email: '',
        password: '',
        desc: '',
        uNumber: ''
      },
      gridData: {
        date: '',
        name: '',
        address: ''
      }
    }
  },
  created () {
    this.$axios.post('/BankNumber/user.do')
      .then(res => {
        console.log(res.data)
        this.form.name = res.data.username
        this.form.tel = res.data.telephone
        this.form.qq = res.data.qq
        this.form.email = res.data.email
        this.form.password = res.data.password
        this.form.desc = res.data.udesc
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
    handleUpdate () {
      this.$axios.post('/BankNumber/updateUserInfo.do', {
        username: this.form.name,
        password: this.form.password,
        email: this.form.email,
        telephone: this.form.tel,
        udesc: this.form.udesc
      })
        .then(res => {
          if (res.data.message) {
            console.log(res.data.message)
            this.$message({
              message: '修改成功，重新登录后可见',
              type: 'success'
            })
          }
        })
    },
    handleOpenDialog () {
      this.dialogTableVisible = true
      this.$axios.post('/BankNumber/paihao.do')
        .then(res => {
          console.log(res.data)
          this.form.name = res.data.username
          this.form.tel = res.data.telephone
          this.form.uNumber = res.data.uNumber
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
.info-tag{
  width: 20rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  font-size: 1.25rem;
}
.info-tag-uNumber{
  width: 20rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
  color: #409EFF;
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
