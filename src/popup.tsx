import {
  Button,
  FluentProvider,
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

  const renderThisPageTabSwitches = () => (
    <>
      <div className="flex flex-row justify-between items-center w-full bg-white rounded-md border-[1px] border-white/10 p-2 mb-4 h-20 ring-1 ring-white/10 shadow-sm shadow-black/10">
        <div className="flex flex-col justify-self-start ml-2">
          <label className="text-md font-bold">下载截获</label>
          <label className="text-md">截获此页面的下载事件</label>
        </div>
        <Switch className="justify-self-end" />
      </div>
      <div className="flex flex-row justify-between items-center w-full bg-white rounded-md border-[1px] border-white/10 p-2 mb-4 h-20 ring-1 ring-white/10 shadow-sm shadow-black/10">
        <div className="flex flex-col justify-self-start ml-2">
          <label className="text-md font-bold">资源嗅探</label>
          <label className="text-md">嗅探此页面的资源，列如图片、视频等</label>
        </div>
        <Switch className="justify-self-end" />
      </div>
    </>
  )

  const renderGlobalTabSwitches = () => (
    <>
      <div className="flex flex-row justify-between items-center w-full bg-white rounded-md border-[1px] border-white/10 p-2 mb-4 h-20 ring-1 ring-white/10 shadow-sm shadow-black/10">
        <div className="flex flex-col justify-self-start ml-2">
          <label className="text-md font-bold">下载截获</label>
          <label className="text-md">截获此页面的下载事件</label>
        </div>
        <Switch className="justify-self-end" />
      </div>
      <div className="flex flex-row justify-between items-center w-full bg-white rounded-md border-[1px] border-white/10 p-2 mb-4 h-20 ring-1 ring-white/10 shadow-sm shadow-black/10">
        <div className="flex flex-col justify-self-start ml-2">
          <label className="text-md font-bold">资源嗅探</label>
          <label className="text-md">嗅探此页面的资源，列如图片、视频等</label>
        </div>
        <Switch className="justify-self-end" />
      </div>
    </>
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
        <div className="flex flex-col mt-4">{renderThisPageTabSwitches()}</div>
      )}

      {selectedTab === "global-tab" && (
        <div className="flex flex-col">
          {renderGlobalTabSwitches()}
          <Button appearance="primary">Open Settings</Button>
        </div>
      )}
    </FluentProvider>
  )
}

export default IndexPopup
