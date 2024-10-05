# Web Accessory Editor

Edit Hat and Face Accessories on Roblox directly through your web browser!

## How to Install
> [!WARNING] 
This extension is designed for Firefox only.

### Step 1: Open the Debugging Page

Go to `about:debugging#/runtime/this-firefox` in your Firefox browser.

### Step 2: Load the Add-on

Click on **"Load Temporary Add-on"** and select the folder containing the extension.

Now you can open the Web Accessory Editor on the Roblox avatar page!

## How to Use the Extension

1. Navigate to the Roblox avatar page.
2. Click on the extension icon to open it. A dropdown menu will appear.
3. Select an outfit that includes a supported Hat or Face Accessory.
4. Click on **"Copy JSON Data."** This action will add the necessary scaling and rotation position details to the JSON data and copy it to your clipboard.
5. You can now edit the JSON data as needed before proceeding to the next step.

6. On supported assets you will now see 
```JSON
  "meta": {
          "order": 0,
          "puffiness": 0,
          "position": {
            "X": 0,
            "Y": 0,
            "Z": 0
          },
          "rotation": {
            "X": 0,
            "Y": 0,
            "Z": 0
          },
          "scale": {
            "X": 1.2,
            "Y": 1.2,
            "Z": 1.2
          },
```
You can adjust the X, Y, and Z values to suit your preferences.
> [!NOTE]  
> Please note that you can scale assets within the range of 0.8 to 1.2.  
> Additionally, the position can be adjusted with a maximum value of -0.25 and a minimum of 0.25. For rotation, you can set values between -30 degrees and 30 degrees.

7. With the edited JSON data, navigate to [Roblox Avatar API v3 Documentation](https://avatar.roblox.com/docs/index.html?urls.primaryName=Avatar%20Api%20v3).

8. Click on `/v3/outfits/{userOutfitId}` to update the contents of an outfit.

9. Next, click "Try it Out" and enter the user outfit ID along with the updated outfit JSON data.

10. Click "Execute," and the outfit should be updated with the new details.

11. You can now edit the position of assets directly from your browser without needing the Roblox app on Windows.

