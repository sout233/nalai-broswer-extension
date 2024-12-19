import {
  Button,
  FluentProvider,
  Label,
  Switch,
  Text,
  Title2,
  Title3,
  webLightTheme
} from "@fluentui/react-components"
import React, { useState } from "react"

import "./style.css"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <FluentProvider
      theme={webLightTheme}
      className="popup-container w-96 p-4 rounded-lg">
      <div className="flex flex-col">
        <Label size="large">设置（仅针对此页面）</Label>
        <div className="flex flex-col">
          <Switch labelPosition="before" label="下载截获" />
          <Switch labelPosition="before" label="资源嗅探" />
        </div>
      </div>
      <div className="flex flex-col">
        <Button appearance="primary">Open Settings</Button>
      </div>
    </FluentProvider>
  )
}

export default IndexPopup
