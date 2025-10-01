/**
 * 定义规则：
 *  枚举名：XxxEnum
 *  枚举值：全部大写/部分大写，单词间用下划线分割
 */

/** Mitt兄弟组件通信 */
export const MittEnum = {
  /** 移除失败图片 */
  REMOVE_FAILED_IMG: 'REMOVE_FAILED_IMG',

  /** 百度健康-同步物流信息 */
  SYNC_LOGISTICS: 'SYNC_LOGISTICS',
};

/**
 * 消息类型
 * todo: 后续需要补充
 */
export const MsgEnum = Object.freeze({
  /** 机器人 */
  Robot: 0,
  /** 文本 */
  Text: 1,
  /** 图片 */
  Image: 2,
  /** 语音 */
  Voice: 3,
  /** 视频 */
  Video: 4,
  /** 文件 */
  File: 5,
  /** 链接*/
  Link6: 6,
  /** 小程序卡片 */
  Mini_Program: 7,
  /** 链接*/
  Link8: 8,
  /** 收货信息 */
  Delivery_Info: 10,
  /** 好友添加请求 */
  Friend_Request: 11,
  /** 系统消息 */
  System_Message: 12,
  /** 转账消息 */
  Transfer: 13,
  /** 名片 */
  Contact_Card: 14,
});

// 渠道、来源端口
export const VisitPortEnum = Object.freeze({
  /** 电脑端 */
  Pc: 0,
  /** 网页手机端 */
  Mobile: 1,
  /** 微信 */
  Wechat: 2,
  /** 公众号 */
  Official_Account: 3,
  /** 小程序 */
  Mini_Program: 4,
  /** APP */
  App: 5,
  /** 企微 */
  Enterprise_Wechat: 6,
  /** 藏医 */
  Tibetan_Medicine: 7,
});
