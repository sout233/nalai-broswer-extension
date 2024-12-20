import React, { useReducer, useState } from "react"

import "./style.css"

import {
  FluentProvider,
  Tab,
  TabList,
  Title3,
  webLightTheme
} from "@fluentui/react-components"

function IndexOptions() {
  const [data, setData] = useState("")
  const [count, increase] = useReducer((c) => c + 1, 0)

  const [selectedTab, setSelectedTab] = useState("general")

  const handleTabChange = (
    _event: any,
    data: { value: React.SetStateAction<string> }
  ) => {
    setSelectedTab(data.value)
  }

return (
  <FluentProvider theme={webLightTheme}>
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-xl max-h-[100rem] justify-center shadow-lg rounded-lg mx-auto">
        <div className="flex flex-col">
          <Title3 className="mb-2 ml-2">Nalai</Title3>
          <TabList
            vertical={true}
            selectedValue={selectedTab}
            onTabSelect={handleTabChange}>
            <Tab value={"general"}>General</Tab>
            <Tab value={"appearance"}>Appearance</Tab>
            <Tab value={"download"}>下载</Tab>
            <Tab value={"capture"}>嗅探</Tab>
          </TabList>
        </div>
      </div>
    </div>
  </FluentProvider>
)
}

export default IndexOptions
