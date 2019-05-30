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
      <el-menu-item index="7">
        首页
      </el-menu-item>
      <el-menu-item index="1">
        业务选择
      </el-menu-item>
      <el-menu-item index="2">
        金融资讯
      </el-menu-item>
      <el-menu-item index="5">
        理财信息
      </el-menu-item>
      <el-menu-item class='user-name' index="6">
        {{ form.name }}
      </el-menu-item>
    </el-menu>
    <div
      v-if='order'
      class='order-btn'
    >
      <el-button
        v-for='item of btnTitle'
        :key='item.id'
        type='primary'
        @click='handleOpenDialog'
      >
        {{item.name}}
      </el-button>
    </div>

    <!-- 个人信息栏页面 -->
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
        <el-button type="primary" @click="handleUpdate">
          确认修改
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 获取排号信息的弹框 -->
    <el-dialog title="排号已经获取：" :visible.sync="dialogTableVisible">
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

    <!-- 基金介绍弹框 -->
    <el-dialog
      title='基金介绍'
      class='fund-dialog'
      :visible.sync='dialogFundsVisible'
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item>
          <img
           :src="detailInfo.imgUrl"
            style='width: 400px;
                   height: 200px;
                   transform: translateX(-10%);
                   border-radius: 6px;'
          />
        </el-form-item>
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
        <el-form-item>
          <div
            class='info-desc'
          >
            {{detailInfo.fundsDesc}}
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 基金介绍 -->
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

    <!-- 当前排号信息 + 轮播图-->
    <el-carousel
      v-if='showNowNumber'
      class='carousel-warpper'
      :interval='4000'
      type='card'
      height="200px"
    >
      <el-carousel-item v-for="item in carouselImg" :key="item.id">
        <h3 class="medium">
          <img :src='item.imgUrl' />
        </h3>
      </el-carousel-item>
    </el-carousel>

    <div v-if='showNowNumber' class='newNumber-warpper'>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label='当前号码:'>
          <el-tag class='info-tag' type="info">
            {{nextInfo.uNumber}}
          </el-tag>
        </el-form-item>
        <el-form-item label='请前往当前窗口:'>
          <el-tag class='info-tag-uNumber' type="info">
            {{nextInfo.chuangkou}}
          </el-tag>
        </el-form-item>
        <el-form-item label='下一位号码为:'>
          <el-tag class='info-tag' type="info">
            {{nextInfo.nextNumber}}
          </el-tag>
        </el-form-item>
      </el-form>
    </div>

    <div v-if='showNews' class='showNews-warpper'>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item
          v-for='item of newsList'
          :key='item.name'
          :title='item.title'
          :name='item.name'
        >
          <p>
            {{item.content}}
          </p>
          <img :src='item.imgUrl' />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeNames: ['1'],
      currentWindow: '',
      activeIndex: '7',
      order: false,
      personCenter: false,
      showFund: false,
      showNews: false,
      showNowNumber: false,
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
      carouselImg: [{
        id: 1,
        imgUrl: '../../static/mock/img/banner_1.jpg'
      }, {
        id: 2,
        imgUrl: '../../static/mock/img/banner_2.jpg'
      }, {
        id: 3,
        imgUrl: '../../static/mock/img/banner_3.jpg'
      }, {
        id: 4,
        imgUrl: '../../static/mock/img/banner_4.jpg'
      }],
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
      btnTitle: [{
        id: 1,
        name: '现金业务'
      }, {
        id: 2,
        name: '对公转账'
      }, {
        id: 3,
        name: '外币兑换'
      }, {
        id: 4,
        name: '理财业务'
      }],
      newsList: [{
        name: 1,
        title: '比特币价格持续高涨',
        content: '近一个月以来，比特币的涨势让人触不及防。市面上已经出现一连串解释这波行情的说法，炒币情绪普遍乐观。随着市场情绪转变和比特币采用率的增加，对于许多人来说，2019年可能是用低成本获取一枚完整比特币的最后一年。历经十年，比特币已经被证明网络的耐用性和可靠性，未来的每一天，比特币也会将这些特点延续下去。对市场上的投资者而言，如果比特币不被“高估”，购买比特币这件事儿就没有一点吸引力，但当比特币大幅下跌时，大家更没有兴趣买它。这一点在2017年得到了证明，当价格疯涨，市场反应接近疯狂。',
        imgUrl: '../../static/mock/img/news_1.jpg'
      }, {
        name: 2,
        title: '“二三四五”重生还是“临死”挣扎?',
        content: '近日，二三四五发布2018年年报，和讯网发现，自跨界经营互联网金融业务以来，其业绩有了很大好转，从扣除非经常性损益的净利润便可一览无余。数据显示，其2018年扣非净利润为13.34亿元，同比增长率为46.25%，销售净利率为36.36%，在同行业居前列。一方面，从导航业务跨界互联网金融，对二三四五来说，算得上一次“重生”；另一方面，从现金贷被叫停到会员费式砍头息，二三四五似乎再一次游走边缘。重生后，是再次辉煌？还是危险临近呢？',
        imgUrl: '../../static/mock/img/news_2.jpg'
      }, {
        name: 3,
        title: '华为“渡劫”后或将更加强大',
        content: '5月22日，任正非签发一封电邮《不懂战略退却的人，就不会战略进攻》，进行了一系列的战略调整，并表示个别地方的调整不影响大格局，要保护好调整部分的员工。任正非提到：”未来五年我们将投资1000亿美元的研发经费，通过网络架构重构来解决可信的问题。要向为我们服务的零部件、向我们需要的大部件去做一些扩张，掌握设计和生产工艺。车联网、人工智能、边缘计算是我们未来的三大突破点。华为的产业组合要均衡。”美国政府在华为全球部署5G网络取得先发优势之际，开始牵头遏制的行为，对华为而言，从短期来看，它的供应链将承受不少压力。但长远来看，也许渡劫之后，华为将更加强大。',
        imgUrl: '../../static/mock/img/news_3.jpg'
      }, {
        name: 4,
        title: '科创板大规模分拆上市',
        content: '《证券日报》记者独家统计发现，在沪深交易所的投资者与上市公司互动平台问答中，“科创板”作为关键词出现了接近8000次，其中“科创板+上市”（主要指上市公司分拆旗下资产在科创板上市）作为关键词共出现近4000次。即便考虑到在同一个问题中科创板可能出现不止一次，以及部分上市公司回答的对于提问统计数据的影响，投资者至少已经就分拆上市“千问”上市公司。《证券日报》记者在沪深交易所互动平台检索发现，有大量投资者询问上市公司子公司分拆至科创板上市的事宜。据记者观察，上市公司的生物医药类、科技类、半导体类、新能源类以及金融科技类子公司或资产被投资者寄予厚望。',
        imgUrl: '../../static/mock/img/news_4.jpg'
      }],
      detailInfo: {},
      nextInfo: {}
    }
  },
  created () {
    this.$axios.post('/BankNumber/user.do')
      .then(res => {
        this.form.name = res.data.username
        this.form.tel = res.data.telephone
        this.form.qq = res.data.qq
        this.form.email = res.data.email
        this.form.password = res.data.password
        this.form.desc = res.data.udesc
      })
    this.$axios.post('/BankNumber/next.do')
      .then(res => {
        this.nextInfo = res.data[0]
        this.nextInfo.nextNumber = res.data[1].uNumber ? res.data[1].uNumber : ''
      })
    this.$axios.get('../../static/mock/fund.json')
      .then(res => {
        this.tableInfo = res.data
      })
    this.handleSelect('7')
  },
  methods: {
    handleSelect (key, keyPath) {
      this.currentWindow = key
      switch (key) {
        case '1':
          this.order = true
          this.showNews = false
          this.showFund = false
          this.showNowNumber = false
          this.personCenter = false
          break
        case '2':
          this.order = false
          this.showNews = true
          this.showFund = false
          this.showNowNumber = false
          this.personCenter = false
          break
        case '5':
          this.order = false
          this.showNews = false
          this.showFund = true
          this.showNowNumber = false
          this.personCenter = false
          break
        case '6':
          this.order = false
          this.showNews = false
          this.showFund = false
          this.showNowNumber = false
          this.personCenter = true
          break
        case '7':
          this.order = false
          this.showNews = false
          this.showFund = false
          this.showNowNumber = true
          this.personCenter = false
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
          this.form.name = res.data.username
          this.form.tel = res.data.telephone
          this.form.uNumber = res.data.uNumber
        })
    },
    handleDetail (id) {
      this.tableInfo.forEach(el => {
        if (el.id === id) {
          this.detailInfo = el
        }
      })
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
  width: 24rem;
  color: #333;
  background-color: #fff;
  text-align: center;
  font-size: 1.5rem;
  font-family: '楷体';
  font-weight: bold;
}
.info-desc{
  width: 46rem;
  color: #666;
  background-color: #fff;
  text-align: center;
  font-size: 1.1rem;
  transform: translateX(-8%);
}
.info-tag-uNumber{
  min-width: 20rem;
  min-height: 3rem;
  line-height: 3rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
  color: #409EFF;
  background-color: #fff;
}
.ul-Fund{
  margin: 3rem auto;
  width: 66%;
  border: 1px solid #eeeeee;
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
  display: flex;
  align-items: center;
  justify-content: space-around;
  top: 50%;
  left: 50%;
  margin-left: -6rem;
  margin-top: -8rem;
  width: 12rem;
  height: 16rem;
}
.person-info{
  position: absolute;
  top: 30%;
  left: 50%;
  margin-left: -15rem;
  width: 30rem;
}
.newNumber-warpper{
  position: absolute;
  top: 72%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.showNews-warpper{
  margin: 3rem auto;
  width: 80%;
}
</style>
<style>
.el-dialog{
  width: 660px;
}
.el-form{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.carousel-warpper{
  margin: 6rem auto;
  width: 80%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
