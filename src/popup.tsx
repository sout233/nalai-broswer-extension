import {
  Button,
  FluentProvider,
  Link,
  Switch,
  Tab,
  TabList,
  webLightTheme
} from "@fluentui/react-components"
import React, { useState } from "react"

import "./style.css"

function IndexPopup() {
  const [selectedTab, setSelectedTab] = useState("this-page-tab")

  const handleTabChange = (
    _event: any,
    data: { value: React.SetStateAction<string> }
  ) => {
    setSelectedTab(data.value)
  }

  const renderSwitchItem = (title: string, description: string) => (
    <div className="flex flex-row justify-between items-center w-full bg-white rounded-md border-[1px] border-white/10 p-2 mb-4 h-20 ring-1 ring-white/10 shadow-sm shadow-black/10">
      <div className="flex flex-col justify-self-start ml-2">
        <label className="text-md font-bold">{title}</label>
        <label className="text-md">{description}</label>
      </div>
      <Switch className="justify-self-end" />
    </div>
  )

  return (
    <FluentProvider
      theme={webLightTheme}
      className="popup-container w-96 p-4 rounded-lg duration-100">
      <TabList selectedValue={selectedTab} onTabSelect={handleTabChange}>
        <Tab value="this-page-tab">此页面</Tab>
        <Tab value="global-tab">全局</Tab>
      </TabList>

      {selectedTab === "this-page-tab" && (
        <div className="flex flex-col mt-4">
          {renderSwitchItem("下载截获", "截获此页面的下载事件")}
          {renderSwitchItem("资源嗅探", "嗅探此页面的资源，列如图片、视频等")}
        </div>
      )}

      {selectedTab === "global-tab" && (
        <div className="flex flex-col mt-4">
          {renderSwitchItem("下载截获", "截获下载事件，此项等价于全局开关")}
          {renderSwitchItem("资源嗅探", "嗅探页面的资源，列如图片、视频等")}
          <Link className="ml-4">转到全局设置</Link>
        </div>
      )}
    </FluentProvider>
  )
}

export default IndexPopup
