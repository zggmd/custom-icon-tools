'use client';
import {ChangeEventHandler, useCallback, useEffect, useState} from "react";
import {CustomIcon, getIconData} from "@/utils/iconHelper";
import {copyToClipboard} from "@/utils/copyToClipboard";

// 定义事件对象类型
interface ChangeEvent extends Event {
  target: HTMLInputElement;
}

export default function Home() {
  const [svg, setSvg] = useState<string>('{"name":"temp","data":"<path d=\\"M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z\\" />"}');
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
      console.log("File content:", content);
      // 在这里可以对文件内容进行处理，比如展示在页面上
      const data = getIconData('temp', content as string)
      setSvg(data);
      copyToClipboard(data)
    };
    reader.onerror = (e) => {
      console.error("Error reading file:", e);
    };
    if (file) {
      reader.readAsText(file);
    }
  }, [setSvg])
  console.log('iii', svg)
  return (
    <main className="flex min-h-screen flex-col items-center justify-items-start p-24">
      <h1 className="text-2xl">选择 .svg 文件, 自动转换成自定义 icon 的格式,并复制到剪切板</h1>
      {
        Boolean(notification) && <div className="absolute top-0 text-green-400">{notification}</div>
      }
      <br/><br/>
      <input className="" type="file" accept="image/svg+xml" onChange={onChange}/>
      <br/><br/>
      {
        Boolean(svg) && <CustomIcon data={svg}/>
      }
      <div>
        <textarea style={{
          width: '800px',
        }} className="w-full bg-black text-white border-white border-solid border-2 rounded-lg" rows={10} value={svg}/>
      </div>
      <div>
        <br/>
        <button onClick={() => {
          copyToClipboard(svg)
          setNotification('复制成功')
        }} disabled={!svg}>Copy!
        </button>
      </div>
    </main>
  );
}
