'use client';
import {ChangeEventHandler, useCallback, useEffect, useState} from "react";
import {getIconCode, getIconData} from "@/utils/iconHelper";
import {copyToClipboard} from "@/utils/copyToClipboard";

// 定义事件对象类型
interface ChangeEvent extends Event {
  target: HTMLInputElement;
}

export default function Home() {
  const [svg, setSvg] = useState<string>('');
  const [notification, setNotification] = useState<string>('');
  useEffect(() => {
    if (!notification) return
    setTimeout(() => {
      setNotification('')
    }, 3000)
  }, [notification, setNotification]);
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e?.target?.result;
      // 在这里可以对文件内容进行处理，比如展示在页面上
      const data = getIconData('temp', content as string)
      setSvg(data);
      copyToClipboard(getIconCode(data))
      setNotification('复制代码成功')
    };
    reader.onerror = (e) => {
      console.error("Error reading file:", e);
    };
    if (file) {
      reader.readAsText(file);
    }
  }, [setSvg])
  return (
    <main className="flex min-h-screen flex-col items-center justify-items-start p-24">
      <h1 className="text-l">选择 .svg 文件, 自动转换成 @tenx-ui/icon CustomIcon 代码,并自动复制到剪切板</h1>
      {
        Boolean(notification) && <div className="fixed border-solid border border-blue-400 p-3 rounded-2xl top-3 text-green-400">{notification}</div>
      }
      <br/><br/>
      <input className="" type="file" accept="image/svg+xml" onChange={onChange}/>
      <br/><br/>
      <div>
        <textarea style={{
          width: '800px',
        }} className="w-full bg-black text-white border-white border-solid border-2 rounded-lg" rows={10} value={getIconCode(svg)}/>
      </div>
      <div>
        <br/>
        <button
          className="border border-emerald-900 pt-2 pb-2 pl-5 pr-5 rounded-md"
          onClick={() => {
            copyToClipboard(getIconCode(svg))
            setNotification('复制代码成功')
          }}
          disabled={!svg}>复制
        </button>
        <span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <button
          className="border border-emerald-900 pt-2 pb-2 pl-5 pr-5 rounded-md"
          onClick={() => {
            copyToClipboard(svg)
            setNotification('复制 data 数据成功')
          }}
          disabled={!svg}>仅复制 data 数据
        </button>
      </div>
    </main>
  );
}
