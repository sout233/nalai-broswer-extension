import React, { useState } from 'react';
import { FluentProvider, webLightTheme, TabList, Tab, Switch, Button } from '@fluentui/react-components';

import "./style.css"

function IndexPopup() {
  const [selectedTab, setSelectedTab] = useState("this-page-tab");

  const handleTabChange = (event, data) => {
    setSelectedTab(data.value);
  };

  const renderSwitches = () => (
    <>
      <div className="flex justify-between w-full">
        <Switch labelPosition="before" label="下载截获" className="flex-grow" />
      </div>
      <div className="flex justify-between w-full">
        <Switch labelPosition="before" label="资源嗅探" className="flex-grow" />
      </div>
    </>
  );

  return (
    <FluentProvider
      theme={webLightTheme}
      className="popup-container w-96 p-4 rounded-lg">
      <TabList selectedValue={selectedTab} onTabSelect={handleTabChange}>
        <Tab value="this-page-tab">此页面</Tab>
        <Tab value="global-tab">全局</Tab>
      </TabList>

      {selectedTab === "this-page-tab" && (
        <div className="flex flex-col">
          {renderSwitches()}
        </div>
      )}

      {selectedTab === "global-tab" && (
        <div className="flex flex-col">
          {renderSwitches()}
          <Button appearance="primary">Open Settings</Button>
        </div>
      )}
    </FluentProvider>
  );
}

export default IndexPopup;
