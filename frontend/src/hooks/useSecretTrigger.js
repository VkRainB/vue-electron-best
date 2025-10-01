import { readonly } from 'vue';

/**
 * 触发器 - 在指定时间内点击指定次数，然后按下特定键来执行回调
 * @param {object} options 配置选项
 * @param {number} options.clickCount 需要的点击次数，默认3次
 * @param {number} options.timeWindow 时间窗口（毫秒），默认2000ms
 * @param {string|Array} options.triggerKey 触发键，默认'Enter'
 * @param {Function} options.callback 触发后执行的回调函数
 * @param {number} options.keyTimeout 按键等待时间（毫秒），默认3000ms
 * @returns {object} 返回点击处理函数和状态
 */
export function useSecretTrigger(options = {}) {
  if (!import.meta.env.DEV) return {};
  const { clickCount = 3, timeWindow = 2000, triggerKey = 'Enter', callback = () => {}, keyTimeout = 3000 } = options;

  const clickTimes = ref([]);
  const waitingForKey = ref(false);
  const currentClicks = ref(0);
  let keyTimer = null;

  const handleKeyPress = (event) => {
    if (!waitingForKey.value) return;

    const keys = Array.isArray(triggerKey) ? triggerKey : [triggerKey];

    if (keys.includes(event.key) || keys.includes(event.code)) {
      waitingForKey.value = false;
      currentClicks.value = 0;
      clickTimes.value = [];
      clearTimeout(keyTimer);

      // 执行回调
      callback();
    }
  };

  const clearWaitingState = () => {
    waitingForKey.value = false;
    currentClicks.value = 0;
    clearTimeout(keyTimer);
  };

  function handleClick() {
    const now = Date.now();
    clickTimes.value.push(now);
    clickTimes.value = clickTimes.value.filter((time) => now - time <= timeWindow);
    currentClicks.value = clickTimes.value.length;

    // 检查是否达到点击次数
    if (clickTimes.value.length >= clickCount) {
      waitingForKey.value = true;

      // 设置按键等待超时
      keyTimer = setTimeout(() => {
        clearWaitingState();
      }, keyTimeout);

      // 清空点击记录，避免重复触发
      clickTimes.value = [];
      currentClicks.value = 0;
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyPress);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyPress);
    clearTimeout(keyTimer);
  });

  return {
    handleClick,
    waitingForKey: readonly(waitingForKey),
    currentClicks: readonly(currentClicks),
    clearWaitingState,
  };
}
