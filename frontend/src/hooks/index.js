/**
 * 自定义Hooks入口文件
 * 统一导出项目中实际使用的自定义hooks
 */

// 导出实际使用的hooks
export { useClipboard, useCopyText } from './useClipboard'
export { useDebounce, useSearchDebounce } from './useDebounce'

// 默认导出
import { useClipboard, useCopyText } from './useClipboard'
import { useDebounce, useSearchDebounce } from './useDebounce'

export default {
  useClipboard,
  useCopyText,
  useDebounce,
  useSearchDebounce
}
