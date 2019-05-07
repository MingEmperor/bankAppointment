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
      v-if='order'
      class='order-btn'
      type='primary'
      @click='handleOpenDialog'
    >
      点击排号
    </el-button>
    <el-form
      v-if='personCenter'
      ref="form"
      class='person-info'
      :model="form"
      label-width="80px"
    >
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

    <el-dialog title="基金介绍" :visible.sync="dialogFundsVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label='基金名称'>
          <el-tag class='info-tag' type="info">
            {{detailInfo.name}}
          </el-tag>
        </el-form-item>
        <el-form-item label='基金金额'>
          <el-tag class='info-tag' type="info">
            {{detailInfo.funds}}
          </el-tag>
        </el-form-item>
        <el-form-item label='基金介绍'>
          <el-tag class='info-tag-uNumber' type="info">
            {{detailInfo.fundsDesc}}
          </el-tag>
        </el-form-item>
      </el-form>
    </el-dialog>

    <ul v-if='showFund' class='ul-Fund'>
      <li class='li-Fund'>
        <p v-for='item in tableTitle' :key='item.id' class="p-Fund">
          {{item.name}}
        </p>
      </li>
      <li v-for='item in tableInfo' :key='item.id' class='li-Fund'>
        <p class="p-Fund">
          {{item.name}}
        </p>
        <p class="p-Fund">
          {{item.funds}}
        </p>
        <div class="p-Fund">
          <el-button type='primary' @click='handleDetail(item.id)'>
            查看
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
      order: true,
      personCenter: false,
      showFund: false,
      dialogTableVisible: false,
      dialogFundsVisible: false,
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
      },
      tableTitle: [{
        id: 1,
        name: '基金名称'
      }, {
        id: 2,
        name: '基金金额'
      }, {
        id: 3,
        name: '操作'
      }],
      tableInfo: [{
        id: '1',
        name: '阿里基金',
        funds: '133',
        fundsDesc: '阿里基金阿里基金阿里基金阿里基金阿里基金阿里基金阿里基金'
      }, {
        id: '2',
        name: '腾讯基金',
        funds: '45',
        fundsDesc: '阿里基金阿里基金阿里基金阿里基金阿里基金阿里基金阿里基金'
      }, {
        id: '3',
        name: '京东基金',
        funds: '65',
        fundsDesc: '阿里基金阿里基金阿里基金阿里基金阿里基金阿里基金阿里基金'
      }, {
        id: '4',
        name: '美团基金',
        funds: '12',
        fundsDesc: '阿里基金阿里基金阿里基金阿里基金阿里基金阿里基金阿里基金'
      }, {
        id: '5',
        name: '天虎基金',
        funds: '43',
        fundsDesc: '阿里基金阿里基金阿里基金阿里基金阿里基金阿里基金阿里基金'
      }],
      detailInfo: {}
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
          this.order = true
          this.showFund = false
          this.personCenter = false
          break
        case '2':
          this.order = true
          this.showFund = false
          this.personCenter = false
          break
        case '3':
          this.order = true
          this.showFund = false
          this.personCenter = false
          break
        case '4':
          this.order = false
          this.showFund = true
          this.personCenter = false
          break
        case '5':
          this.order = false
          this.showFund = false
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
    },
    handleDetail (id) {
      console.log(this.tableInfo)
      this.tableInfo.forEach(el => {
        if (el.id === id) {
          this.detailInfo = el
        }
      })
      console.log(this.detailInfo)
      this.dialogFundsVisible = true
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
  min-width: 20rem;
  min-height: 3rem;
  line-height: 3rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
  color: #409EFF;
}
.ul-Fund{
  margin: 3rem auto;
  width: 66%;
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
  width: 20rem;
  height: 100%;
  background-color: #ffffff;
  font-size: 1.3rem;
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
