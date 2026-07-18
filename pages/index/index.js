Page({
  data: {
    motto: '课程成绩计算器',
    usualScore: '',
    finalScore: '',
    totalScore: '',
    gradeLevel: '',
    usualWeight: '40',
    finalWeight: '60'
  },
  onUsualInput(event) {
    this.setData({
      usualScore: event.detail.value
    })
  },

  onFinalInput(event) {
    this.setData({
      finalScore: event.detail.value
    })
  },

  onUsualWeightInput(event) {
    this.setData({
      usualWeight: event.detail.value
    })
  },

  onFinalWeightInput(event) {
    this.setData({
      finalWeight: event.detail.value
    })
  },

  calculateScore() {
    const usualText = this.data.usualScore
    const finalText = this.data.finalScore
    const usualWeightText = this.data.usualWeight
    const finalWeightText = this.data.finalWeight
    if (finalText === '' || usualText === '') {
      wx.showToast({
        title: '请填写两项成绩',
        icon: 'none'
      })
      return
    }
    const usual = Number(usualText)
    const final = Number(finalText)
    
    if(usualWeightText === '' || finalWeightText === '') {
      wx.showToast({
        title:'请填写两项权重',
        icon:'none'
      })
      return
    }

    const usualWeight = Number(usualWeightText)
    const finalWeight = Number(finalWeightText)

    if (!Number.isFinite(usualWeight) || !Number.isFinite(finalWeight)) {
      wx.showToast({
        title: '请输入正确的权重',
        icon: 'none'
      })
      return
    }

    if(usualWeight < 0 || usualWeight > 100 || finalWeight < 0 || finalWeight > 100){
      wx.showToast({
        title:'权重必须在0~100之间',
        icon: 'none'
      })
      return
    }

    if (Math.abs(usualWeight + finalWeight - 100) > 0.001) {
      wx.showToast({
        title: '两项权重之和必须为100',
        icon: 'none'
      })
      return
    }

    if (usual > 100 || usual < 0 || final > 100 || final < 0) {
      wx.showToast({
        title: '成绩必须在0~100之间',
        icon: 'none'
      })
      return
    }

    const total = usual * (usualWeight / 100) + final * (finalWeight / 100)
    let gradeLevel = ''
    if (total >= 90) {
      gradeLevel = '优秀'
    } else if (total >= 80) {
      gradeLevel = '良好'
    } else if (total >= 70) {
      gradeLevel = '中等'
    } else if (total >= 60) {
      gradeLevel = '及格'
    } else {
      gradeLevel = '不及格'
    }
    this.setData({
      totalScore: total.toFixed(1),
      gradeLevel: gradeLevel
    })
  },
  clearForm() {
    this.setData({
      usualScore: '',
      finalScore: '',
      totalScore: '',
      gradeLevel: ''
    })
  }
})
