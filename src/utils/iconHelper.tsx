/**
 * Licensed Materials - Property of tenxcloud.com
 * (C) Copyright 2024 TenxCloud. All Rights Reserved.
 */
import React, {FC} from 'react'

export function extractPathContent(str: string) {
  const match = str.match(/<svg([^>]*)>([\s\S]*?)<\/svg>/)
  console.log('match', match)
  if (match) return match[2]
  console.warn('未找到 <svg> 标签')
  return ''
}

export function getIconData(name: string, svgData: string) {
  return JSON.stringify({
    name,
    data: extractPathContent(svgData),
  });
}

export const getIconCode = (svgData: string) => {
  return `// import { CustomIcon } from '@tenx-ui/icon';
<CustomIcon data={'${svgData}'}/>`
}
