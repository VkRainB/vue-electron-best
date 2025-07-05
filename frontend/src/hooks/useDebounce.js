/**
 * 防抖和节流Hook
 * 提供防抖、节流等性能优化功能
 */

import { onUnmounted, ref, watch } from 'vue';
import { debounce, throttle } from '@/utils/common';

/**
 * 防抖Hook
 * @param {any} value - 要防抖的值
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Ref} 防抖后的值
 */
export function useDebounce(value, delay = 300) {
  const debouncedValue = ref(value);

  const updateDebouncedValue = debounce((newValue) => {
    debouncedValue.value = newValue;
  }, delay);

  watch(
    () => value,
    (newValue) => {
      updateDebouncedValue(newValue);
    },
    { immediate: true },
  );

  return debouncedValue;
}

/**
 * 防抖函数Hook
 * @param {Function} fn - 要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @param {boolean} immediate - 是否立即执行
 * @returns {Function} 防抖后的函数
 */
export function useDebounceFn(fn, delay = 300, immediate = false) {
  const debouncedFn = debounce(fn, delay, immediate);

  // 组件卸载时清理
  onUnmounted(() => {
    if (debouncedFn.cancel) {
      debouncedFn.cancel();
    }
  });

  return debouncedFn;
}

/**
 * 节流Hook
 * @param {any} value - 要节流的值
 * @param {number} limit - 时间间隔（毫秒）
 * @returns {Ref} 节流后的值
 */
export function useThrottle(value, limit = 300) {
  const throttledValue = ref(value);

  const updateThrottledValue = throttle((newValue) => {
    throttledValue.value = newValue;
  }, limit);

  watch(
    () => value,
    (newValue) => {
      updateThrottledValue(newValue);
    },
    { immediate: true },
  );

  return throttledValue;
}

/**
 * 节流函数Hook
 * @param {Function} fn - 要节流的函数
 * @param {number} limit - 时间间隔（毫秒）
 * @returns {Function} 节流后的函数
 */
export function useThrottleFn(fn, limit = 300) {
  return throttle(fn, limit);
}

/**
 * 搜索防抖Hook
 * @param {Function} searchFn - 搜索函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {object} 搜索相关的状态和方法
 */
export function useSearchDebounce(searchFn, delay = 500) {
  const searchQuery = ref('');
  const isSearching = ref(false);
  const searchResults = ref([]);
  const error = ref(null);

  const debouncedSearch = useDebounceFn(async (query) => {
    if (!query.trim()) {
      searchResults.value = [];
      isSearching.value = false;
      return;
    }

    isSearching.value = true;
    error.value = null;

    try {
      const results = await searchFn(query);
      searchResults.value = results;
    }
    catch (err) {
      error.value = err;
      searchResults.value = [];
    }
    finally {
      isSearching.value = false;
    }
  }, delay);

  watch(searchQuery, (newQuery) => {
    debouncedSearch(newQuery);
  });

  /**
   * 清空搜索
   */
  const clearSearch = () => {
    searchQuery.value = '';
    searchResults.value = [];
    error.value = null;
    isSearching.value = false;
  };

  /**
   * 设置搜索查询
   * @param {string} query - 搜索查询
   */
  const setSearchQuery = (query) => {
    searchQuery.value = query;
  };

  return {
    // 状态
    searchQuery,
    isSearching,
    searchResults,
    error,

    // 方法
    clearSearch,
    setSearchQuery,
  };
}

/**
 * 输入防抖Hook
 * @param {string} initialValue - 初始值
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {object} 输入相关的状态和方法
 */
export function useInputDebounce(initialValue = '', delay = 300) {
  const inputValue = ref(initialValue);
  const debouncedValue = useDebounce(inputValue, delay);
  const isTyping = ref(false);

  let typingTimer = null;

  /**
   * 设置输入值
   * @param {string} value - 输入值
   */
  const setValue = (value) => {
    inputValue.value = value;
    isTyping.value = true;

    // 清除之前的计时器
    if (typingTimer) {
      clearTimeout(typingTimer);
    }

    // 设置新的计时器
    typingTimer = setTimeout(() => {
      isTyping.value = false;
    }, delay + 100);
  };

  /**
   * 清空输入
   */
  const clear = () => {
    inputValue.value = '';
    isTyping.value = false;
    if (typingTimer) {
      clearTimeout(typingTimer);
    }
  };

  // 组件卸载时清理计时器
  onUnmounted(() => {
    if (typingTimer) {
      clearTimeout(typingTimer);
    }
  });

  return {
    // 状态
    inputValue,
    debouncedValue,
    isTyping,

    // 方法
    setValue,
    clear,
  };
}

/**
 * 滚动防抖Hook
 * @param {Function} callback - 滚动回调函数
 * @param {number} delay - 延迟时间（毫秒）
 * @param {Element} target - 目标元素，默认为window
 * @returns {object} 滚动相关的状态和方法
 */
export function useScrollDebounce(callback, delay = 100, target = null) {
  const isScrolling = ref(false);
  const scrollPosition = ref({ x: 0, y: 0 });

  const debouncedCallback = useDebounceFn(() => {
    isScrolling.value = false;
    if (callback) {
      callback(scrollPosition.value);
    }
  }, delay);

  const handleScroll = throttle(() => {
    isScrolling.value = true;

    if (target) {
      scrollPosition.value = {
        x: target.scrollLeft,
        y: target.scrollTop,
      };
    }
    else {
      scrollPosition.value = {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop,
      };
    }

    debouncedCallback();
  }, 16); // 约60fps

  /**
   * 开始监听滚动
   */
  const startListening = () => {
    const element = target || window;
    element.addEventListener('scroll', handleScroll, { passive: true });
  };

  /**
   * 停止监听滚动
   */
  const stopListening = () => {
    const element = target || window;
    element.removeEventListener('scroll', handleScroll);
  };

  // 组件卸载时停止监听
  onUnmounted(() => {
    stopListening();
  });

  return {
    // 状态
    isScrolling,
    scrollPosition,

    // 方法
    startListening,
    stopListening,
  };
}
