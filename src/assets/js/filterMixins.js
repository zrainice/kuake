

export default {
  methods: {
    // 获取厂房筛选项
    async options_getFactoryOptions(filters = {}) {
      let options = []

      // 获取区域数据
      let areaRes = await axios.get('/api/area/list', {params: { type: 4 }})

      // 字典值
      // plantType 功能
      // let funcRes = await axios.get('/api/space/getDictList', { params: { code: 'plantType' } })
      // // parkNature 楼栋属性
      // let natureRes = await axios.get('/api/space/getDictList', { params: { code: 'parkNature' } })
      // // plantStruct 建筑结构
      // let structRes = await axios.get('/api/space/getDictList', { params: { code: 'plantStruct' } })
      // // elevatorType 电梯类型
      // let elevatorRes = await axios.get('/api/space/getDictList', { params: { code: 'elevatorType' } })

      // 点击找厂房时 生成厂房的筛选数据
      options = {
        area: {
          title: '区域',
          list: this.options_generateOptions(areaRes.data.map(item => ({
            name: item.zoro_area_whole,
            value: item.id
          }))),
          icon: require('../../assets/image/quyu.png'),
          value: filters.area
        },
        priceType: {
          title: '租售方式',
          list: [
            { name: '出租', value: 'rentPrice' },
            { name: '出售', value: 'sellPrice' }
          ],
          icon: require('../../assets/image/peitao.png'),
          value: filters.priceType || 'rentPrice'
        },
        rentPrice: {
          relate: 'priceType',
          title: '出租价格',
          list: [
            { name: '不限', value: 6 },
            { name: '20㎡/元·月以下', value: 1 },
            { name: '20~35㎡/元·月', value: 2 },
            { name: '35~50㎡/元·月', value: 3 },
            { name: '50~65㎡/元·月', value: 4 },
            { name: '65㎡/元·月以上', value: 5 }
          ],
          icon: require('../../assets/image/jiage.png'),
          value: filters.rentPrice
        },
        sellPrice: {
          relate: 'priceType',
          title: '出售价格',
          list: [
            { name: '不限', value: 6 },
            { name: '4000㎡/元·月以下', value: 1 },
            { name: '4000~4500㎡/元·月', value: 2 },
            { name: '4500~5000㎡/元·月', value: 3 },
            { name: '5000~5500㎡/元·月', value: 4 },
            { name: '5500㎡/元·月以上', value: 5 }
          ],
          icon: require('../../assets/image/jiage.png'),
          value: filters.sellPrice
        },
        size: {
          title: '面积',
          list: [
            { name: '不限', value: '' },
            { name: '2000㎡以下', value: 1 },
            { name: '2000~5000㎡', value: 2 },
            { name: '5000~8000㎡', value: 3 },
            { name: '8000~11000㎡', value: 4 },
            { name: '11000㎡以上', value: 5 }
          ],
          icon: require('../../assets/image/mianji.png'),
          value: filters.size
        },
        plantType: {
          title: '功能',
          list: [
            { name: '不限', value: '' },
            { name: '厂房', value: 1 },
            { name: '办公用房', value: 2 },
            { name: '仓库', value: 3 },
            { name: '商铺', value: 4 },
            { name: '其他', value: 5 }
          ],
          icon: require('../../assets/image/gongneng.png'),
          value: filters.plantType
        },
        height: {
          title: '厂房层高(米)',
          type: 'range',
          icon: require('../../assets/image/cenggao.png')
        },
        buildingType: {
          title: '楼栋属性',
          list: [
            { name: '不限', value: '' },
            { name: '企业物业 ', value: 1 },
            { name: '社区集体物业', value: 2 },
            { name: '区属国企物业', value: 3 },
            { name: '私人物业', value: 4 },
            { name: '政府物业', value: 5 },
            { name: '其他', value: 6 }
          ],
          icon: require('../../assets/image/shuxing.png'),
          value: filters.buildingType
        },
        structType: {
          title: '建筑结构',
          list: [
            { name: '不限', value: '' },
            { name: '标准生产厂房 ', value: 1 },
            { name: '标准研发办公楼', value: 2 },
            { name: '简易厂房', value: 3 },
            { name: '钢结构厂房', value: 4 },
            { name: '其他', value: 5 }
          ],
          icon: require('../../assets/image/jiegou.png'),
          value: filters.structType
        },
        elevatorType: {
          title: '电梯类型',
          list: [
            { name: '不限', value: '' },
            { name: '客梯 ', value: 1 },
            { name: '货梯', value: 2 },
            { name: '客梯/货梯', value: 3 },
            { name: '无电梯', value: 4 }
          ],
          icon: require('../../assets/image/dianti.png'),
          value: filters.elevatorType
        },
        facilities: {
          title: '配套',
          list: [
            { name: '电梯', value: 1 },
            { name: '食堂', value: 3 },
            { name: '地下室', value: 2 }
          ],
          type: 'multiple',
          icon: require('../../assets/image/peitao.png')
        }
      }
      console.log(options)
      return options
    },
    options_generateOptions(list) {
      return [{ name: '不限', value: '' }].concat(list.map(item => {
        return {
          name: item.name,
          value: item.value || item.id
        }
      }))
    }
  }
}