<template>
  <div class="container">
    <header>
      欢迎使用银行排号系统
    </header>
    <div class="radio-group">
      <el-radio-group v-model="unlink" size="medium">
        <el-radio-button label="用户" ></el-radio-button>
        <el-radio-button label="工作人员"></el-radio-button>
      </el-radio-group>
    </div>
    <el-input placeholder="请输入用户名" v-model="userName">
      <template slot="prepend">
        用户名
      </template>
    </el-input>
    <el-input placeholder="请输入密码" v-model="password" show-password>
      <template slot="prepend">
        密&nbsp;&nbsp;&nbsp;码
      </template>
    </el-input>
    <el-button type="primary" @click="postUserInfo">登录</el-button>
    <el-button plain @click="handleRegister">注册</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName: '',
      password: '',
      unlink: '用户'
    }
  },
  methods: {
    postUserInfo () {
      if (this.userName !== '' && this.password !== '') {
        this.$axios.post('/BankNumber/login.do', {
          username: this.userName,
          password: this.password,
          ukinds: this.unlink === '用户' ? 0 : 1
        })
          .then(res => {
            if (res.data.success) {
              if (this.unlink === '用户') {
                this.$router.push({
                  name: 'Main'
                })
              } else {
                this.$router.push({
                  name: 'Manage'
                })
              }
            } else {
              console.log('登陆失败')
              this.$message.error('登陆失败，请重试')
            }
          })
      } else {
        this.$message({
          message: '用户名或密码为空',
          type: 'warning'
        })
      }
    },
    handleRegister () {
      this.$router.replace({
        name: 'Register'
      })
    }
  }
}
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -12rem;
  margin-left: -15rem;
  padding: .5rem;
  width: 30rem;
  height: 24rem;
}
header{
  text-align: center;
  height: 3rem;
  line-height: 3rem;
  font-size: 1.3rem;
}
.radio-group{
  text-align: center;
}
.el-button,.el-button--default,.is-plain{
  margin: 0;
}
</style>
