<template>
  <div class="container">
    <header>
      欢迎使用银行排号系统
    </header>
    <div class="radio-group">
      <el-radio-group v-model="ukinds" size="medium">
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
    <el-input placeholder="请输入邮箱" v-model="email">
      <template slot="prepend">
        &nbsp;&nbsp;&nbsp;@&nbsp;&nbsp;&nbsp;
      </template>
    </el-input>
    <el-input placeholder="请输入手机号" v-model="telephone">
      <template slot="prepend">
        手机号
      </template>
    </el-input>
    <el-button type="primary" @click="postUserInfo">注册</el-button>
    <el-button plain @click="handleLogin">登录</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName: '',
      password: '',
      email: '',
      telephone: '',
      ukinds: '用户'
    }
  },
  methods: {
    postUserInfo () {
      this.$axios.get('/api/register.do', {
        username: this.userName,
        password: this.password,
        email: this.email,
        telephone: this.telephone,
        ukinds: this.ukinds === '用户' ? 0 : 1
      })
        .then(res => {
          if (res.data.success) {
            console.log(res.data.message)
            this.$router.push({
              name: 'Login'
            })
          } else {
            console.log('注册失败')
            this.$message.error('注册失败，请重试')
          }
        })
    },
    handleLogin () {
      this.$router.replace({
        name: 'Login'
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
  margin-top: -14rem;
  margin-left: -15rem;
  padding: .5rem;
  width: 30rem;
  height: 28rem;
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
