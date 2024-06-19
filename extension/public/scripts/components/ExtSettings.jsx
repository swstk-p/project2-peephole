import { IoSettingsOutline } from "react-icons/io5";

function ExtSettings() {
  return (
    <>
      <IoSettingsOutline
        title="Manage extension settings."
        className="h-5 w-5 hover:cursor-pointer"
        onClick={() => {
          chrome.tabs.create({
            url:
              "chrome://settings/content/siteDetails?site=chrome-extension://" +
              chrome.runtime.id,
          });
        }}
      />
    </>
  );
}

export default ExtSettings;
