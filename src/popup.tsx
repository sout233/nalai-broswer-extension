import { Button, FluentProvider, webLightTheme } from "@fluentui/react-components"
import React, { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <FluentProvider theme={webLightTheme} className="popup-container w-[1000px] h-[300px]">
       <div className="popup flex w-[300px] h-[300px] bg-white">

    <Button appearance="primary">Hello Fluent UI React</Button>
    <Button appearance="primary">Hello Fluent UI React</Button>
</div>
</FluentProvider>
  )
}

export default IndexPopup
