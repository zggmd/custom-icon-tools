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

interface IIcon {

}
const Icon: FC<IIcon> = (props) => {
  let {
    _type, children, style = {}, size, color, spin, className,
    component: Component, ...other
  } = props;
  Component = Component || 'svg';
  const svgProps = {};
  if (Component === 'svg') {
    svgProps.viewBox = '0 0 1024 1024';
    svgProps.preserveAspectRatio = 'xMidYMid slice';
  }
  const _style = JSON.parse(JSON.stringify(style))
  if (size) {
    _style.fontSize = size
  }
  if (color) {
    _style.fill = color
  }

  const classString = ['tenx-icon', _type ? `tenx-icon-${_type}` : '', spin ? 'tenx-icon-spin' : '', className || ''].filter(Boolean).join(' ')

  return (
    <i className="inline-block fs">
      <Component
        className="tenx-icon-svg"
        style={_style}
        aria-hidden="true"
        {...svgProps}
        {...other}
      >
        {children}
      </Component>
    </i>
  );
}

Icon.defaultProps = {
  component: 'svg',
};

export default Icon;

export const CustomIcon = props => {
  const { data, ...res } = props;
  if(!data) {
    console.warn(
      'CustomIcon\'s data is null'
    )
    return null
  }

  const _data = JSON.parse(data);
  return <Icon _type={data.name} component="svg" dangerouslySetInnerHTML={{ __html: _data.data }} {...res} />;
};
