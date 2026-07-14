Page({
  data: {
    motto: '课程成绩计算器',
    usualScore: '',
    finalScore: '',
    totalScore: '',
    gradeLevel: ''
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
  calculateScore() {
    const usualText = this.data.usualScore
    const finalText = this.data.finalScore
    if (finalText === '' || usualText === '') {
      wx.showToast({
        title: '请填写两项成绩',
        icon: 'none'
      })
      return
    }
    const usual = Number(usualText)
    const final = Number(finalText)
    if (usual > 100 || usual < 0 || final > 100 || final < 0) {
      wx.showToast({
        title: '成绩必须在0~100之间',
        icon: 'none'
      })
      return
    }
    const total = usual * 0.4 + final * 0.6
    let gradeLevel = ''
    if (total >= 90) {
      gradeLevel = '优秀'
    } else if (total > 80) {
      gradeLevel = '良好'
    } else if (total > 70) {
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
