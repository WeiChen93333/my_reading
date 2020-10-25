// 在词典中查询单词
let searchThroughDict = async (_this, word) => { // word 参数仅记忆卡片发送的查词事件携带
  if(_this.mode == 'meaning'){
    const params = {}
    params.word = word ? word.toLowerCase() : _this.currentWord       
    const {data: meaningData} = await _this.$http('GET', '/dict/words', { params })        
    _this.infoData = _this.$deepFreeze(meaningData)
  }else if(_this.mode == 'sentence'){      
    _this.queryInfo.word = _this.currentWord
    const {data: sentenceData} = await _this.$http('GET', '/dict/sentences', {
      params: _this.queryInfo
    })                
    _this.infoData = _this.$deepFreeze(sentenceData)
  } 
}

export default{
  searchThroughDict
}