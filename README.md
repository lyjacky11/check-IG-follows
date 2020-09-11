# Check IG Follows
Check the number of followers and followings on a Instagram account. Also calculates the number of users you are not following and users that are not following you.

## Tampermonkey

- The Tampermonkey extension is required to use this script.

[Download Link](https://www.tampermonkey.net/)

## Usage

1. Create a new userscript in the Tampermonkey extension.

2. Copy & paste the code from the `.js` file into the code box and save changes.

3. Browse to [Instagram](https://www.instagram.com/) and view a user profile.

4. The URL in the address bar should be: `https://www.instagram.com/{username}`.

5. Open the browser console (Ctrl + Shift + J on Chrome).

6. You should see the script running in the console. If it's not running, refresh the page and try again.

*NOTE: The page must be refreshed manually (Ctrl + F5) every time you want to fetch data.*

## Save Usernames

1. Expand the arrays of the data that you want to keep until you see the usernames in the console.

2. Click on the console log box, and right click until you see a "Save as" option, then save the log to your computer.

3. Clean up the log file by deleting all the lines that do not start with `userscript.html`.

4. Once all the lines start with `userscript.html`, start deleting the content until you reach the information you want to keep.

## Format & Parse JSON

1. Use an online [JSON Formatter](https://jsonformatter.curiousconcept.com/) to format the single line JSONs into a readable format.

2. Save the separate JSON data into individual JSON files.
