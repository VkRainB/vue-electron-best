/**
 * 剪贴板操作Hook
 * 提供复制、粘贴等剪贴板功能
 */

import { ref } from 'vue';
import { copyToClipboard } from '@/utils/common';

/**
 * 剪贴板Hook
 * @returns {object} 剪贴板相关的方法和状态
 */
export function useClipboard() {
  const isSupported = ref(false);
  const text = ref('');
  const error = ref(null);
  const isLoading = ref(false);

  // 检查剪贴板API支持
  const checkSupport = () => {
    isSupported.value = !!(navigator.clipboard || document.execCommand);
  };

  /**
   * 复制文本到剪贴板
   * @param {string} textToCopy - 要复制的文本
   * @returns {Promise<boolean>} 是否复制成功
   */
  const copy = async (textToCopy) => {
    if (!textToCopy) {
      error.value = new Error('没有要复制的内容');
      return false;
    }

    isLoading.value = true;
    error.value = null;

    try {
      const success = await copyToClipboard(textToCopy);
      if (success) {
        text.value = textToCopy;
        return true;
      }
      else {
        error.value = new Error('复制失败');
        return false;
      }
    }
    catch (err) {
      error.value = err;
      return false;
    }
    finally {
      isLoading.value = false;
    }
  };

  /**
   * 从剪贴板读取文本
   * @returns {Promise<string>} 剪贴板中的文本
   */
  const read = async () => {
    if (!isSupported.value) {
      error.value = new Error('不支持剪贴板读取');
      return '';
    }

    isLoading.value = true;
    error.value = null;

    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const clipboardText = await navigator.clipboard.readText();
        text.value = clipboardText;
        return clipboardText;
      }
      else {
        error.value = new Error('浏览器不支持剪贴板读取');
        return '';
      }
    }
    catch (err) {
      error.value = err;
      return '';
    }
    finally {
      isLoading.value = false;
    }
  };

  /**
   * 清空剪贴板
   * @returns {Promise<boolean>} 是否清空成功
   */
  const clear = async () => {
    return await copy('');
  };

  /**
   * 清除错误状态
   */
  const clearError = () => {
    error.value = null;
  };

  // 初始化检查支持
  checkSupport();

  return {
    // 状态
    isSupported,
    text,
    error,
    isLoading,

    // 方法
    copy,
    read,
    clear,
    clearError,
  };
}

/**
 * 复制文本Hook（简化版）
 * @param {string} initialText - 初始文本
 * @returns {object} 复制相关的方法和状态
 */
export function useCopyText(initialText = '') {
  const { copy, error, isLoading } = useClipboard();
  const copied = ref(false);
  const copyText = ref(initialText);

  /**
   * 复制指定文本或当前文本
   * @param {string} textToCopy - 要复制的文本
   * @returns {Promise<boolean>} 是否复制成功
   */
  const copyToClipboard = async (textToCopy = copyText.value) => {
    const success = await copy(textToCopy);
    copied.value = success;

    if (success) {
      // 2秒后重置复制状态
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    }

    return success;
  };

  /**
   * 设置要复制的文本
   * @param {string} text - 文本内容
   */
  const setText = (text) => {
    copyText.value = text;
  };

  return {
    // 状态
    copied,
    copyText,
    error,
    isLoading,

    // 方法
    copy: copyToClipboard,
    setText,
  };
}

/**
 * 批量复制Hook
 * @returns {object} 批量复制相关的方法和状态
 */
export function useBatchCopy() {
  const { copy } = useClipboard();
  const copyHistory = ref([]);
  const maxHistory = ref(10);

  /**
   * 复制文本并添加到历史记录
   * @param {string} text - 要复制的文本
   * @param {string} label - 标签（可选）
   * @returns {Promise<boolean>} 是否复制成功
   */
  const copyWithHistory = async (text, label = '') => {
    const success = await copy(text);

    if (success) {
      // 添加到历史记录
      const historyItem = {
        text,
        label: label || text.slice(0, 20) + (text.length > 20 ? '...' : ''),
        timestamp: Date.now(),
        id: Date.now().toString(),
      };

      copyHistory.value.unshift(historyItem);

      // 限制历史记录数量
      if (copyHistory.value.length > maxHistory.value) {
        copyHistory.value = copyHistory.value.slice(0, maxHistory.value);
      }
    }

    return success;
  };

  /**
   * 从历史记录中复制
   * @param {string} id - 历史记录ID
   * @returns {Promise<boolean>} 是否复制成功
   */
  const copyFromHistory = async (id) => {
    const item = copyHistory.value.find(item => item.id === id);
    if (item) {
      return await copy(item.text);
    }
    return false;
  };

  /**
   * 清空历史记录
   */
  const clearHistory = () => {
    copyHistory.value = [];
  };

  /**
   * 删除历史记录项
   * @param {string} id - 历史记录ID
   */
  const removeHistoryItem = (id) => {
    copyHistory.value = copyHistory.value.filter(item => item.id !== id);
  };

  /**
   * 设置最大历史记录数量
   * @param {number} max - 最大数量
   */
  const setMaxHistory = (max) => {
    maxHistory.value = max;
    if (copyHistory.value.length > max) {
      copyHistory.value = copyHistory.value.slice(0, max);
    }
  };

  return {
    // 状态
    copyHistory,
    maxHistory,

    // 方法
    copy: copyWithHistory,
    copyFromHistory,
    clearHistory,
    removeHistoryItem,
    setMaxHistory,
  };
}
